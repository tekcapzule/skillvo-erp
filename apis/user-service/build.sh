#!/bin/bash
set -e

echo "Building user-service..."

# Clean and install the project
mvn clean install -DskipTests

# Package the application
mvn package spring-boot:repackage -pl interface -DskipTests

echo "Build completed successfully!" 