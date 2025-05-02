#!/bin/bash
set -e

echo "Building company-service..."

# Clean and install the project
mvn clean install -DskipTests

# Package the application
mvn package spring-boot:repackage -pl interface -DskipTests

echo "Build completed successfully!" 