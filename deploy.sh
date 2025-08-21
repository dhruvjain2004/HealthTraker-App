#!/bin/bash

echo "🚀 HealthTracker App Deployment Script"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "server.js" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📦 Installing backend dependencies..."
npm install

echo "📦 Installing frontend dependencies..."
cd client && npm install && cd ..

echo "🏗️ Building frontend for production..."
cd client && npm run build && cd ..

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Deploy backend to Render (see DEPLOYMENT_GUIDE.md)"
echo "3. Deploy frontend to Vercel (see DEPLOYMENT_GUIDE.md)"
echo "4. Set environment variables in both platforms"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
