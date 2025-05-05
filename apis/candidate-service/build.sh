#!/bin/bash

# Exit on error
set -e

# Build the service
echo "Building candidate-service..."
mvn clean install -DskipTests

echo "Candidate service build completed."

# Add deployment steps here when needed 