# Vercel Deployment Checklist

## Pre-Deployment
- [ ] Code pushed to Git repository (GitHub/GitLab/Bitbucket)
- [ ] Backend API is deployed and accessible
- [ ] Backend CORS configured to allow Vercel domain
- [ ] All dependencies listed in package.json
- [ ] .env.example updated with all required variables

## Vercel Configuration
- [ ] Project imported in Vercel
- [ ] Framework preset: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Install command: `npm install`

## Environment Variables
- [ ] `VITE_API_URL` set to production backend URL
- [ ] `VITE_APP_NAME` set to "Frozen Food Directory"

## Post-Deployment Testing
- [ ] Home page loads correctly
- [ ] Products page displays products
- [ ] Product detail pages work
- [ ] Cart functionality works
- [ ] Login/authentication works
- [ ] Admin panel accessible (for admin users)
- [ ] All routes work (no 404 on refresh)
- [ ] API calls successful
- [ ] Images load properly
- [ ] Mobile responsive design works

## Optional
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] Automatic deployments configured

## Files Created for Vercel
✅ vercel.json - Handles client-side routing
✅ .vercelignore - Excludes unnecessary files
✅ public/_redirects - Fallback routing
✅ VERCEL_DEPLOYMENT.md - Detailed guide
