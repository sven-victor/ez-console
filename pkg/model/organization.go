package model

// Organization represents an organization in the system
type Organization struct {
	Base
	Name        string `gorm:"size:100;not null" json:"name"`
	Description string `gorm:"size:255" json:"description"`
	Status      string `gorm:"size:20;not null;default:'active'" json:"status"` // active, disabled
}

const (
	OrganizationStatusActive   = "active"
	OrganizationStatusDisabled = "disabled"
)

// IsActive checks if the organization is active
func (o *Organization) IsActive() bool {
	return o.Status == OrganizationStatusActive
}
