import { auth } from './firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';

export default function AuthService() {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchUserHistory = async (email) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/user-history?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.history) setHistory(data.history);
    } catch (e) {
      setHistory([]);
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      if (!firebaseUser.emailVerified) {
        return { success: false, error: 'Email not verified. Please check your inbox.' };
      }
      setUser({ username: firebaseUser.displayName || 'User', email, emailVerified: firebaseUser.emailVerified });
      await fetchUserHistory(email);
      return { success: true, user: { username: firebaseUser.displayName || 'User', email, emailVerified: firebaseUser.emailVerified } };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      // Send email verification
      await sendEmailVerification(firebaseUser);
      setUser({ username: name, email, emailVerified: firebaseUser.emailVerified });
      await fetchUserHistory(email);
      return { success: true, user: { username: name, email, emailVerified: firebaseUser.emailVerified }, message: 'Verification email sent. Please check your inbox.' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const logout = () => {
    setUser(null);
    setHistory([]);
  };

  // Google login/signup
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      setUser({
        username: firebaseUser.displayName || 'User',
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
        photoURL: firebaseUser.photoURL
      });
      await fetchUserHistory(firebaseUser.email);
      return { success: true, user: { username: firebaseUser.displayName || 'User', email: firebaseUser.email, emailVerified: firebaseUser.emailVerified, photoURL: firebaseUser.photoURL } };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      // Check if user exists before sending reset email
      const fetchSignInMethods = await auth.fetchSignInMethodsForEmail(email);
      if (fetchSignInMethods.length === 0) {
        return { success: false, error: 'No account found with this email. Please sign up first.' };
      }
      await sendPasswordResetEmail(auth, email);
      return { success: true, message: 'Password reset email sent. Please check your inbox.' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  return { user, login, signup, logout, history, loginWithGoogle, forgotPassword };
}
