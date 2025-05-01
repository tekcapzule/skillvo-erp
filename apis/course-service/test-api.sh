#!/bin/bash

# Exit on error
set -e

API_URL="http://127.0.0.1:3000"

echo "Testing Course API endpoints..."

# Create a course
echo "Creating a course..."
COURSE_ID=$(curl -s -X POST "${API_URL}/courses" \
    -H "Content-Type: application/json" \
    -d @test-data/create-course.json | jq -r '.courseId')

echo "Course created with ID: ${COURSE_ID}"

# Get the course
echo "Getting course details..."
curl -s "${API_URL}/courses/${COURSE_ID}" | jq '.'

# Update the course
echo "Updating the course..."
curl -s -X PUT "${API_URL}/courses/${COURSE_ID}" \
    -H "Content-Type: application/json" \
    -d @test-data/update-course.json | jq '.'

# List courses
echo "Listing all courses..."
curl -s "${API_URL}/courses?tenantId=test-tenant-1" | jq '.'

# Publish the course
echo "Publishing the course..."
curl -s -X POST "${API_URL}/courses/${COURSE_ID}/publish" | jq '.'

# List published courses
echo "Listing published courses..."
curl -s "${API_URL}/courses?tenantId=test-tenant-1&inMarketplace=true" | jq '.'

# Delete the course
echo "Deleting the course..."
curl -s -X DELETE "${API_URL}/courses/${COURSE_ID}"

echo "API testing completed!" 