@echo off
echo ========================================
echo Multi-Seller E-Commerce Setup Script
echo ========================================
echo.

echo Step 1: Creating backend .env file...
if not exist backend\.env (
    echo PORT=8000 > backend\.env
    echo NODE_ENV=development >> backend\.env
    echo MONGODB_URI=mongodb://localhost:27017/multiSellerApp >> backend\.env
    echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345 >> backend\.env
    echo Backend .env file created!
) else (
    echo Backend .env file already exists.
)
echo.

echo Step 2: Creating frontend .env file...
if not exist frontend\.env (
    echo REACT_APP_API_URL=http://localhost:8000/api > frontend\.env
    echo Frontend .env file created!
) else (
    echo Frontend .env file already exists.
)
echo.

echo Step 3: Creating uploads directory...
if not exist backend\uploads (
    mkdir backend\uploads
    echo Uploads directory created!
) else (
    echo Uploads directory already exists.
)
echo.

echo Step 4: Installing backend dependencies...
cd backend
call npm install
cd ..
echo.

echo Step 5: Installing frontend dependencies...
cd frontend
call npm install
cd ..
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Make sure MongoDB is running
echo 2. Open Terminal 1 and run: cd backend ^&^& npm run dev
echo 3. Open Terminal 2 and run: cd frontend ^&^& npm start
echo.
pause

