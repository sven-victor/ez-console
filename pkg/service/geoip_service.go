// Copyright 2025 Sven Victor
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

package service

import (
	"context"
	"net/netip"
	"os"
	"strings"
	"sync"

	"github.com/go-kit/log/level"
	geoip2 "github.com/oschwald/geoip2-golang/v2"

	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-utils/log"
)

type GeoIPService struct {
	db *geoip2.Reader
	mu sync.Mutex
}

func NewGeoIPService(ctx context.Context) *GeoIPService {
	logger := log.GetContextLogger(ctx)
	cfg := config.GetConfig()
	if cfg.Server.GeoIPDBPath != "" {
		if _, err := os.Stat(cfg.Server.GeoIPDBPath); os.IsNotExist(err) {
			level.Error(logger).Log("msg", "GeoIP database file does not exist", "path", cfg.Server.GeoIPDBPath)
			os.Exit(1)
		} else if err != nil {
			level.Error(logger).Log("msg", "failed to open GeoIP database", "error", err)
			os.Exit(1)
		}
		level.Info(logger).Log("msg", "opening GeoIP database", "path", cfg.Server.GeoIPDBPath)
		reader, err := geoip2.Open(cfg.Server.GeoIPDBPath)
		if err != nil {
			level.Error(logger).Log("msg", "failed to open GeoIP database", "error", err)
			os.Exit(1)
		}
		return &GeoIPService{db: reader}
	}
	return &GeoIPService{}
}

func (s *GeoIPService) City(inet netip.Addr) (*geoip2.City, error) {
	if s.db == nil {
		return nil, nil
	}
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.db.City(inet)
}

func (s *GeoIPService) MustGetLocation(ctx context.Context, addr string, language string) string {
	var loc string
	var err error
	if addr != "" {
		loc, err = s.GetLocation(ctx, addr, language)
		if err != nil {
			level.Error(log.GetContextLogger(ctx)).Log("msg", "failed to get location", "ip", addr, "error", err)
		}
	}
	if loc == "" {
		language = strings.ToLower(language)
		language, _, _ = strings.Cut(language, "-")
		switch language {
		case "de":
			loc = "Unbekannt"
		case "es":
			loc = "Desconocido"
		case "fr":
			loc = "Inconnu"
		case "ja":
			loc = "不明"
		case "pt":
			loc = "Desconhecido"
		case "ru":
			loc = "Неизвестно"
		case "zh":
			loc = "未知"
		case "ar":
			loc = "غير معروف"
		case "sv":
			loc = "Okänd"
		default:
			loc = "Unknown"
		}
	}
	return loc
}

func (s *GeoIPService) GetLocation(ctx context.Context, addr string, language string) (string, error) {
	language = strings.ToLower(language)
	language, _, _ = strings.Cut(language, "-")
	ip, err := netip.ParseAddr(addr)
	if err != nil {
		return "", err
	}
	if s.db == nil {
		return "", nil
	}
	if ip.IsPrivate() || ip.IsLoopback() {
		switch language {
		case "de":
			return "Lokale Netzwerk", nil
		case "es":
			return "Red Local", nil
		case "fr":
			return "Réseau Local", nil
		case "ja":
			return "ローカルネットワーク", nil
		case "pt":
			return "Rede Local", nil
		case "ru":
			return "Локальная сеть", nil
		case "zh":
			return "本地网络", nil
		case "ar":
			return "شبكة خاصة", nil
		case "sv":
			return "Lokalt nätverk", nil
		default:
			return "Local Network", nil
		}
	}

	city, err := s.City(ip)
	if err != nil {
		return "", err
	}
	if city == nil {
		return "", nil
	}

	var locs []string
	switch language {
	case "de":
		locs = append(locs, city.Country.Names.German)
		if len(city.Subdivisions) > 0 {
			locs = append(locs, city.Subdivisions[0].Names.German)
		} else if len(city.City.Names.German) > 0 {
			locs = append(locs, city.City.Names.German)
		}
	case "es":
		locs = append(locs, city.Country.Names.Spanish)
		if len(city.Subdivisions) > 0 {
			locs = append(locs, city.Subdivisions[0].Names.Spanish)
		} else if len(city.City.Names.Spanish) > 0 {
			locs = append(locs, city.City.Names.Spanish)
		}
	case "fr":
		locs = append(locs, city.Country.Names.French)
		if len(city.Subdivisions) > 0 {
			locs = append(locs, city.Subdivisions[0].Names.French)
		} else if len(city.City.Names.French) > 0 {
			locs = append(locs, city.City.Names.French)
		}
	case "ja":
		locs = append(locs, city.Country.Names.Japanese)
		if len(city.Subdivisions) > 0 {
			locs = append(locs, city.Subdivisions[0].Names.Japanese)
		} else if len(city.City.Names.Japanese) > 0 {
			locs = append(locs, city.City.Names.Japanese)
		}
	case "pt":
		locs = append(locs, city.Country.Names.BrazilianPortuguese)
		if len(city.Subdivisions) > 0 {
			locs = append(locs, city.Subdivisions[0].Names.BrazilianPortuguese)
		} else if len(city.City.Names.BrazilianPortuguese) > 0 {
			locs = append(locs, city.City.Names.BrazilianPortuguese)
		}
	case "ru":
		locs = append(locs, city.Country.Names.Russian)
		if len(city.Subdivisions) > 0 {
			locs = append(locs, city.Subdivisions[0].Names.Russian)
		} else if len(city.City.Names.Russian) > 0 {
			locs = append(locs, city.City.Names.Russian)
		}
	case "zh":
		locs = append(locs, city.Country.Names.SimplifiedChinese)
		if len(city.Subdivisions) > 0 {
			locs = append(locs, city.Subdivisions[0].Names.SimplifiedChinese)
		} else if len(city.City.Names.SimplifiedChinese) > 0 {
			locs = append(locs, city.City.Names.SimplifiedChinese)
		}
	default:
		locs = append(locs, city.Country.Names.English)
		if len(city.Subdivisions) > 0 {
			locs = append(locs, city.Subdivisions[0].Names.English)
		} else if len(city.City.Names.English) > 0 {
			locs = append(locs, city.City.Names.English)
		}
	}
	return strings.Join(locs, "/"), nil
}
