package ldap

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"errors"
	"fmt"
	"net/http"
	"reflect"
	"time"

	kitlog "github.com/go-kit/log"
	"github.com/go-kit/log/level"
	ldap "github.com/go-ldap/ldap/v3"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-console/pkg/util/pool"
	"github.com/sven-victor/ez-utils/log"
	w "github.com/sven-victor/ez-utils/wrapper"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
)

type Conn interface {
	ldapConn
	GetOptions() Options
}

type ldapConn interface {
	IsClosing() bool
	TLSConnectionState() (tls.ConnectionState, bool)
	UnauthenticatedBind(username string) error
	ExternalBind() error
	NTLMUnauthenticatedBind(domain, username string) error
	Unbind() error
	ModifyWithResult(request *ldap.ModifyRequest) (*ldap.ModifyResult, error)
	Start()
	StartTLS(config *tls.Config) error
	Close() error
	SimpleBind(simpleBindRequest *ldap.SimpleBindRequest) (*ldap.SimpleBindResult, error)
	Bind(username, password string) error
	ModifyDN(modifyDNRequest *ldap.ModifyDNRequest) error
	SetTimeout(t time.Duration)
	Add(addRequest *ldap.AddRequest) error
	Del(delRequest *ldap.DelRequest) error
	Modify(modifyRequest *ldap.ModifyRequest) error
	Compare(dn, attribute, value string) (bool, error)
	PasswordModify(passwordModifyRequest *ldap.PasswordModifyRequest) (*ldap.PasswordModifyResult, error)
	Search(searchRequest *ldap.SearchRequest) (*ldap.SearchResult, error)
	SearchWithPaging(searchRequest *ldap.SearchRequest, pagingSize uint32) (*ldap.SearchResult, error)
}

var _ ldapConn = (*ldap.Conn)(nil)

type conn struct {
	*ldap.Conn
	options Options
}

func (c *conn) GetOptions() Options {
	return c.options
}

func (c *conn) Ping() error {
	return nil
}

func (c *conn) Close() error {
	return c.Conn.Close()
}

func valElem(valOf reflect.Value) reflect.Value {
	if valOf.Kind() == reflect.Ptr || valOf.Kind() == reflect.Pointer {
		return valElem(valOf.Elem())
	}
	return valOf
}

func typeElem(typeOf reflect.Type) reflect.Type {
	if typeOf.Kind() == reflect.Ptr || typeOf.Kind() == reflect.Pointer {
		return typeElem(typeOf.Elem())
	}
	return typeOf
}

func debug(ctx context.Context, name string, req interface{}, err error) {
	logger := log.GetContextLogger(ctx, log.WithCaller(6))
	if req != nil {

		typeOf := typeElem(reflect.TypeOf(req))
		valOf := valElem(reflect.ValueOf(req))
		for i := 0; i < valOf.NumField(); i++ {
			field := valOf.Field(i)
			elem := valElem(field)
			switch elem.Kind() {
			case reflect.Slice, reflect.Array:
				logger = kitlog.With(logger, log.WrapKeyName(typeOf.Field(i).Name), w.JSONStringer(elem.Interface()))
			default:
				fieldName := typeOf.Field(i).Name
				if fieldName == "Controls" && elem.Interface() == nil {
					continue
				}
				logger = kitlog.With(logger, log.WrapKeyName(fieldName), elem.Interface())
			}
		}
	}

	if err != nil {
		level.Error(logger).Log("msg", "failed to execute: "+name, "err", err)
	} else {
		level.Debug(logger).Log("msg", "execute:  "+name)
	}
}

type PoolConn struct {
	*conn
	pool *pool.Pool[*conn]
	ctx  context.Context
}

// Add implements Conn.
func (c *PoolConn) Add(addRequest *ldap.AddRequest) (err error) {
	defer func() {
		debug(c.ctx, "add LDAP entry", addRequest, err)
	}()
	_, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(c.ctx, "Add LDAP Entry")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	span.SetAttributes(attribute.String("ldap.operation", "add"))
	span.SetAttributes(attribute.String("ldap.dn", addRequest.DN))
	return c.conn.Add(addRequest)
}

// Bind implements Conn.
func (c *PoolConn) Bind(username string, password string) (err error) {
	defer func() {
		debug(c.ctx, "bind LDAP entry", username, err)
	}()
	_, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(c.ctx, "Bind LDAP Entry")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	span.SetAttributes(attribute.String("ldap.operation", "bind"))
	span.SetAttributes(attribute.String("ldap.username", username))
	return c.conn.Bind(username, password)
}

// Del implements Conn.
func (c *PoolConn) Del(delRequest *ldap.DelRequest) (err error) {
	defer func() {
		debug(c.ctx, "del LDAP entry", delRequest, err)
	}()
	_, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(c.ctx, "Delete LDAP Entry")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	span.SetAttributes(attribute.String("ldap.operation", "delete"))
	span.SetAttributes(attribute.String("ldap.dn", delRequest.DN))
	return c.conn.Del(delRequest)
}

// Modify implements Conn.
func (c *PoolConn) Modify(modifyRequest *ldap.ModifyRequest) (err error) {
	defer func() {
		debug(c.ctx, "modify LDAP entry", modifyRequest, err)
	}()
	_, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(c.ctx, "Modify LDAP Entry")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	span.SetAttributes(attribute.String("ldap.operation", "modify"))
	span.SetAttributes(attribute.String("ldap.dn", modifyRequest.DN))
	return c.conn.Modify(modifyRequest)
}

// ModifyDN implements Conn.
func (c *PoolConn) ModifyDN(modifyDNRequest *ldap.ModifyDNRequest) (err error) {
	defer func() {
		debug(c.ctx, "modify DN LDAP entry", modifyDNRequest, err)
	}()
	_, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(c.ctx, "Modify DN LDAP Entry")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	span.SetAttributes(attribute.String("ldap.operation", "modify DN"))
	span.SetAttributes(attribute.String("ldap.dn", modifyDNRequest.DN))
	span.SetAttributes(attribute.String("ldap.new_rdn", modifyDNRequest.NewRDN))
	return c.conn.ModifyDN(modifyDNRequest)
}

// ModifyWithResult implements Conn.
func (c *PoolConn) ModifyWithResult(request *ldap.ModifyRequest) (result *ldap.ModifyResult, err error) {
	defer func() {
		debug(c.ctx, "modify with result LDAP entry", request, err)
	}()
	_, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(c.ctx, "Modify With Result LDAP Entry")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	span.SetAttributes(attribute.String("ldap.operation", "modify with result"))
	span.SetAttributes(attribute.String("ldap.dn", request.DN))
	return c.conn.ModifyWithResult(request)
}

// NTLMUnauthenticatedBind implements Conn.
func (c *PoolConn) NTLMUnauthenticatedBind(domain string, username string) (err error) {
	defer func() {
		debug(c.ctx, "NTLM unauthenticated bind LDAP entry", fmt.Sprintf("%s@%s", username, domain), err)
	}()
	_, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(c.ctx, "NTLM Unauthenticated Bind LDAP Entry")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	span.SetAttributes(attribute.String("ldap.operation", "NTLM unauthenticated bind"))
	span.SetAttributes(attribute.String("ldap.domain", domain))
	span.SetAttributes(attribute.String("ldap.username", username))
	return c.conn.NTLMUnauthenticatedBind(domain, username)
}

// PasswordModify implements Conn.
func (c *PoolConn) PasswordModify(passwordModifyRequest *ldap.PasswordModifyRequest) (result *ldap.PasswordModifyResult, err error) {
	defer func() {
		debug(c.ctx, "password modify LDAP entry", passwordModifyRequest, err)
	}()
	_, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(c.ctx, "Password Modify LDAP Entry")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	span.SetAttributes(attribute.String("ldap.operation", "password modify"))
	span.SetAttributes(attribute.String("ldap.user_identity", passwordModifyRequest.UserIdentity))
	return c.conn.PasswordModify(passwordModifyRequest)
}

// Search implements Conn.
func (c *PoolConn) Search(searchRequest *ldap.SearchRequest) (result *ldap.SearchResult, err error) {
	defer func() {
		type searchResult struct {
			*ldap.SearchRequest
			Total int
		}
		if result != nil {
			debug(c.ctx, "search LDAP entry", searchResult{
				SearchRequest: searchRequest,
				Total:         len(result.Entries),
			}, err)
		} else {
			debug(c.ctx, "search LDAP entry", searchRequest, err)
		}
	}()

	_, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(c.ctx, "Search LDAP Entry")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	span.SetAttributes(attribute.String("ldap.operation", "search"))
	span.SetAttributes(attribute.String("ldap.dn", searchRequest.BaseDN))
	span.SetAttributes(attribute.String("ldap.filter", searchRequest.Filter))
	span.SetAttributes(attribute.Int("ldap.scope", searchRequest.Scope))
	span.SetAttributes(attribute.Int("ldap.deref_aliases", searchRequest.DerefAliases))
	span.SetAttributes(attribute.Int("ldap.size_limit", searchRequest.SizeLimit))
	span.SetAttributes(attribute.Int("ldap.time_limit", searchRequest.TimeLimit))
	span.SetAttributes(attribute.Bool("ldap.types_only", searchRequest.TypesOnly))
	result, err = c.conn.Search(searchRequest)
	if err != nil {
		return nil, err
	}

	return result, nil
}

// SearchWithPaging implements Conn.
func (c *PoolConn) SearchWithPaging(searchRequest *ldap.SearchRequest, pagingSize uint32) (result *ldap.SearchResult, err error) {
	defer func() {
		debug(c.ctx, "search with paging LDAP entry", searchRequest, err)
	}()
	_, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(c.ctx, "Search With Paging LDAP Entry")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	span.SetAttributes(attribute.String("ldap.operation", "search with paging"))
	span.SetAttributes(attribute.String("ldap.dn", searchRequest.BaseDN))
	span.SetAttributes(attribute.String("ldap.filter", searchRequest.Filter))
	span.SetAttributes(attribute.Int("ldap.scope", searchRequest.Scope))
	span.SetAttributes(attribute.Int("ldap.deref_aliases", searchRequest.DerefAliases))
	span.SetAttributes(attribute.Int("ldap.size_limit", searchRequest.SizeLimit))
	span.SetAttributes(attribute.Int("ldap.time_limit", searchRequest.TimeLimit))
	span.SetAttributes(attribute.Bool("ldap.types_only", searchRequest.TypesOnly))
	span.SetAttributes(attribute.Int("ldap.paging_size", int(pagingSize)))
	return c.conn.SearchWithPaging(searchRequest, pagingSize)
}

// SimpleBind implements Conn.
func (c *PoolConn) SimpleBind(simpleBindRequest *ldap.SimpleBindRequest) (result *ldap.SimpleBindResult, err error) {
	defer func() {
		debugReq := *simpleBindRequest
		debugReq.Password = "<secret>"
		debug(c.ctx, "simple bind LDAP entry", debugReq, err)
	}()
	_, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(c.ctx, "Simple Bind LDAP Entry")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	span.SetAttributes(attribute.String("ldap.operation", "simple bind"))
	span.SetAttributes(attribute.String("ldap.username", simpleBindRequest.Username))
	return c.conn.SimpleBind(simpleBindRequest)
}

// UnauthenticatedBind implements Conn.
func (c *PoolConn) UnauthenticatedBind(username string) (err error) {
	defer func() {
		debug(c.ctx, "unauthenticated bind LDAP entry", username, err)
	}()
	_, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(c.ctx, "Unauthenticated Bind LDAP Entry")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	span.SetAttributes(attribute.String("ldap.operation", "unauthenticated bind"))
	span.SetAttributes(attribute.String("ldap.username", username))
	return c.conn.UnauthenticatedBind(username)
}

// Unbind implements Conn.
func (c *PoolConn) Unbind() (err error) {
	defer func() {
		debug(c.ctx, "unbind LDAP entry", nil, err)
	}()
	_, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(c.ctx, "Unbind LDAP Entry")
	defer func() {
		if err != nil {
			span.RecordError(err)
		}
		span.End()
	}()
	span.SetAttributes(attribute.String("ldap.operation", "unbind"))
	return c.conn.Unbind()
}

func (c *PoolConn) Close() error {
	c.pool.Put(c.conn)
	return nil
}

type Pool struct {
	pool *pool.Pool[*conn]
}

func (p *Pool) Get(ctx context.Context) (Conn, error) {
	c, err := p.pool.Get(ctx)
	if err != nil {
		return nil, err
	}
	return &PoolConn{conn: c, pool: p.pool, ctx: ctx}, nil
}

func (p *Pool) Close() {
	p.pool.Close()
}

var ErrLDAPDisabled = util.NewErrorMessage("E50039", "LDAP authentication is not enabled")

func NewPool(ctx context.Context, optionsFactory func(ctx context.Context) (Options, error)) (*Pool, error) {
	ldapPool, err := pool.NewPool(ctx, pool.Config[*conn]{
		MinConns:    0,
		MaxConns:    10,
		MaxIdleTime: time.Minute * 10,
		ConnFactory: func(ctx context.Context) (*conn, error) {
			options, err := optionsFactory(ctx)
			if err != nil {
				return nil, err
			}
			if !options.Enabled {
				return nil, ErrLDAPDisabled
			}
			c, err := NewConn(ctx, options)
			if err != nil {
				return nil, err
			}

			var bindPassword string
			if options.BindPassword.Size() > 0 {
				bindPassword, err = options.BindPassword.UnsafeString()
				if err != nil {
					return nil, fmt.Errorf("failed to get bind password: %v", err)
				}
			}

			logger := log.GetContextLogger(ctx)
			level.Info(logger).Log("msg", "Binding LDAP admin", "bindDN", options.BindDN)
			// Bind the admin account
			if err := c.Bind(options.BindDN, bindPassword); err != nil {
				return nil, util.ErrorResponse{
					HTTPCode: http.StatusInternalServerError,
					Code:     "E50011",
					Err:      fmt.Errorf("failed to bind LDAP admin: %v", err),
				}
			}
			return &conn{
				Conn:    c,
				options: options,
			}, nil
		},
	})
	if err != nil {
		return nil, err
	}
	return &Pool{pool: ldapPool}, nil
}

func NewConn(ctx context.Context, options Options) (*ldap.Conn, error) {
	if !options.Enabled {
		return nil, ErrLDAPDisabled
	}
	logger := log.GetContextLogger(ctx)
	level.Info(logger).Log("msg", "Creating LDAP connection", "baseDN", options.BaseDN, "serverURL", options.ServerURL, "startTLS", options.StartTLS, "insecure", options.Insecure)
	tlsConfig := tls.Config{
		InsecureSkipVerify: options.Insecure,
	}

	if options.CACert != "" {
		tlsConfig.RootCAs = x509.NewCertPool()
		if !tlsConfig.RootCAs.AppendCertsFromPEM([]byte(options.CACert)) {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusInternalServerError,
				Code:     "E50011",
				Err:      errors.New("failed to append CA certificate"),
			}
		}
	}
	if options.ClientCert != "" && options.ClientKey != nil && options.ClientKey.Size() > 0 {
		clientKey, err := options.ClientKey.UnsafeString()
		if err != nil {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusInternalServerError,
				Code:     "E50011",
				Err:      err,
			}
		}
		cert, err := tls.X509KeyPair([]byte(options.ClientCert), []byte(clientKey))
		if err != nil {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusInternalServerError,
				Code:     "E50011",
				Err:      err,
			}
		}
		tlsConfig.Certificates = []tls.Certificate{cert}
	}

	ldapConn, err := ldap.DialURL(options.ServerURL, ldap.DialWithTLSConfig(&tlsConfig))
	if err != nil {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E50011",
			Err:      err,
		}
	}
	ldapConn.SetTimeout(options.Timeout)
	if options.StartTLS {
		if err := ldapConn.StartTLS(&tlsConfig); err != nil {
			return nil, util.ErrorResponse{
				HTTPCode: http.StatusInternalServerError,
				Code:     "E50011",
				Err:      fmt.Errorf("failed to start TLS: %v", err),
			}
		}
	}
	return ldapConn, nil
}
