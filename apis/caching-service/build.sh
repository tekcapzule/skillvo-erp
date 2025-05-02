#!/bin/bash

# Path to maven wrapper
MVN_WRAPPER="../../../mvnw"

# Navigate to project root
cd "$(dirname "$0")" || exit 1

# Build the project
$MVN_WRAPPER clean package

exit $? 