import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const syncClerkUserToFirestore = async (
  clerkUserId: string,
  email: string | undefined,
  fullName: string | null | undefined,
  imageUrl: string | undefined
) => {
  try {
    const userRef = doc(db, "users", clerkUserId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // New user - create document
      await setDoc(userRef, {
        email: email || null,
        name: fullName || null,
        avatarUrl: imageUrl || null,
        level: 1, // Default level
        city: null,
        profileComplete: false,
        hasEnteredCode: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return {
        isNewUser: true,
        profileComplete: false,
        hasEnteredCode: false,
      };
    } else {
      // Existing user - return their status
      const userData = userSnap.data();
      return {
        isNewUser: false,
        profileComplete: userData.profileComplete || false,
        hasEnteredCode: userData.hasEnteredCode || false,
      };
    }
  } catch (error) {
    console.error("Error syncing Clerk user to Firestore:", error);
    throw error;
  }
};

export const markCodeEntered = async (clerkUserId: string) => {
  try {
    const userRef = doc(db, "users", clerkUserId);
    await setDoc(
      userRef,
      {
        hasEnteredCode: true,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error marking code as entered:", error);
    throw error;
  }
};

export const completeUserProfile = async (
  clerkUserId: string,
  profileData: {
    name: string;
    city: string;
    level: number;
    avatarUrl?: string;
  }
) => {
  try {
    const userRef = doc(db, "users", clerkUserId);
    await setDoc(
      userRef,
      {
        ...profileData,
        profileComplete: true,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error completing user profile:", error);
    throw error;
  }
};

export const getUserProfileStatus = async (clerkUserId: string) => {
  try {
    const userRef = doc(db, "users", clerkUserId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return {
        exists: false,
        profileComplete: false,
        hasEnteredCode: false,
      };
    }

    const userData = userSnap.data();
    return {
      exists: true,
      profileComplete: userData.profileComplete || false,
      hasEnteredCode: userData.hasEnteredCode || false,
      ...userData,
    };
  } catch (error) {
    console.error("Error getting user profile status:", error);
    throw error;
  }
};
