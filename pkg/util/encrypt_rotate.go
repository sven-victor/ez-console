// Copyright 2026 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package util

import (
	"fmt"
	"reflect"
	"strings"

	"github.com/sven-victor/ez-utils/safe"
)

var (
	safeStringType    = reflect.TypeOf(safe.String{})
	safeStringPtrType = reflect.TypeOf((*safe.String)(nil))
	rotatorType       = reflect.TypeOf((*EncryptRotator)(nil)).Elem()
)

// RotateEncryptedFields rewrites encrypted values on a GORM model (or any struct)
// according to *safe.String defaults and `encrypt` struct tags:
//   - "" (default): safe.String / *safe.String (and convertible named types)
//   - "-": skip
//   - "inline": string starting with {CRYPT}
//   - "json": walk maps/slices/JSON-shaped values; rewrite {CRYPT} string leaves
//
// If v implements EncryptRotator (value or pointer), that method is used instead
// of the field walker.
func RotateEncryptedFields(v any, oldKey, newKey string) (bool, error) {
	if v == nil {
		return false, nil
	}
	if rotator, ok := v.(EncryptRotator); ok {
		return rotator.RotateEncryption(oldKey, newKey)
	}
	rv := reflect.ValueOf(v)
	if !rv.IsValid() {
		return false, nil
	}
	if rv.Kind() == reflect.Ptr {
		if rv.IsNil() {
			return false, nil
		}
		if rotator, ok := rv.Interface().(EncryptRotator); ok {
			return rotator.RotateEncryption(oldKey, newKey)
		}
		rv = rv.Elem()
	}
	if rv.Kind() != reflect.Struct {
		return false, fmt.Errorf("encrypt rotate: expected struct, got %s", rv.Kind())
	}
	return rotateStruct(rv, oldKey, newKey)
}

// StructHasEncryptableFields reports whether a model type would be visited by
// the default field walker (or implements EncryptRotator).
func StructHasEncryptableFields(model any) bool {
	t := reflect.TypeOf(model)
	if t == nil {
		return false
	}
	if t.Implements(rotatorType) || (t.Kind() == reflect.Ptr && t.Elem().Implements(rotatorType)) {
		return true
	}
	if t.Kind() == reflect.Ptr {
		if reflect.PointerTo(t.Elem()).Implements(rotatorType) {
			return true
		}
		t = t.Elem()
	}
	if reflect.PointerTo(t).Implements(rotatorType) {
		return true
	}
	if t.Kind() != reflect.Struct {
		return false
	}
	return structHasEncryptableFields(t)
}

func structHasEncryptableFields(t reflect.Type) bool {
	if t.Kind() == reflect.Ptr {
		t = t.Elem()
	}
	if t.Kind() != reflect.Struct {
		return false
	}
	for i := 0; i < t.NumField(); i++ {
		sf := t.Field(i)
		if !sf.IsExported() {
			continue
		}
		tag := sf.Tag.Get("encrypt")
		if tag == "-" {
			continue
		}
		if isAssociationField(sf) && tag == "" {
			continue
		}
		if tag == "inline" || tag == "json" {
			return true
		}
		ft := sf.Type
		if isSafeStringFamily(ft) {
			return true
		}
		if sf.Anonymous || isGormEmbedded(sf) {
			if structHasEncryptableFields(ft) {
				return true
			}
		}
	}
	return false
}

func rotateStruct(v reflect.Value, oldKey, newKey string) (bool, error) {
	changed := false
	t := v.Type()
	for i := 0; i < t.NumField(); i++ {
		sf := t.Field(i)
		if !sf.IsExported() {
			continue
		}
		fv := v.Field(i)
		tag := sf.Tag.Get("encrypt")
		if tag == "-" {
			continue
		}
		if isAssociationField(sf) && tag == "" {
			continue
		}
		if sf.Anonymous || isGormEmbedded(sf) {
			c, err := rotateEmbedded(fv, oldKey, newKey)
			if err != nil {
				return changed, fmt.Errorf("%s: %w", sf.Name, err)
			}
			changed = changed || c
			if tag == "" {
				continue
			}
		}
		c, err := rotateField(fv, tag, oldKey, newKey)
		if err != nil {
			return changed, fmt.Errorf("%s: %w", sf.Name, err)
		}
		changed = changed || c
	}
	return changed, nil
}

func rotateEmbedded(fv reflect.Value, oldKey, newKey string) (bool, error) {
	for fv.Kind() == reflect.Ptr {
		if fv.IsNil() {
			return false, nil
		}
		fv = fv.Elem()
	}
	if fv.Kind() != reflect.Struct || isSafeStringFamily(fv.Type()) {
		return false, nil
	}
	return rotateStruct(fv, oldKey, newKey)
}

func rotateField(fv reflect.Value, tag, oldKey, newKey string) (bool, error) {
	if !fv.IsValid() {
		return false, nil
	}
	switch tag {
	case "json":
		return rotateJSONValue(fv, oldKey, newKey)
	case "inline":
		return rotateInlineValue(fv, oldKey, newKey)
	default:
		if isSafeStringFamily(fv.Type()) {
			return rotateSafeStringValue(fv, oldKey, newKey)
		}
		return false, nil
	}
}

func rotateInlineValue(fv reflect.Value, oldKey, newKey string) (bool, error) {
	for fv.Kind() == reflect.Ptr {
		if fv.IsNil() {
			return false, nil
		}
		fv = fv.Elem()
	}
	if isSafeStringFamily(fv.Type()) {
		return rotateSafeStringValue(fv, oldKey, newKey)
	}
	if fv.Kind() != reflect.String || !fv.CanSet() {
		return false, nil
	}
	s := fv.String()
	if !IsEncrypted(s) {
		return false, nil
	}
	ns, err := ReencryptCiphertext(s, oldKey, newKey)
	if err != nil {
		return false, err
	}
	fv.SetString(ns)
	return true, nil
}

func rotateSafeStringValue(fv reflect.Value, oldKey, newKey string) (bool, error) {
	if !fv.IsValid() {
		return false, nil
	}
	if fv.Kind() == reflect.Ptr {
		if fv.IsNil() {
			return false, nil
		}
		return rotateSafeStringValue(fv.Elem(), oldKey, newKey)
	}
	if !fv.CanAddr() && !fv.CanSet() {
		return false, nil
	}
	s, ok := asSafeString(fv)
	if !ok {
		return false, nil
	}
	changed, err := reencryptSafeString(&s, oldKey, newKey)
	if err != nil || !changed {
		return changed, err
	}
	setSafeString(fv, s)
	return true, nil
}

func asSafeString(fv reflect.Value) (safe.String, bool) {
	if fv.Type() == safeStringType {
		s, _ := fv.Interface().(safe.String)
		return s, true
	}
	if fv.Kind() == reflect.Struct && fv.Type().ConvertibleTo(safeStringType) {
		s, _ := fv.Convert(safeStringType).Interface().(safe.String)
		return s, true
	}
	return safe.String{}, false
}

func setSafeString(fv reflect.Value, s safe.String) {
	sv := reflect.ValueOf(s)
	if fv.Type() == safeStringType {
		fv.Set(sv)
		return
	}
	if fv.CanSet() && sv.Type().ConvertibleTo(fv.Type()) {
		fv.Set(sv.Convert(fv.Type()))
	}
}

func reencryptSafeString(s *safe.String, oldKey, newKey string) (bool, error) {
	if s == nil {
		return false, nil
	}
	s.SetSecret(oldKey)
	ct := s.String()
	if ct == "" || !IsEncrypted(ct) {
		return false, nil
	}
	newCT, err := ReencryptCiphertext(ct, oldKey, newKey)
	if err != nil {
		return false, err
	}
	s.SetSecret(newKey)
	if err := s.SetValue(newCT); err != nil {
		return false, err
	}
	return true, nil
}

func rotateJSONValue(v reflect.Value, oldKey, newKey string) (bool, error) {
	nv, changed, err := rotateJSONClone(v, oldKey, newKey)
	if err != nil || !changed {
		return changed, err
	}
	if v.CanSet() && nv.IsValid() {
		if nv.Type().AssignableTo(v.Type()) {
			v.Set(nv)
		} else if nv.Type().ConvertibleTo(v.Type()) {
			v.Set(nv.Convert(v.Type()))
		}
	}
	return changed, nil
}

func rotateJSONClone(v reflect.Value, oldKey, newKey string) (reflect.Value, bool, error) {
	if !v.IsValid() {
		return v, false, nil
	}
	if (v.Kind() == reflect.Ptr || v.Kind() == reflect.Interface || v.Kind() == reflect.Map || v.Kind() == reflect.Slice) && v.IsNil() {
		return v, false, nil
	}
	switch v.Kind() {
	case reflect.Interface:
		inner, changed, err := rotateJSONClone(v.Elem(), oldKey, newKey)
		if err != nil || !changed {
			return v, changed, err
		}
		out := reflect.New(v.Type()).Elem()
		out.Set(inner)
		return out, true, nil
	case reflect.Ptr:
		elem, changed, err := rotateJSONClone(v.Elem(), oldKey, newKey)
		if err != nil || !changed {
			return v, changed, err
		}
		if v.Elem().CanSet() && elem.Type().AssignableTo(v.Elem().Type()) {
			v.Elem().Set(elem)
			return v, true, nil
		}
		return v, changed, nil
	case reflect.String:
		s := v.String()
		if !IsEncrypted(s) {
			return v, false, nil
		}
		ns, err := ReencryptCiphertext(s, oldKey, newKey)
		if err != nil {
			return v, false, err
		}
		return reflect.ValueOf(ns), true, nil
	case reflect.Map:
		if v.IsNil() {
			return v, false, nil
		}
		changed := false
		for _, k := range v.MapKeys() {
			nv, c, err := rotateJSONClone(v.MapIndex(k), oldKey, newKey)
			if err != nil {
				return v, changed, err
			}
			if c {
				v.SetMapIndex(k, nv)
				changed = true
			}
		}
		return v, changed, nil
	case reflect.Slice, reflect.Array:
		changed := false
		for i := 0; i < v.Len(); i++ {
			idx := v.Index(i)
			nv, c, err := rotateJSONClone(idx, oldKey, newKey)
			if err != nil {
				return v, changed, err
			}
			if c {
				if idx.CanSet() && nv.Type().AssignableTo(idx.Type()) {
					idx.Set(nv)
				} else if idx.Kind() == reflect.Interface {
					idx.Set(nv)
				}
				changed = true
			}
		}
		return v, changed, nil
	case reflect.Struct:
		if isSafeStringFamily(v.Type()) {
			c, err := rotateSafeStringValue(v, oldKey, newKey)
			return v, c, err
		}
		if !v.CanAddr() && !v.CanSet() {
			return v, false, nil
		}
		c, err := rotateStruct(v, oldKey, newKey)
		return v, c, err
	default:
		return v, false, nil
	}
}

func isSafeStringFamily(t reflect.Type) bool {
	if t == nil {
		return false
	}
	if t == safeStringType || t == safeStringPtrType {
		return true
	}
	if t.Kind() == reflect.Ptr {
		return isSafeStringFamily(t.Elem())
	}
	return t.Kind() == reflect.Struct && t.ConvertibleTo(safeStringType)
}

func isGormEmbedded(sf reflect.StructField) bool {
	tag := sf.Tag.Get("gorm")
	for _, part := range strings.Split(tag, ";") {
		if strings.TrimSpace(part) == "embedded" || strings.HasPrefix(strings.TrimSpace(part), "embeddedPrefix:") {
			return true
		}
	}
	return false
}

func isAssociationField(sf reflect.StructField) bool {
	tag := sf.Tag.Get("gorm")
	if tag == "-" {
		return true
	}
	for _, part := range strings.Split(tag, ";") {
		p := strings.TrimSpace(part)
		if strings.HasPrefix(p, "many2many:") || strings.HasPrefix(p, "foreignKey:") || strings.HasPrefix(p, "references:") {
			return true
		}
	}
	t := sf.Type
	if t.Kind() == reflect.Ptr {
		t = t.Elem()
	}
	if t.Kind() == reflect.Slice || t.Kind() == reflect.Array {
		et := t.Elem()
		if et.Kind() == reflect.Ptr {
			et = et.Elem()
		}
		if et.Kind() == reflect.Struct && !isSafeStringFamily(et) {
			return true
		}
	}
	return false
}
