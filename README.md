# DrobeAI Admin Frontend

A modern admin dashboard for DrobeAI built with Next.js, React, and Tailwind CSS.

## Features

- 🎨 Modern, clean UI design
- 📱 Responsive layout
- 🎯 Multiple admin pages:
  - Login
  - Dashboard with metrics and charts
  - Users Management
  - Groups Management
  - Badges Management
  - Feed (placeholder)
  - Settings (placeholder)
- 🎨 Purple/blue color scheme matching the design
- ⚡ Fast and optimized with Next.js 14

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

This Next.js application can be easily deployed to Vercel. Here are the steps:

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```
Follow the prompts. For production deployment, run:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard (Git Integration)

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to [vercel.com](https://vercel.com)** and sign in

3. **Click "Add New Project"**

4. **Import your Git repository**

5. **Configure the project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install` (auto-detected)

6. **Add Environment Variables** (if needed):
   - Go to Project Settings → Environment Variables
   - Add any required environment variables

7. **Click "Deploy"**

Vercel will automatically:
- Detect Next.js framework
- Run `npm install` and `npm run build`
- Deploy your application
- Provide you with a production URL

### Environment Variables

If your application uses environment variables, add them in:
- **Vercel Dashboard**: Project Settings → Environment Variables
- **Vercel CLI**: Use `vercel env add <variable-name>`

### Automatic Deployments

Once connected to Git, Vercel will automatically:
- Deploy every push to the main branch (production)
- Create preview deployments for pull requests

## Project Structure

```
├── app/
│   ├── dashboard/      # Dashboard page
│   ├── users/          # Users management page
│   ├── groups/         # Groups management page
│   ├── badges/         # Badges management page
│   ├── feed/           # Feed page (placeholder)
│   ├── settings/       # Settings page (placeholder)
│   ├── login/          # Login page
│   ├── layout.tsx      # Root layout
│   ├── globals.css     # Global styles
│   └── page.tsx        # Home page (redirects to login)
├── components/
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── Header.tsx      # Top header bar
│   └── Layout.tsx      # Main layout wrapper
└── ...
```

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Notes

- This is a static frontend with no backend integration
- All data is mock/static data for demonstration purposes
- The login page redirects to dashboard on submit (no actual authentication)

