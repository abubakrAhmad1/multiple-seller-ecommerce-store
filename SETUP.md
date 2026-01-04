# Setup Instructions

Follow these steps to set up and run the Multi-Seller E-Commerce Platform.

## Prerequisites

Before starting, make sure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)

## Step-by-Step Setup

### 1. Install MongoDB (if not already installed)

**Option A: Local MongoDB**
- Download and install MongoDB Community Edition
- Start MongoDB service:
  - Windows: MongoDB should start automatically as a service
  - Mac/Linux: `sudo systemctl start mongod` or `brew services start mongodb-community`

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Update `MONGODB_URI` in `backend/.env` with your Atlas connection string

### 2. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

The `.env` file is already created. If you need to modify it, edit `backend/.env`:
- Change `JWT_SECRET` to a secure random string for production
- Update `MONGODB_URI` if using MongoDB Atlas

Create the uploads directory (if it doesn't exist):

```bash
# Windows
mkdir uploads

# Mac/Linux
mkdir -p uploads
```

Start the backend server:

```bash
# Development mode (with auto-restart)
npm run dev

# OR Production mode
npm start
```

The backend will run on `http://localhost:8000`

### 3. Frontend Setup

Open a **NEW** terminal window and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

The `.env` file is already created. The frontend will connect to `http://localhost:8000/api`

Start the frontend development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## Quick Start Commands

### Windows (PowerShell)

**Terminal 1 - Backend:**
```powershell
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm install
npm start
```

### Mac/Linux

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

## Verify Installation

1. **Backend**: Check `http://localhost:8000/api/health` - should return `{"status":"OK","message":"Server is running"}`

2. **Frontend**: Should automatically open at `http://localhost:3000`

3. **Database**: Make sure MongoDB is running and accessible

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongosh` should connect
- Check `MONGODB_URI` in `backend/.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Backend (8000): Change `PORT` in `backend/.env`
- Frontend (3000): React will prompt to use a different port

### Module Not Found Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Image Upload Issues
- Ensure `backend/uploads` directory exists
- Check file permissions on the uploads directory

## First Time Usage

1. **Create a Seller Account:**
   - Go to Sign Up
   - Select "Seller" as type
   - Fill in details (Shop Name is optional)
   - You'll be redirected to Seller Dashboard

2. **Create a Buyer Account:**
   - Go to Sign Up
   - Select "Buyer" as type
   - Fill in details
   - You'll be redirected to Products page

3. **As a Seller:**
   - Add products with images
   - Manage your products
   - View and update orders

4. **As a Buyer:**
   - Browse and search products
   - Add items to cart
   - Checkout and place orders
   - Leave reviews

## Production Deployment

For production deployment:

1. **Backend:**
   - Set `NODE_ENV=production` in `.env`
   - Use a strong `JWT_SECRET`
   - Use MongoDB Atlas or a managed MongoDB service
   - Use cloud storage (AWS S3, Cloudinary) for images
   - Set up proper CORS settings

2. **Frontend:**
   - Build: `npm run build`
   - Deploy the `build` folder to a hosting service (Netlify, Vercel, etc.)
   - Update `REACT_APP_API_URL` to your production backend URL

## Need Help?

- Check the main README.md for detailed documentation
- Ensure all dependencies are installed
- Verify MongoDB connection
- Check console for error messages

