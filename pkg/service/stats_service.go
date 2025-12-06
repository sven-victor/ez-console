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
	"errors"
	"time"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
)

type StatsService struct {
}

func NewStatsService() *StatsService {
	return &StatsService{}
}

type Statistic struct {
	Title string `json:"title"`
	Value int64  `json:"value"`
	Color string `json:"color,omitempty"`
	Icon  string `json:"icon,omitempty"`
}

type Chart struct {
	Width int `json:"width"`
	*Statistic
	Labels   []string  `json:"labels,omitempty"`
	Datasets []Dataset `json:"datasets,omitempty"`
}

type Dataset struct {
	Label string    `json:"label"`
	Data  []float64 `json:"data"`
	Color string    `json:"color,omitempty"`
}

type ChartRow []Chart

type Charts []ChartRow

type LoginStatus struct {
	LoginDate string  `json:"login_date"`
	Status    string  `json:"status"`
	Count     float64 `json:"count"`
}

func (s *StatsService) GetUserStatistics(ctx context.Context) (Charts, error) {
	userID := middleware.GetUserIDFromContext(ctx)
	if len(userID) == 0 {
		return nil, errors.New("user not found")
	}
	dbConn := db.Session(ctx)
	var loginStatusTotal []LoginStatus

	if err := dbConn.Model(&model.AuditLog{}).
		Select("DATE(timestamp) AS login_date,status,COUNT(*) AS count").
		Where("timestamp > ?", time.Now().AddDate(0, 0, -7)).
		Where("action in ?", []string{"authorization:user:login", "authorization:oauth:callback"}).
		Where("status in ?", []string{"success", "failed"}).
		Where("user_id = ?", userID).
		Order("status,login_date ASC").
		Group("login_date, status").Find(&loginStatusTotal).Error; err != nil {
		return nil, err
	}

	var timeLabels []string
	startTime := time.Now().AddDate(0, 0, -6).Truncate(24 * time.Hour)
	for i := 0; i < 7; i++ {
		timeLabels = append(timeLabels, startTime.AddDate(0, 0, i).Format("2006-01-02"))
	}
	loginSuccessTotal := make([]float64, len(timeLabels))
	loginFailedTotal := make([]float64, len(timeLabels))
	loginUserTotal := make([]float64, len(timeLabels))

	for i := range timeLabels {
		for _, item := range loginStatusTotal {
			if item.LoginDate == timeLabels[i] {
				if item.Status == "success" {
					loginSuccessTotal[i] = item.Count
				} else {
					loginFailedTotal[i] = item.Count
				}
			}
		}
	}

	var loginUserStatus []LoginStatus

	if err := dbConn.Model(&model.AuditLog{}).
		Select("DATE(timestamp) AS login_date,COUNT(DISTINCT user_id) AS count").
		Where("timestamp > ?", time.Now().AddDate(0, 0, -7)).
		Where("user_id = ?", userID).
		Where("action in ? and status = ?", []string{"authorization:user:login", "authorization:oauth:callback"}, "success").
		Order("login_date ASC").
		Group("login_date").Find(&loginUserStatus).Error; err != nil {
		return nil, err
	}

	for i := range timeLabels {
		for _, item := range loginUserStatus {
			if item.LoginDate == timeLabels[i] {
				loginUserTotal[i] = item.Count
			}
		}
	}

	return Charts{
		ChartRow{
			{
				Width:  12,
				Labels: timeLabels,
				Datasets: []Dataset{
					{
						Label: "Login Success Count",
						Data:  loginSuccessTotal,
						Color: "rgba(38, 238, 55, 1)",
					},
					{
						Label: "Login Failed Count",
						Data:  loginFailedTotal,
						Color: "rgba(255, 99, 132, 1)",
					},
				},
			},
			{
				Width:  12,
				Labels: timeLabels,
				Datasets: []Dataset{
					{
						Label: "Login User Total",
						Data:  loginUserTotal,
						Color: "rgba(53, 162, 235, 1)",
					},
				},
			},
		},
	}, nil
}

func (s *StatsService) GetStatistics(ctx context.Context) (Charts, error) {
	dbConn := db.Session(ctx)
	var userTotal int64

	if err := dbConn.Model(&model.User{}).Count(&userTotal).Error; err != nil {
		return nil, err
	}

	var activeUserTotal int64
	if err := dbConn.Model(&model.User{}).Where("status = ?", "active").Count(&activeUserTotal).Error; err != nil {
		return nil, err
	}

	var disabledUserTotal int64
	if err := dbConn.Model(&model.User{}).Where("status = ?", "disabled").Count(&disabledUserTotal).Error; err != nil {
		return nil, err
	}

	var onlineSessionTotal int64
	if err := dbConn.Model(&model.Session{}).Where("expired_at > ? and is_valid = ?", time.Now(), true).Count(&onlineSessionTotal).Error; err != nil {
		return nil, err
	}

	var loginStatusTotal []LoginStatus

	if err := dbConn.Model(&model.AuditLog{}).
		Select("DATE(timestamp) AS login_date,status,COUNT(*) AS count").
		Where("timestamp > ?", time.Now().AddDate(0, 0, -7)).
		Where("action in ?", []string{"authorization:user:login", "authorization:oauth:callback"}).
		Where("status in ?", []string{"success", "failed"}).
		Order("status,login_date ASC").
		Group("login_date, status").Find(&loginStatusTotal).Error; err != nil {
		return nil, err
	}

	var timeLabels []string
	startTime := time.Now().AddDate(0, 0, -6).Truncate(24 * time.Hour)
	for i := 0; i < 7; i++ {
		timeLabels = append(timeLabels, startTime.AddDate(0, 0, i).Format("2006-01-02"))
	}
	loginSuccessTotal := make([]float64, len(timeLabels))
	loginFailedTotal := make([]float64, len(timeLabels))
	loginUserTotal := make([]float64, len(timeLabels))

	for i := range timeLabels {
		for _, item := range loginStatusTotal {
			if item.LoginDate == timeLabels[i] {
				if item.Status == "success" {
					loginSuccessTotal[i] = item.Count
				} else {
					loginFailedTotal[i] = item.Count
				}
			}
		}
	}

	var loginUserStatus []LoginStatus

	if err := dbConn.Model(&model.AuditLog{}).
		Select("DATE(timestamp) AS login_date,COUNT(DISTINCT user_id) AS count").
		Where("timestamp > ?", time.Now().AddDate(0, 0, -7)).
		Where("action in ? and status = ?", []string{"authorization:user:login", "authorization:oauth:callback"}, "success").
		Order("login_date ASC").
		Group("login_date").Find(&loginUserStatus).Error; err != nil {
		return nil, err
	}

	for i := range timeLabels {
		for _, item := range loginUserStatus {
			if item.LoginDate == timeLabels[i] {
				loginUserTotal[i] = item.Count
			}
		}
	}

	return Charts{
		ChartRow{
			{
				Width:     6,
				Statistic: &Statistic{Title: "User Total", Value: userTotal, Icon: "UserOutlined", Color: "#0058f1"},
			},
			{
				Width:     6,
				Statistic: &Statistic{Title: "Active Users", Value: activeUserTotal, Icon: "CheckCircleOutlined", Color: "#3f8600"},
			},
			{
				Width:     6,
				Statistic: &Statistic{Title: "Disabled Users", Value: disabledUserTotal, Icon: "CloseCircleOutlined", Color: "#f5222d"},
			},
			{
				Width:     6,
				Statistic: &Statistic{Title: "Online Sessions", Value: onlineSessionTotal, Icon: "OnlineOutlined", Color: "#13c2c2"},
			},
		},
		ChartRow{
			{
				Width:  12,
				Labels: timeLabels,
				Datasets: []Dataset{
					{
						Label: "Login Success Count",
						Data:  loginSuccessTotal,
						Color: "rgba(38, 238, 55, 1)",
					},
					{
						Label: "Login Failed Count",
						Data:  loginFailedTotal,
						Color: "rgba(255, 99, 132, 1)",
					},
				},
			},
			{
				Width:  12,
				Labels: timeLabels,
				Datasets: []Dataset{
					{
						Label: "Login User Total",
						Data:  loginUserTotal,
						Color: "rgba(53, 162, 235, 1)",
					},
				},
			},
		},
	}, nil
}
