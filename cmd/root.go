/*
Copyright © 2025 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"os"

	"github.com/sven-victor/ez-console/server"
)

var cfgFile string

// rootCmd represents the base command when called without any subcommands
var rootCmd = server.NewCommandServer("ez-console", "ez-console is a web console frame.")

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}
