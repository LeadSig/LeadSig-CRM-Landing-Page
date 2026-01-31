import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

// User profile stored in Firestore
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  createdAt: Date | null;
  founderStatus: boolean;
  founderCohort: string | null;
  depositPaid: boolean;
  stripeSessionId: string | null;
  trialStatus: 'pending' | 'active' | 'completed' | 'cancelled';
  trialStartDate: Date | null;
  launchAccessEnabled: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile from Firestore
  const fetchProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          uid,
          email: data.email,
          displayName: data.displayName,
          createdAt: data.createdAt?.toDate() || null,
          founderStatus: data.founderStatus || false,
          founderCohort: data.founderCohort || null,
          depositPaid: data.depositPaid || false,
          stripeSessionId: data.stripeSessionId || null,
          trialStatus: data.trialStatus || 'pending',
          trialStartDate: data.trialStartDate?.toDate() || null,
          launchAccessEnabled: data.launchAccessEnabled || false,
        };
      }
      return null;
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null;
    }
  };

  // Create initial user profile in Firestore
  const createProfile = async (uid: string, email: string, displayName: string): Promise<void> => {
    const docRef = doc(db, 'users', uid);
    await setDoc(docRef, {
      email,
      displayName,
      createdAt: serverTimestamp(),
      founderStatus: true,
      founderCohort: 'founders_100',
      depositPaid: false,
      stripeSessionId: null,
      trialStatus: 'pending',
      trialStartDate: null,
      launchAccessEnabled: false,
    });
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const userProfile = await fetchProfile(firebaseUser.uid);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign in with email/password
  const signIn = async (email: string, password: string): Promise<void> => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Sign up with email/password
  const signUp = async (email: string, password: string, displayName: string): Promise<void> => {
    setError(null);
    try {
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
      await createProfile(newUser.uid, email, displayName);
      const userProfile = await fetchProfile(newUser.uid);
      setProfile(userProfile);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async (): Promise<void> => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const { user: newUser } = await signInWithPopup(auth, provider);

      // Check if profile exists, create if not
      const existingProfile = await fetchProfile(newUser.uid);
      if (!existingProfile) {
        await createProfile(
          newUser.uid,
          newUser.email || '',
          newUser.displayName || ''
        );
      }

      const userProfile = await fetchProfile(newUser.uid);
      setProfile(userProfile);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    try {
      await firebaseSignOut(auth);
      setProfile(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // Refresh profile data
  const refreshProfile = async (): Promise<void> => {
    if (user) {
      const userProfile = await fetchProfile(user.uid);
      setProfile(userProfile);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
