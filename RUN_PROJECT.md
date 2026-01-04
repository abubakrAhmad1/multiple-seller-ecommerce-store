# 🚀 How to Run the Project

## Prerequisites
- ✅ Node.js installed (v14+)
- ✅ MongoDB running (local or Atlas)

## Quick Start Commands

### Windows (PowerShell/CMD)

**Step 1: Run Setup Script (Optional but Recommended)**
```powershell
.\setup.bat
```

**OR Manual Setup:**

**Step 1: Create Environment Files**

Create `backend\.env`:
```powershell
cd backend
@"
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/multiSellerApp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
"@ | Out-File -FilePath .env -Encoding utf8
cd ..
```

Create `frontend\.env`:
```powershell
cd frontend
"REACT_APP_API_URL=http://localhost:8000/api" | Out-File -FilePath .env -Encoding utf8
cd ..
```

**Step 2: Install Dependencies**

Backend:
```powershell
cd backend
npm install
```

Frontend:
```powershell
cd frontend
npm install
```

**Step 3: Start the Servers**

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm start
```

---

### Mac/Linux

**Step 1: Run Setup Script (Optional but Recommended)**
```bash
chmod +x setup.sh
./setup.sh
```

**OR Manual Setup:**

**Step 1: Create Environment Files**

Create `backend/.env`:
```bash
cd backend
cat > .env << 'EOF'
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/multiSellerApp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
EOF
cd ..
```

Create `frontend/.env`:
```bash
cd frontend
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env
cd ..
```

**Step 2: Create Uploads Directory**
```bash
mkdir -p backend/uploads
```

**Step 3: Install Dependencies**

Backend:
```bash
cd backend
npm install
```

Frontend:
```bash
cd frontend
npm install
```

**Step 4: Start the Servers**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

---

## ✅ Verify It's Working

1. **Backend Health Check:**
   - Open browser: `http://localhost:8000/api/health`
   - Should see: `{"status":"OK","message":"Server is running"}`

2. **Frontend:**
   - Should automatically open at `http://localhost:3000`
   - If not, manually open: `http://localhost:3000`

3. **MongoDB:**
   - Make sure MongoDB is running
   - Test connection: `mongosh` (should connect)

## 📋 All-in-One Command (Windows PowerShell)

Run this single command to set everything up:

```powershell
# Create backend .env
cd backend; if (-not (Test-Path .env)) { @"
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/multiSellerApp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
"@ | Out-File -FilePath .env -Encoding utf8 }; if (-not (Test-Path uploads)) { New-Item -ItemType Directory -Path uploads }; npm install; cd ..

# Create frontend .env
cd frontend; if (-not (Test-Path .env)) { "REACT_APP_API_URL=http://localhost:8000/api" | Out-File -FilePath .env -Encoding utf8 }; npm install; cd ..

Write-Host "Setup complete! Now run:" -ForegroundColor Green
Write-Host "Terminal 1: cd backend && npm run dev" -ForegroundColor Yellow
Write-Host "Terminal 2: cd frontend && npm start" -ForegroundColor Yellow
```

## 📋 All-in-One Command (Mac/Linux)

```bash
# Create backend .env
cd backend && \
[ ! -f .env ] && cat > .env << 'EOF'
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/multiSellerApp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
EOF
mkdir -p uploads && npm install && cd ..

# Create frontend .env
cd frontend && \
[ ! -f .env ] && echo "REACT_APP_API_URL=http://localhost:8000/api" > .env && \
npm install && cd ..

echo "Setup complete! Now run:"
echo "Terminal 1: cd backend && npm run dev"
echo "Terminal 2: cd frontend && npm start"
```

## 🎯 What to Do Next

1. **Sign Up as Seller:**
   - Go to Sign Up page
   - Select "Seller"
   - Add your shop name
   - Start adding products!

2. **Sign Up as Buyer:**
   - Go to Sign Up page
   - Select "Buyer"
   - Browse products and shop!

## ⚠️ Troubleshooting

**MongoDB not connecting?**
- Make sure MongoDB service is running
- Check `MONGODB_URI` in `backend/.env`
- For MongoDB Atlas, use your connection string

**Port already in use?**
- Backend (8000): Change `PORT` in `backend/.env`
- Frontend (3000): React will ask to use another port

**Module errors?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Images not uploading?**
- Make sure `backend/uploads` folder exists
- Check folder permissions

## 📚 More Help

- See `README.md` for full documentation
- See `SETUP.md` for detailed setup instructions
- See `QUICK_START.md` for quick reference

