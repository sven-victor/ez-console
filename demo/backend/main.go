package main

import (
	_ "github.com/sven-victor/ez-console/demo/backend/controller"

	consoleserver "github.com/sven-victor/ez-console/server"
)

var rootCmd = consoleserver.NewCommandServer("my-console-app", "my-console-app")

func main() {
	rootCmd.Execute()
}
