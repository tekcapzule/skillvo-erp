#!/bin/bash

# Create DynamoDB table
aws dynamodb create-table \
    --table-name references \
    --attribute-definitions \
        AttributeName=PK,AttributeType=S \
        AttributeName=SK,AttributeType=S \
    --key-schema \
        AttributeName=PK,KeyType=HASH \
        AttributeName=SK,KeyType=RANGE \
    --provisioned-throughput \
        ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --endpoint-url http://localhost:8000

# Create SQS queue
aws sqs create-queue \
    --queue-name events \
    --endpoint-url http://localhost:9324 