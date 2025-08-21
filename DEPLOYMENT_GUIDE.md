# HealthTracker App Deployment Guide

This guide will help you deploy your HealthTracker app with the backend on Render and frontend on Vercel.

## Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
4. **MongoDB Atlas Account**: For your database (free tier available)

## Step 1: Backend Deployment on Render

### 1.1 Prepare MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/health-tracker`)

### 1.2 Deploy to Render
1. **Connect GitHub Repository**:
   - Go to [render.com](https://render.com) and sign in
   - Click "New +" and select "Web Service"
   - Connect your GitHub account and select your repository

2. **Configure the Service**:
   - **Name**: `health-tracker-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

3. **Environment Variables**:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: `10000` (Render will override this)

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for the build to complete
   - Note your service URL (e.g., `https://health-tracker-backend.onrender.com`)

## Step 2: Frontend Deployment on Vercel

### 2.1 Update API Configuration
1. In your `vercel.json`, replace `your-render-backend-url.onrender.com` with your actual Render backend URL
2. Remove the `.onrender.com` part from the URL

### 2.2 Deploy to Vercel
1. **Connect GitHub Repository**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your GitHub repository

2. **Configure the Project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

3. **Environment Variables**:
   - `REACT_APP_API_URL`: Your Render backend URL (e.g., `https://health-tracker-backend.onrender.com`)
   - `REACT_APP_APP_NAME`: Your app name (e.g., `Health Tracker`)
   - `REACT_APP_APP_VERSION`: App version (e.g., `1.0.0`)
   - `REACT_APP_ENABLE_ANALYTICS`: Enable analytics (e.g., `true`)
   - `REACT_APP_ENABLE_DEBUG_MODE`: Enable debug mode (e.g., `false`)

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be available at a Vercel URL

## Step 3: Frontend Environment Configuration

The frontend has been updated to use environment variables for configuration. You have several options:

### Option 1: Use Vercel Environment Variables (Recommended)
1. Set all environment variables in Vercel dashboard
2. The app will automatically use the production configuration

### Option 2: Use Environment Files
1. Copy `client/env.production` to `client/.env.production.local`
2. Update the values with your actual production settings
3. Push the changes to GitHub

### Environment Variables to Set:
- `REACT_APP_API_URL`: Your Render backend URL
- `REACT_APP_APP_NAME`: Your app name
- `REACT_APP_APP_VERSION`: App version
- `REACT_APP_ENABLE_ANALYTICS`: Enable analytics (true/false)
- `REACT_APP_ENABLE_DEBUG_MODE`: Enable debug mode (true/false)

**Note**: In production, set `REACT_APP_ENABLE_DEBUG_MODE=false` for security.

## Step 4: Test Your Deployment

1. **Test Backend**:
   - Visit `https://your-backend-url.onrender.com/api/health`
   - Should return: `{"message":"Health Tracker API is running"}`

2. **Test Frontend**:
   - Visit your Vercel URL
   - Try adding health data
   - Check if it connects to your backend

## Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - The backend is configured with `cors()` middleware
   - If you still get CORS errors, check your Render service logs

2. **MongoDB Connection Issues**:
   - Verify your MongoDB Atlas connection string
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure your database user has the correct permissions

3. **Build Failures**:
   - Check the build logs in Render/Vercel
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

### Environment Variables Reference:

**Backend (Render)**:
- `NODE_ENV`: `production`
- `MONGODB_URI`: Your MongoDB connection string
- `PORT`: `10000` (Render sets this automatically)

**Frontend (Vercel)**:
- `REACT_APP_API_URL`: Your Render backend URL
- `REACT_APP_APP_NAME`: Your app name
- `REACT_APP_APP_VERSION`: App version
- `REACT_APP_ENABLE_ANALYTICS`: Enable analytics (true/false)
- `REACT_APP_ENABLE_DEBUG_MODE`: Enable debug mode (true/false)

## Maintenance

1. **Automatic Deployments**: Both Render and Vercel will automatically deploy when you push to your main branch
2. **Environment Variables**: Update them in the respective dashboards if needed
3. **Monitoring**: Check Render and Vercel dashboards for any errors or performance issues

## Cost

- **Render**: Free tier available (with limitations)
- **Vercel**: Free tier available (with limitations)
- **MongoDB Atlas**: Free tier available (512MB storage)

## Support

- Render Documentation: [docs.render.com](https://docs.render.com)
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- MongoDB Atlas Documentation: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
