#!/bin/bash
# Quick Vercel Deployment Script
# Run this after installing Vercel CLI: npm i -g vercel

echo "🚀 Starting Vercel Deployment..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Login to Vercel (if not already logged in)
echo "📝 Logging in to Vercel..."
vercel login

# Deploy to production
echo "🔨 Building and deploying to production..."
vercel --prod

echo "✅ Deployment complete!"
echo "📋 Don't forget to set environment variables in Vercel dashboard:"
echo "   - VITE_API_URL"
echo "   - VITE_APP_NAME"
