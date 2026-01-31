import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile } from '../contexts/AuthContext';

/**
 * Hook to update the current user's Stripe session ID after payment
 */
export function useUpdateStripeSession() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStripeSession = async (uid: string, sessionId: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        stripeSessionId: sessionId,
      });
      setLoading(false);
      return true;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return false;
    }
  };

  return { updateStripeSession, loading, error };
}

/**
 * Hook for admin operations - fetching all founders and updating their status
 */
export function useAdminFounders() {
  const [founders, setFounders] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to real-time updates of all founder users
  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      where('founderStatus', '==', true),
      orderBy('createdAt', 'desc'),
      limit(100)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const foundersData: UserProfile[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            uid: doc.id,
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
        });
        setFounders(foundersData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Verify a founder's deposit
  const verifyDeposit = async (uid: string): Promise<boolean> => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        depositPaid: true,
      });
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  // Start a founder's trial
  const startTrial = async (uid: string): Promise<boolean> => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        trialStatus: 'active',
        trialStartDate: Timestamp.now(),
      });
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  // Stop a founder's trial
  const stopTrial = async (uid: string): Promise<boolean> => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        trialStatus: 'cancelled',
      });
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  // Enable launch access
  const enableLaunchAccess = async (uid: string): Promise<boolean> => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        launchAccessEnabled: true,
      });
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  return {
    founders,
    loading,
    error,
    verifyDeposit,
    startTrial,
    stopTrial,
    enableLaunchAccess,
  };
}

/**
 * Hook to check if current user is an admin
 */
export function useIsAdmin(uid: string | undefined) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    const checkAdmin = async () => {
      try {
        const adminRef = doc(db, 'admins', uid);
        const adminSnap = await getDoc(adminRef);
        setIsAdmin(adminSnap.exists());
      } catch (err) {
        setIsAdmin(false);
      }
      setLoading(false);
    };

    checkAdmin();
  }, [uid]);

  return { isAdmin, loading };
}
