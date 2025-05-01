#!/bin/bash

# Exit on error
set -e

echo "🔨 Building the application..."

# Clean and build the project
mvn clean install

echo "📦 Packaging the Lambda function..."

# Create a thin JAR for Lambda
cd interface
mvn clean package -DskipTests

echo "🧪 Testing locally with SAM..."

# Test the Lambda function locally
sam build
sam local invoke CreateCourseFunction --event events/create-course.json

echo "✅ Build and test completed successfully!" 