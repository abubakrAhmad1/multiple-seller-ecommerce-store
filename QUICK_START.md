# Quick Start Guide

## 🚀 Quick Setup (Windows)

### Option 1: Automated Setup (Recommended)
Run the setup script:
```bash
setup.bat
```

Then start the servers:
- **Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

- **Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

### Option 2: Manual Setup

**1. Create Backend .env file:**
```bash
cd backend
echo PORT=8000 > .env
echo NODE_ENV=development >> .env
echo MONGODB_URI=mongodb://localhost:27017/multiSellerApp >> .env
echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345 >> .env
```

**2. Create Frontend .env file:**
```bash
cd frontend
echo REACT_APP_API_URL=http://localhost:8000/api > .env
```

**3. Create uploads directory:**
```bash
cd backend
mkdir uploads
```

**4. Install dependencies and run:**

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

## 🚀 Quick Setup (Mac/Linux)

### Option 1: Automated Setup (Recommended)
```bash
chmod +x setup.sh
./setup.sh
```

Then start the servers:
- **Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

- **Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

### Option 2: Manual Setup

**1. Create Backend .env file:**
```bash
cd backend
cat > .env << EOF
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/multiSellerApp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
EOF
```

**2. Create Frontend .env file:**
```bash
cd frontend
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env
```

**3. Create uploads directory:**
```bash
mkdir -p backend/uploads
```

**4. Install dependencies and run:**

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

## ✅ Verify Everything Works

1. **Backend**: Open `http://localhost:8000/api/health` in browser
   - Should see: `{"status":"OK","message":"Server is running"}`

2. **Frontend**: Should automatically open at `http://localhost:3000`

3. **MongoDB**: Make sure MongoDB is running
   - Check with: `mongosh` (should connect successfully)

## 📝 Important Notes

- **MongoDB must be running** before starting the backend
- Backend runs on port **8000**
- Frontend runs on port **3000**
- You need **2 terminal windows** - one for backend, one for frontend

## 🎯 First Steps After Setup

1. **Sign up as a Seller** - Create products
2. **Sign up as a Buyer** - Browse and purchase
3. **Test the features** - Cart, checkout, reviews, etc.

For detailed documentation, see `README.md` and `SETUP.md`

