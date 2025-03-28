package util

import "time"

func SafeParseTime(format string, timeStr string) time.Time {
	if timeStr == "" {
		return time.Time{}
	}
	parsedTime, err := time.Parse(format, timeStr)
	if err != nil {
		return time.Time{}
	}
	return parsedTime
}
