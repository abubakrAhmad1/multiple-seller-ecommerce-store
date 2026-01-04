# MongoDB Setup & Troubleshooting

## ⚠️ What Happens If MongoDB Is Not Running?

**Yes, the project will give errors if MongoDB is not running**, but I've improved the error handling so it's more informative:

### Before (Old Behavior):
- Server would crash immediately
- Error message was not very helpful
- Hard to diagnose the issue

### Now (Improved Behavior):
- Server will start and show a **clear error message**
- You'll see helpful instructions on what to do
- Server continues running (but database operations will fail)
- API endpoints will return proper error messages

## 🔍 How to Check If MongoDB Is Running

### Windows:
```powershell
# Check if MongoDB service is running
Get-Service MongoDB

# Or try to connect
mongosh
```

### Mac/Linux:
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Or try to connect
mongosh
```

## 🚀 How to Start MongoDB

### Windows:

**Option 1: Start MongoDB Service**
```powershell
# Start MongoDB service
Start-Service MongoDB

# Or use Services GUI
# Press Win+R, type "services.msc", find MongoDB, and click Start
```

**Option 2: Manual Start**
```powershell
# Navigate to MongoDB bin directory (usually)
cd "C:\Program Files\MongoDB\Server\7.0\bin"
.\mongod.exe
```

### Mac (Homebrew):
```bash
brew services start mongodb-community
```

### Linux:
```bash
sudo systemctl start mongod
```

## 📝 Error Messages You'll See

### When Starting Backend Without MongoDB:

```
❌ MongoDB Connection Error: connect ECONNREFUSED 127.0.0.1:27017

⚠️  Please make sure MongoDB is running!
   - If using local MongoDB: Start MongoDB service
   - If using MongoDB Atlas: Check your connection string
   - Connection string: mongodb://localhost:27017/multiSellerApp

💡 The server will continue to run but database operations will fail.

Server is listening on port 8000
```

### When Making API Calls Without MongoDB:

The API will return:
```json
{
  "message": "Database connection unavailable. Please ensure MongoDB is running.",
  "error": "MongoDB not connected"
}
```

## ✅ Verify MongoDB Connection

### Test 1: Health Check Endpoint
```bash
# This should work even without MongoDB
curl http://localhost:8000/api/health
# Returns: {"status":"OK","message":"Server is running"}
```

### Test 2: Try a Database Operation
```bash
# This will fail if MongoDB is not running
curl http://localhost:8000/api/products
# Returns: Error about database connection
```

### Test 3: Direct MongoDB Connection
```bash
mongosh
# If this connects, MongoDB is running
```

## 🔧 Using MongoDB Atlas (Cloud) Instead

If you prefer cloud MongoDB:

1. **Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**

2. **Create a free cluster**

3. **Get your connection string:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

4. **Update `backend/.env`:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/multiSellerApp?retryWrites=true&w=majority
   ```

5. **Whitelist your IP:**
   - In Atlas, go to Network Access
   - Add your current IP address (or 0.0.0.0/0 for development)

## 🐛 Common Issues & Solutions

### Issue 1: "ECONNREFUSED" Error
**Problem:** MongoDB service is not running
**Solution:** Start MongoDB service (see instructions above)

### Issue 2: "Authentication failed"
**Problem:** Wrong credentials in connection string
**Solution:** Check your MongoDB username/password in `.env`

### Issue 3: "Timeout" Error
**Problem:** MongoDB is taking too long to respond
**Solution:** 
- Check if MongoDB is actually running
- Check firewall settings
- Verify connection string

### Issue 4: "Cannot find module 'mongodb'"
**Problem:** Dependencies not installed
**Solution:** Run `npm install` in backend directory

## 📋 Quick Checklist

Before running the project, make sure:

- [ ] MongoDB is installed
- [ ] MongoDB service is running
- [ ] Connection string in `backend/.env` is correct
- [ ] If using Atlas, IP is whitelisted
- [ ] Can connect with `mongosh` (for local) or Atlas dashboard (for cloud)

## 💡 Pro Tips

1. **For Development:** Use local MongoDB - it's faster and free
2. **For Production:** Use MongoDB Atlas - it's more reliable
3. **Check Logs:** Always check the console output for detailed error messages
4. **Test Connection:** Use `mongosh` to verify MongoDB is accessible before starting the server

## 🆘 Still Having Issues?

1. Check MongoDB logs:
   - Windows: `C:\Program Files\MongoDB\Server\7.0\log\mongod.log`
   - Mac/Linux: `/var/log/mongodb/mongod.log`

2. Verify MongoDB is listening on port 27017:
   ```bash
   # Windows
   netstat -an | findstr 27017
   
   # Mac/Linux
   lsof -i :27017
   ```

3. Try restarting MongoDB service

4. Check if another application is using port 27017

