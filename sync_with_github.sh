#!/bin/bash

# Change to your repository directory
cd /home/sabare/Github/blog

# Check current status
git status

echo "=== Choose an action: ==="
echo "1. Pull changes from GitHub (if GitHub repo has content you need)"
echo "2. Push your local changes to GitHub"
echo "3. Both pull and then push"
read -p "Enter choice (1/2/3): " choice

if [[ $choice == "1" || $choice == "3" ]]; then
    echo "Pulling changes from GitHub..."
    git pull origin main --allow-unrelated-histories
    
    # Handle merge conflicts if any
    if [ $? -ne 0 ]; then
        echo "There might be merge conflicts. Resolve them and commit before proceeding."
        exit 1
    fi
fi

if [[ $choice == "2" || $choice == "3" ]]; then
    # Stage all your changes
    git add .
    
    # Commit your changes
    echo "Enter commit message:"
    read commit_message
    git commit -m "$commit_message"
    
    # Push your changes to GitHub
    git push -u origin main
    
    echo "Changes have been pushed to GitHub."
fi
