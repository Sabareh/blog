#!/bin/bash

# Change to your repository directory
cd /home/sabare/Github/blog

# Add the remote GitHub repository
# Replace YOUR_USERNAME and YOUR_REPOSITORY with your actual GitHub username and repository name
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# Verify the remote was added
git remote -v

echo "Remote 'origin' has been added."
echo "Next steps:"
echo "1. If the remote repository has content that you need locally, run: git pull origin main --allow-unrelated-histories"
echo "2. To push your local content, run: git push -u origin main"
