#!/bin/bash

# Function to navigate, install dependencies and run dev server
setup_project() {
    local dir=$1

    if [ -d "$dir" ]; then
        echo "Setting up $dir..."
        cd $dir
        npm install
        npm run dev &
        cd ..
    else
        echo "Directory $dir not found."
    fi
}

# Navigate to client and server directories, install dependencies, and run dev server
setup_project "client"
setup_project "server"

echo "Setup completed for both client and server."
