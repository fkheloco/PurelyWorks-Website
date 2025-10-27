#!/bin/bash

# Purely Works - Vercel Deployment Script
echo "🚀 Deploying Purely Works to Vercel..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project directory"
    echo "Please run: cd /home/claude/purelyworks"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if we're logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    echo "This will open your browser for authentication."
    echo ""
    vercel login
fi

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build succeeded
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    
    # Deploy to production
    echo "🚀 Deploying to production..."
    vercel --prod
    
    echo ""
    echo "✨ Deployment complete!"
    echo ""
    echo "Next steps:"
    echo "1. Configure custom domain (purelyworks.com)"
    echo "2. Add Google Analytics"
    echo "3. Update email addresses"
    echo "4. Test on mobile devices"
else
    echo "❌ Build failed. Please check errors above."
    exit 1
fi
