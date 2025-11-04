# ChefAI Deployment Guide

## GitHub Pages Setup

To enable GitHub Pages and make your ChefAI application accessible online, follow these steps:

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/Chinnu122/ChefAI`
2. Click on **Settings** (in the repository menu)
3. Scroll down to the **Pages** section in the left sidebar
4. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**

### Step 2: Wait for Deployment

- GitHub will automatically build and deploy your site
- This usually takes 1-2 minutes
- You'll see a green checkmark when deployment is complete

### Step 3: Access Your Live Site

Your ChefAI application will be available at:
```
https://chinnu122.github.io/ChefAI/
```

### Automatic Updates

After GitHub Pages is enabled:
- Every push to the `main` branch will automatically trigger a new deployment
- Changes typically appear live within 1-2 minutes

## Alternative Deployment Options

### Netlify

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure:
   - **Build command**: Leave empty (static site)
   - **Publish directory**: `/`
5. Click "Deploy site"

### Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect settings
5. Click "Deploy"

### Local Testing

Before deploying, test locally:

```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx http-server

# Then open: http://localhost:8000
```

## Custom Domain (Optional)

If you want to use a custom domain:

1. In GitHub Pages settings, add your custom domain
2. Update your DNS provider with:
   - **A Records** pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or **CNAME Record** pointing to `chinnu122.github.io`

## Troubleshooting

### Site Not Loading
- Wait a few minutes after enabling Pages
- Check the Actions tab for deployment status
- Ensure the branch and folder are correct

### 404 Error
- Verify `index.html` is in the root directory
- Check that GitHub Pages is enabled
- Clear browser cache and try again

### CSS/JS Not Loading
- Ensure all file paths are relative (no leading `/`)
- Check browser console for errors
- Verify file names match exactly (case-sensitive)

## Security Notes

- This is a static site with no backend
- No sensitive data is stored or transmitted
- All recipe generation happens client-side
- Safe to deploy on any static hosting service

---

**Your ChefAI application is ready to serve delicious recipes to the world! 🍳**
