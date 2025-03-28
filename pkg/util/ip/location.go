package ip

import (
	"strings"
)

// GetLocation gets the approximate geographical location of an IP address.
// Note: This is a simplified implementation. In a real project, an IP address library or a third-party API should be used.
func GetLocation(ipAddress string) string {
	// If it is a local address, return "Local Network".
	if isLocalIP(ipAddress) {
		return "Local Network"
	}

	// In a real project, an IP address library or a third-party service should be called here.
	// Currently returns a default value.
	return "Unknown Location"
}

// isLocalIP checks if it is a local IP address.
func isLocalIP(ipAddress string) bool {
	return ipAddress == "127.0.0.1" ||
		ipAddress == "::1" ||
		ipAddress == "localhost" ||
		strings.HasPrefix(ipAddress, "192.168.") ||
		strings.HasPrefix(ipAddress, "10.") ||
		strings.HasPrefix(ipAddress, "172.16.") ||
		strings.HasPrefix(ipAddress, "172.17.") ||
		strings.HasPrefix(ipAddress, "172.18.") ||
		strings.HasPrefix(ipAddress, "172.19.") ||
		strings.HasPrefix(ipAddress, "172.20.") ||
		strings.HasPrefix(ipAddress, "172.21.") ||
		strings.HasPrefix(ipAddress, "172.22.") ||
		strings.HasPrefix(ipAddress, "172.23.") ||
		strings.HasPrefix(ipAddress, "172.24.") ||
		strings.HasPrefix(ipAddress, "172.25.") ||
		strings.HasPrefix(ipAddress, "172.26.") ||
		strings.HasPrefix(ipAddress, "172.27.") ||
		strings.HasPrefix(ipAddress, "172.28.") ||
		strings.HasPrefix(ipAddress, "172.29.") ||
		strings.HasPrefix(ipAddress, "172.30.") ||
		strings.HasPrefix(ipAddress, "172.31.")
}
