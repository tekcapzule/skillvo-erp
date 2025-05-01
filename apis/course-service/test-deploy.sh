#!/bin/bash

# Exit on error
set -e

# Function to validate and deploy to an environment
deploy_to_env() {
    local env=$1
    echo "Deploying to $env environment..."
    
    # Validate template
    echo "Validating template..."
    sam validate
    
    # Build the application
    echo "Building application..."
    mvn clean install
    
    # Deploy to specified environment
    echo "Deploying to $env..."
    sam deploy --config-env $env
    
    echo "Deployment to $env completed successfully!"
}

# Test deployment to dev environment
deploy_to_env "dev"

# Test deployment to uat environment
deploy_to_env "uat"

# Test deployment to prod environment
deploy_to_env "prod"

echo "All deployments completed successfully!" 