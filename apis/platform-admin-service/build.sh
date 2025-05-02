#!/bin/bash

set -e

# Build the project
mvn clean package spring-boot:repackage -DskipTests=true

# Copy the jar file to the target directory
cp interface/target/platform-admin-service-interface-1.0.0-SNAPSHOT.jar target/platform-admin-service.jar

echo "Build complete!" 