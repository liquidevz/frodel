# Vercel Deployment Guide

## Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (sign up at https://vercel.com)

## Deployment Steps

### 1. Push Code to Git Repository
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)
1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   - `VITE_API_URL`: Your backend API URL (e.g., `https://your-backend.com/api`)
   - `VITE_APP_NAME`: `Frozen Food Directory`

5. Click "Deploy"

#### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

### 3. Configure Environment Variables in Vercel
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - `VITE_API_URL` = Your backend API URL
   - `VITE_APP_NAME` = Frozen Food Directory

### 4. Verify Deployment
- Check all routes work (/, /products, /about, etc.)
- Test authentication flow
- Verify API calls to backend
- Test admin panel access

## Important Notes

### CORS Configuration
Ensure your backend allows requests from your Vercel domain:
```javascript
// Backend CORS config
cors({
  origin: ['https://your-vercel-app.vercel.app', 'https://your-custom-domain.com'],
  credentials: true
})
```

### Environment Variables
- All environment variables must be prefixed with `VITE_`
- Update `VITE_API_URL` to point to your production backend
- Redeploy after changing environment variables

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## Troubleshooting

### 404 on Page Refresh
✅ Fixed by `vercel.json` rewrites configuration

### API Calls Failing
- Check `VITE_API_URL` environment variable
- Verify backend CORS settings
- Check backend is accessible from Vercel

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

## Automatic Deployments
- Every push to `main` branch triggers production deployment
- Pull requests create preview deployments
- Configure in Project Settings → Git

## Performance Optimization
- Vercel automatically optimizes static assets
- Enable Edge Network for global CDN
- Consider using Vercel Analytics for monitoring
