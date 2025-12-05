package main

import (
	_ "github.com/sven-victor/ez-console/examples/backend/controller"

	consoleserver "github.com/sven-victor/ez-console/server"
)

var rootCmd = consoleserver.NewCommandServer("ez-auth", "ez-auth")

func main() {
	rootCmd.Execute()
}
