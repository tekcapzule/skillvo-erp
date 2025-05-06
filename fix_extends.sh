#!/bin/bash

# Find all scss files in the styles directory
find styles -type f -name "*.scss" | while read file; do
  # Replace all @extend statements that don't already have !optional with ones that do
  sed -i '' 's/@extend \([^;!]*\);/@extend \1 !optional;/g' "$file"
done 