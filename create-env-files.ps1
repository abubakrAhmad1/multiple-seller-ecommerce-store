# PowerShell script to create .env files

Write-Host "Creating environment files..." -ForegroundColor Green

# Create backend .env
if (-not (Test-Path "backend\.env")) {
    $backendEnv = @"
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/multiSellerApp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
"@
    $backendEnv | Out-File -FilePath "backend\.env" -Encoding utf8
    Write-Host "Created backend\.env" -ForegroundColor Green
} else {
    Write-Host "backend\.env already exists" -ForegroundColor Yellow
}

# Create frontend .env
if (-not (Test-Path "frontend\.env")) {
    "REACT_APP_API_URL=http://localhost:8000/api" | Out-File -FilePath "frontend\.env" -Encoding utf8
    Write-Host "Created frontend\.env" -ForegroundColor Green
} else {
    Write-Host "frontend\.env already exists" -ForegroundColor Yellow
}

# Create uploads directory
if (-not (Test-Path "backend\uploads")) {
    New-Item -ItemType Directory -Path "backend\uploads" | Out-Null
    Write-Host "Created backend\uploads directory" -ForegroundColor Green
} else {
    Write-Host "backend\uploads already exists" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Environment setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Install backend dependencies: cd backend; npm install"
Write-Host "2. Install frontend dependencies: cd frontend; npm install"
Write-Host "3. Start backend: cd backend; npm run dev"
Write-Host "4. Start frontend: cd frontend; npm start"
