package service

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/go-kit/log/level"
	"github.com/go-ldap/ldap/v3"
	clientsldap "github.com/sven-victor/ez-console/pkg/clients/ldap"
	"github.com/sven-victor/ez-utils/log"
	w "github.com/sven-victor/ez-utils/wrapper"
	"gorm.io/gorm"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
)

// LDAPService provides LDAP related services
type LDAPService struct {
	baseService *BaseService
	ldapPool    *clientsldap.Pool
}

func NewLDAPService(ctx context.Context, baseService *BaseService) *LDAPService {
	ldapPool, err := clientsldap.NewPool(ctx, baseService.GetLDAPSettings)
	if err != nil {
		panic(err)
	}
	service := &LDAPService{
		baseService: baseService,
		ldapPool:    ldapPool,
	}
	return service
}

// GetLDAPClient Retrieve the already `Bind` LDAP client connection,
func (s *LDAPService) GetLDAPSession(ctx context.Context) (clientsldap.Conn, error) {
	ldapConn, err := s.ldapPool.Get(ctx)
	if err != nil {
		return nil, err
	}
	return ldapConn, nil
}

func (s *LDAPService) GetLDAPConn(ctx context.Context) (*ldap.Conn, error) {
	settings, err := s.baseService.GetLDAPSettings(ctx)
	if err != nil {
		return nil, err
	}
	return clientsldap.NewConn(ctx, settings)
}

// TestLDAPConnection tests LDAP connection
func (s *LDAPService) TestLDAPConnection(ctx context.Context, ldapSettings clientsldap.Options, username, password string) (*model.LDAPTestResponse, error) {
	logger := log.GetContextLogger(ctx)
	var messages []model.LDAPTestMessage
	if !ldapSettings.Enabled {
		messages = append(messages, model.LDAPTestMessage{
			Success: false,
			Message: "LDAP authentication is not enabled",
		})
		return &model.LDAPTestResponse{
			Success: false,
			Message: messages,
		}, nil
	}

	l, err := clientsldap.NewConn(ctx, ldapSettings)
	if err != nil {
		messages = append(messages, model.LDAPTestMessage{
			Success: false,
			Message: fmt.Sprintf("Failed to connect to LDAP server: %s", err),
		})
		return &model.LDAPTestResponse{
			Success: false,
			Message: messages,
		}, nil
	} else {
		messages = append(messages, model.LDAPTestMessage{
			Success: true,
			Message: "LDAP server connected successfully",
		})
	}
	defer l.Close()
	bindPassword, err := ldapSettings.BindPassword.UnsafeString()
	if err != nil {
		messages = append(messages, model.LDAPTestMessage{
			Success: false,
			Message: fmt.Sprintf("Failed to get bind password: %v", err),
		})
	}
	if err := l.Bind(ldapSettings.BindDN, bindPassword); err != nil {
		messages = append(messages, model.LDAPTestMessage{
			Success: false,
			Message: fmt.Sprintf("Failed to bind with user credentials: %v", err),
		})
	}
	// Build user search filter
	userFilter := ldapSettings.BuildUserFilter(username)
	searchRequest := ldap.NewSearchRequest(
		ldapSettings.BaseDN,
		ldap.ScopeWholeSubtree, ldap.NeverDerefAliases, 0, 0, false,
		userFilter,
		[]string{ldapSettings.UserAttr, ldapSettings.EmailAttr, ldapSettings.DisplayNameAttr, "entryUUID", "createTimestamp", "modifyTimestamp"},
		nil,
	)
	level.Info(logger).Log("msg", "Searching LDAP user", "userFilter", userFilter)
	// Search user
	result, err := l.Search(searchRequest)
	if err != nil {
		messages = append(messages, model.LDAPTestMessage{
			Success: false,
			Message: fmt.Sprintf("Failed to search LDAP user: %v", err),
		})
		return &model.LDAPTestResponse{
			Success: false,
			Message: messages,
		}, nil
	}
	level.Info(logger).Log("msg", "LDAP user search result", "resultTotal", len(result.Entries))

	if len(result.Entries) == 0 {
		messages = append(messages, model.LDAPTestMessage{
			Success: false,
			Message: "User not found",
		})
		return &model.LDAPTestResponse{
			Success: false,
			Message: messages,
		}, nil
	} else {
		messages = append(messages, model.LDAPTestMessage{
			Success: true,
			Message: fmt.Sprintf("LDAP user search successful, result total: %d", len(result.Entries)),
		})
	}

	// Try to use user credentials to bind
	userDN := result.Entries[0].DN
	level.Info(logger).Log("msg", "Binding LDAP user", "userDN", userDN)
	if err := l.Bind(userDN, password); err != nil {
		messages = append(messages, model.LDAPTestMessage{
			Success: false,
			Message: fmt.Sprintf("Failed to bind with user credentials: %v", err),
		})
		return &model.LDAPTestResponse{
			Success: false,
			Message: messages,
		}, nil
	} else {
		messages = append(messages, model.LDAPTestMessage{
			Success: true,
			Message: "LDAP user bound successfully",
		})
	}

	// Get user information
	entry := result.Entries[0]
	user := &model.User{
		Username: entry.GetAttributeValue(ldapSettings.UserAttr),
		Email:    entry.GetAttributeValue(ldapSettings.EmailAttr),
		FullName: entry.GetAttributeValue(ldapSettings.DisplayNameAttr),
		Status:   model.UserStatusActive,
		Source:   model.UserSourceLDAP,
		LDAPDN:   entry.DN,
		Base: model.Base{
			ResourceID: entry.GetAttributeValue("entryUUID"),
			CreatedAt:  util.SafeParseTime("20060102150405Z", entry.GetAttributeValue("createTimestamp")),
			UpdatedAt:  util.SafeParseTime("20060102150405Z", entry.GetAttributeValue("modifyTimestamp")),
		},
	}

	return &model.LDAPTestResponse{
		Success: true,
		Message: messages,
		User:    user,
	}, nil
}

func (s *LDAPService) FilterLDAPEntries(ctx context.Context, baseDN string, filter string, attributes []string) ([]*ldap.Entry, error) {
	logger := log.GetContextLogger(ctx)
	ldapClient, err := s.GetLDAPSession(ctx)
	if err != nil {
		return nil, err
	}
	defer ldapClient.Close()

	searchRequest := ldap.NewSearchRequest(
		baseDN,
		ldap.ScopeWholeSubtree, ldap.NeverDerefAliases, 0, 0, false,
		filter,
		attributes,
		nil,
	)
	level.Info(logger).Log("msg", "Searching LDAP entries", "filter", searchRequest.Filter)
	result, err := ldapClient.Search(searchRequest)
	if err != nil {
		return nil, fmt.Errorf("failed to search LDAP entries: %v", err)
	}
	level.Info(logger).Log("msg", "Found LDAP entries", "total", len(result.Entries))
	return result.Entries, nil
}

func (s *LDAPService) GetLDAPEntry(ctx context.Context, baseDN string, attributes []string) (*ldap.Entry, error) {
	logger := log.GetContextLogger(ctx)
	ldapClient, err := s.GetLDAPSession(ctx)
	if err != nil {
		return nil, err
	}
	defer ldapClient.Close()

	searchRequest := ldap.NewSearchRequest(
		baseDN,
		ldap.ScopeBaseObject, ldap.NeverDerefAliases, 0, 0, false,
		"(objectClass=*)",
		attributes,
		nil,
	)
	level.Info(logger).Log("msg", "Getting LDAP entry", "baseDN", baseDN)
	result, err := ldapClient.Search(searchRequest)
	if err != nil {
		return nil, fmt.Errorf("failed to search LDAP entries: %v", err)
	}
	level.Info(logger).Log("msg", "Found LDAP entry", "total", len(result.Entries))
	if len(result.Entries) == 0 {
		return nil, nil
	}
	return result.Entries[0], nil
}

// ImportLDAPUsers imports users from LDAP
func (s *LDAPService) ImportLDAPUsers(ctx context.Context, userDNs []string) ([]model.User, error) {
	logger := log.GetContextLogger(ctx)
	settings, err := s.baseService.GetLDAPSettings(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to get LDAP settings: %w", err)
	}
	if len(userDNs) == 0 {
		filter := fmt.Sprintf("(&(|(%s=%s)(%s=%s))%s)", settings.UserAttr, "*", settings.EmailAttr, "*", settings.UserFilter)
		attributes := []string{settings.UserAttr, settings.EmailAttr, settings.DisplayNameAttr, "entryUUID", "createTimestamp", "modifyTimestamp"}
		entries, err := s.FilterLDAPEntries(ctx, settings.BaseDN, filter, attributes)
		if err != nil {
			return nil, fmt.Errorf("failed to filter LDAP entries: %w", err)
		}
		var users []model.User
		conn := db.Session(ctx)
		// Batch match user information from database by ldapDN, 20 at a time
		for i := 0; i < len(entries); i += 20 {
			var existingUsers []model.User
			batch := entries[i:min(i+20, len(entries))]
			userDNs := w.Map(batch, func(entry *ldap.Entry) string {
				return entry.DN
			})
			err := conn.Model(&model.User{}).Where("ldap_dn IN (?)", userDNs).Find(&existingUsers).Error
			if err != nil {
				return nil, fmt.Errorf("failed to get users: %w", err)
			}
			for _, entry := range batch {
				user := w.Find(existingUsers, func(user model.User) bool {
					return user.LDAPDN == entry.DN
				})
				if user.ResourceID != "" {
					// If already exists, skip
					continue
				}
				var existingUser model.User
				if err := conn.Where("username = ? or email = ?", entry.GetAttributeValue(settings.UserAttr), entry.GetAttributeValue(settings.EmailAttr)).Order("username").First(&existingUser).Error; err != nil {
					if err != gorm.ErrRecordNotFound {
						level.Error(logger).Log("msg", "Failed to check existing user", "err", err.Error())
						return nil, fmt.Errorf("failed to check existing user: %w", err)
					}
				} else if existingUser.ResourceID != "" {
					// If username or email matches, mark as bindable (return ID field)
					users = append(users, model.User{
						LDAPDN:   entry.DN,
						Status:   "active",
						Username: entry.GetAttributeValue(settings.UserAttr),
						Email:    entry.GetAttributeValue(settings.EmailAttr),
						FullName: entry.GetAttributeValue(settings.DisplayNameAttr),
						Base: model.Base{
							ResourceID: entry.GetAttributeValue("entryUUID"),
							CreatedAt:  util.SafeParseTime("20060102150405Z", entry.GetAttributeValue("createTimestamp")),
							UpdatedAt:  util.SafeParseTime("20060102150405Z", entry.GetAttributeValue("modifyTimestamp")),
						},
					})
					continue
				}
				// If username or email does not match, mark as new user (do not return ID field)
				users = append(users, model.User{
					LDAPDN:   entry.DN,
					Status:   "active",
					Username: entry.GetAttributeValue(settings.UserAttr),
					Email:    entry.GetAttributeValue(settings.EmailAttr),
					FullName: entry.GetAttributeValue(settings.DisplayNameAttr),
				})
			}
		}

		return users, nil
	}
	ldapClient, err := s.GetLDAPSession(ctx)
	if err != nil {
		return nil, fmt.Errorf("Failed to get LDAP client: %v", err)
	}

	defer ldapClient.Close()

	users := []model.User{}
	err = db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		for _, userDN := range userDNs {
			searchReq := ldap.NewSearchRequest(
				userDN, ldap.ScopeBaseObject, ldap.NeverDerefAliases, 1, 0, false,
				"(objectClass=*)",
				[]string{ldapClient.GetOptions().UserAttr, ldapClient.GetOptions().EmailAttr, ldapClient.GetOptions().DisplayNameAttr, "entryUUID", "createTimestamp", "modifyTimestamp"},
				nil,
			)
			result, err := ldapClient.Search(searchReq)
			if err != nil {
				return fmt.Errorf("Failed to search LDAP user: %v", err)
			}
			if len(result.Entries) == 0 {
				return fmt.Errorf("User not found: %s", userDN)
			}
			entry := result.Entries[0]
			user := model.User{
				Username: entry.GetAttributeValue(ldapClient.GetOptions().UserAttr),
				Email:    entry.GetAttributeValue(ldapClient.GetOptions().EmailAttr),
				FullName: entry.GetAttributeValue(ldapClient.GetOptions().DisplayNameAttr),
				Status:   model.UserStatusActive,
				Source:   model.UserSourceLDAP,
				LDAPDN:   entry.DN,
			}

			var existingUser model.User
			if err := tx.Where("ldap_dn = ?", entry.DN).First(&existingUser).Error; err != nil {
				if err != gorm.ErrRecordNotFound {
					return fmt.Errorf("Failed to check existing user: %v", err)
				}
			} else if existingUser.ResourceID != "" {
				// If already exists, return error
				return fmt.Errorf("User already exists: %s", user.Username)
			}
			if err := tx.Unscoped().Where("username = ? or email = ?", entry.GetAttributeValue(settings.UserAttr), entry.GetAttributeValue(settings.EmailAttr)).Order("username").First(&existingUser).Error; err != nil {
				if err != gorm.ErrRecordNotFound {
					level.Error(logger).Log("msg", "Failed to check existing user", "err", err.Error())
					return fmt.Errorf("failed to check existing user: %w", err)
				}
			} else if existingUser.ResourceID != "" {
				// If username or email matches, bind
				existingUser.LDAPDN = user.LDAPDN
				existingUser.DeletedAt = gorm.DeletedAt{}
				if err := tx.Unscoped().Select("LDAPDN", "DeletedAt").Updates(&existingUser).Error; err != nil {
					return fmt.Errorf("failed to update user: %w", err)
				}

			} else {
				if err := tx.Create(&user).Error; err != nil {
					return fmt.Errorf("Failed to create user: %v", err)
				}
			}

			users = append(users, user)
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	return users, nil

}

// AuthenticateUser authenticates a user using LDAP
func (s *LDAPService) AuthenticateUser(ctx context.Context, username, password string) (*model.User, error) {
	logger := log.GetContextLogger(ctx)
	securitySettings, err := s.baseService.GetSecuritySettings(ctx)
	if err != nil {
		return nil, util.NewError("E50012", "System error, please contact the administrator", err)
	}
	settings, err := s.baseService.GetLDAPSettings(ctx)
	if err != nil {
		return nil, util.NewError("E50012", "System error, please contact the administrator", err)
	}

	if !settings.Enabled {
		return nil, nil
	}

	// Connect to LDAP server
	ldapClient, err := s.GetLDAPSession(ctx)
	if err != nil {
		return nil, util.NewError("E50013", "System error, please contact the administrator", err)
	}
	defer ldapClient.Close()

	// Build user search filter
	userFilter := fmt.Sprintf("(&(%s=%s)%s)", ldapClient.GetOptions().UserAttr, ldap.EscapeFilter(username), ldapClient.GetOptions().UserFilter)
	searchRequest := ldap.NewSearchRequest(
		ldapClient.GetOptions().BaseDN,
		ldap.ScopeWholeSubtree, ldap.NeverDerefAliases, 0, 0, false,
		userFilter,
		[]string{ldapClient.GetOptions().UserAttr, ldapClient.GetOptions().EmailAttr, ldapClient.GetOptions().DisplayNameAttr, "entryUUID", "createTimestamp", "modifyTimestamp"},
		nil,
	)
	level.Info(logger).Log("msg", "Searching LDAP user", "userFilter", userFilter)
	// Search user
	result, err := ldapClient.Search(searchRequest)
	if err != nil {
		var ldapErr *ldap.Error
		if errors.As(err, &ldapErr) {
			if ldapErr.ResultCode == 32 {
				level.Info(logger).Log("msg", "LDAP user not found", "userFilter", userFilter)
				return nil, nil
			}
		}
		level.Error(logger).Log("msg", "Failed to search LDAP user", "err", err.Error())
		return nil, util.NewError("E50015", "System error, please contact the administrator", err)
	}
	level.Info(logger).Log("msg", "LDAP user search result", "resultTotal", len(result.Entries))

	if len(result.Entries) == 0 {
		level.Info(logger).Log("msg", "LDAP user not found", "userFilter", userFilter)
		return nil, nil
	}
	if len(result.Entries) > 1 {
		return nil, util.NewError("E50016", "found multiple users with the same user filter, please contact the administrator", errors.New("found multiple users with the same user filter, please contact the administrator"))
	}

	// Get user information
	entry := result.Entries[0]
	user := &model.User{
		Username: entry.GetAttributeValue(settings.UserAttr),
		Email:    entry.GetAttributeValue(settings.EmailAttr),
		FullName: entry.GetAttributeValue(settings.DisplayNameAttr),
		Status:   model.UserStatusActive,
		Source:   model.UserSourceLDAP,
		LDAPDN:   entry.DN,
		Base: model.Base{
			ResourceID: entry.GetAttributeValue("entryUUID"),
			CreatedAt:  util.SafeParseTime("20060102150405Z", entry.GetAttributeValue("createTimestamp")),
			UpdatedAt:  util.SafeParseTime("20060102150405Z", entry.GetAttributeValue("modifyTimestamp")),
		},
	}

	conn := db.Session(ctx)
	var existingUsers []model.User

	// Check if the user exists by LDAPDN
	if err = conn.Where("ldap_dn = ?", entry.DN).Preload("Roles.Permissions").Find(&existingUsers).Error; err != nil {
		if err != gorm.ErrRecordNotFound {
			level.Error(logger).Log("msg", "Failed to check existing user", "err", err.Error())
			return nil, err
		}
	}
	// If the user does not exist, check if the user name, resource ID, or email exists
	if len(existingUsers) == 0 {
		err = conn.Where("(username = ? or resource_id = ? or email = ?) and (ldap_dn is null or ldap_dn = '')", user.Username, user.ResourceID, user.Email).Preload("Roles.Permissions").Find(&existingUsers).Error
		if err != nil {
			if err != gorm.ErrRecordNotFound {
				level.Error(logger).Log("msg", "Failed to check existing user", "err", err.Error())
				return nil, err
			}
		}
	}

	var existingUser model.User
	if len(existingUsers) > 1 {
		var index int
		if index = w.FindIndex(existingUsers, *user, func(u1, u2 model.User) bool {
			return u1.ResourceID == u2.ResourceID
		}); index >= 0 {
			existingUser = existingUsers[index]
		} else if index = w.FindIndex(existingUsers, *user, func(u1, u2 model.User) bool {
			return u1.Username == u2.Username
		}); index >= 0 {
			existingUser = existingUsers[index]
		} else if index = w.FindIndex(existingUsers, *user, func(u1, u2 model.User) bool {
			return u1.Email == u2.Email
		}); index >= 0 {
			existingUser = existingUsers[index]
		}
		if index < 0 {
			return nil, util.NewError("E4011", "Invalid username or password", errors.New("User not found"))
		}

	} else if len(existingUsers) == 0 {
		// Create new user
		if err := conn.Create(user).Error; err != nil {
			level.Error(logger).Log("msg", "Failed to create user", "err", err.Error())
			return nil, err
		}
		// Configure role
		if settings.DefaultRole != "" {
			var role model.Role
			if err := conn.Where("name = ?", settings.DefaultRole).First(&role).Error; err != nil {
				if errors.Is(err, gorm.ErrRecordNotFound) {
					role = model.Role{
						Name:        settings.DefaultRole,
						Description: "Import from LDAP",
					}
					if err := conn.Create(&role).Error; err != nil {
						return nil, fmt.Errorf("Failed to create role: %w", err)
					}
				} else {
					return nil, fmt.Errorf("Failed to find role: %w", err)
				}

			}
			if err := conn.Model(user).Association("Roles").Append(&role); err != nil {
				level.Error(logger).Log("msg", "Failed to append role", "err", err.Error())
				return nil, err
			}
		}
		existingUser = *user
	}
	if len(existingUsers) == 1 {
		existingUser = existingUsers[0]
	}

	userUpdateFields := []string{}
	defer func() {
		if len(userUpdateFields) > 0 {
			// Update existing user information
			if err := db.Session(ctx).Select(userUpdateFields).Save(&existingUser).Error; err != nil {
				level.Error(logger).Log("msg", "Failed to update user", "err", err.Error())
			}
			middleware.DeleteUserCache(user.ResourceID)
		}
	}()

	loginConn, err := clientsldap.NewConn(ctx, settings)
	if err != nil {
		return nil, err
	}
	defer loginConn.Close()

	// Try to bind with user credentials
	userDN := result.Entries[0].DN
	if err := loginConn.Bind(userDN, password); err != nil {
		// Record login failure and lock account based on configuration
		existingUser.IncrementLoginAttempts()
		if securitySettings.LoginFailureLock && securitySettings.LoginFailureAttempts > 0 && existingUser.LoginAttempts >= securitySettings.LoginFailureAttempts {
			if securitySettings.LoginFailureLockoutMinutes > 0 {
				existingUser.Lock(time.Duration(securitySettings.LoginFailureLockoutMinutes) * time.Minute)
			} else {
				existingUser.LockedUntil = time.Now().AddDate(100, 0, 0)
			}
			if existingUser.Email != "" {
				s.baseService.SendEmailFromTemplate(ctx, []string{existingUser.Email}, "User Locked", model.SettingSMTPUserLockedTemplate, map[string]any{
					"Username": existingUser.Username,
					"UserID":   existingUser.ResourceID,
					"Email":    existingUser.Email,
					"Avatar":   existingUser.Avatar,
					"FullName": existingUser.FullName,
				})
			}
		}
		userUpdateFields = append(userUpdateFields, "LoginAttempts", "LockedUntil")
		level.Error(logger).Log("msg", "Failed to bind with user credentials", "err", err.Error())
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusUnauthorized,
			Code:     "E4011",
			Err:      err,
			Message:  "Invalid username or password",
		}
	}

	userUpdateFields = append(userUpdateFields, "Source", "Password", "Salt", "LDAPDN")
	existingUser.Source = model.UserSourceLDAP
	existingUser.Password = ""
	existingUser.Salt = ""
	existingUser.LDAPDN = user.LDAPDN

	if user.FullName != existingUser.FullName {
		userUpdateFields = append(userUpdateFields, "FullName")
		existingUser.FullName = user.FullName
	}

	if user.Email != existingUser.Email {
		userUpdateFields = append(userUpdateFields, "Email")
		existingUser.Email = user.Email
	}

	user = &existingUser

	return user, nil
}
