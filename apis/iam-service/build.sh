#!/bin/bash
set -e

echo "Building IAM Service..."
echo "Compiling and packaging service..."

mvn clean package

echo "IAM Service build completed successfully!" 