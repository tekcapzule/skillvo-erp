#!/bin/bash

# Exit on error
set -e

echo "🔨 Building application..."
mvn clean install -DskipTests

echo "📦 Building interface module..."
cd interface
mvn clean package -DskipTests
cd ..

echo "🚀 Building with SAM..."
sam build --use-container

echo "🧪 Testing CreateCourse Lambda..."
sam local invoke CreateCourseFunction --event events/create-course.json

echo "🧪 Testing GetCourse Lambda..."
sam local invoke GetCourseFunction --event events/get-course.json

echo "🧪 Testing ListCourses Lambda..."
sam local invoke ListCoursesFunction --event events/list-courses.json

echo "🧪 Testing UpdateCourse Lambda..."
sam local invoke UpdateCourseFunction --event events/update-course.json

echo "🧪 Testing DeleteCourse Lambda..."
sam local invoke DeleteCourseFunction --event events/delete-course.json

echo "✅ Local testing completed!"

# Note: The API will start and run until you press Ctrl+C
# You can then test the endpoints locally using:
# curl http://127.0.0.1:3000/courses
# curl -X POST http://127.0.0.1:3000/courses -d '{...}'
# etc. 