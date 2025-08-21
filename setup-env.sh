#!/bin/bash

echo "🔧 HealthTracker Environment Setup Script"
echo "========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "server.js" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📁 Setting up environment files..."

# Backend environment
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file for backend..."
    cp env.example .env
    echo "✅ Backend .env file created"
    echo "⚠️  Please update .env with your actual MongoDB connection string"
else
    echo "ℹ️  Backend .env file already exists"
fi

# Frontend environment files
cd client

if [ ! -f ".env.development.local" ]; then
    echo "📝 Creating .env.development.local for frontend..."
    cp env.development .env.development.local
    echo "✅ Frontend development environment file created"
else
    echo "ℹ️  Frontend development environment file already exists"
fi

if [ ! -f ".env.production.local" ]; then
    echo "📝 Creating .env.production.local for frontend..."
    cp env.production .env.production.local
    echo "✅ Frontend production environment file created"
    echo "⚠️  Please update .env.production.local with your actual production values"
else
    echo "ℹ️  Frontend production environment file already exists"
fi

cd ..

echo ""
echo "📋 Environment files created successfully!"
echo ""
echo "🔧 Next steps:"
echo "1. Update .env with your MongoDB connection string"
echo "2. Update client/.env.production.local with your production API URL"
echo "3. Run 'npm run dev' to start development server"
echo "4. Check DEPLOYMENT_GUIDE.md for deployment instructions"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
