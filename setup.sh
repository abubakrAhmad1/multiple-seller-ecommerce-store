#!/bin/bash

echo "========================================"
echo "Multi-Seller E-Commerce Setup Script"
echo "========================================"
echo ""

echo "Step 1: Creating backend .env file..."
if [ ! -f backend/.env ]; then
    cat > backend/.env << EOF
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/multiSellerApp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
EOF
    echo "Backend .env file created!"
else
    echo "Backend .env file already exists."
fi
echo ""

echo "Step 2: Creating frontend .env file..."
if [ ! -f frontend/.env ]; then
    echo "REACT_APP_API_URL=http://localhost:8000/api" > frontend/.env
    echo "Frontend .env file created!"
else
    echo "Frontend .env file already exists."
fi
echo ""

echo "Step 3: Creating uploads directory..."
mkdir -p backend/uploads
echo "Uploads directory created!"
echo ""

echo "Step 4: Installing backend dependencies..."
cd backend
npm install
cd ..
echo ""

echo "Step 5: Installing frontend dependencies..."
cd frontend
npm install
cd ..
echo ""

echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Make sure MongoDB is running"
echo "2. Open Terminal 1 and run: cd backend && npm run dev"
echo "3. Open Terminal 2 and run: cd frontend && npm start"
echo ""

