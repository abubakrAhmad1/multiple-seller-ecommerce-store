import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPoCfKXIiNQKAAUiiagwfC491dbJoNZtM",
  authDomain: "multisellerweb.firebaseapp.com",
  projectId: "multisellerweb",
  storageBucket: "multisellerweb.firebasestorage.app",
  messagingSenderId: "548389452568",
  appId: "1:548389452568:web:bd5a361ca10dcd3da47c6d",
  measurementId: "G-HCST4Z0T3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to sign in with Google
const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      return result.user;  // Return user data
    } catch (error) {
      console.error("Error during sign-in:", error);
      return null;
    }
  };
  
// Function to log out
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export { auth, provider, signInWithGoogle, logout };
