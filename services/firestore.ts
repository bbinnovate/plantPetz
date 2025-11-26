import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// User Profile
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  level: "beginner" | "intermediate" | "advance";
  city: string;
  avatarUrl?: string;
  phone?: string;
  createdAt: any;
}

export const createUserProfile = async (
  uid: string,
  data: Omit<UserProfile, "uid" | "createdAt">
) => {
  try {
    await setDoc(doc(db, "users", uid), {
      ...data,
      uid,
      createdAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getUserProfile = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: docSnap.data() as UserProfile, error: null };
    } else {
      return { data: null, error: "User not found" };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
) => {
  try {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, data);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Plant
export interface Plant {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  userId: string;
  createdAt: any;
}

export const createPlant = async (
  userId: string,
  data: Omit<Plant, "id" | "userId" | "createdAt">
) => {
  try {
    const docRef = await addDoc(collection(db, "plants"), {
      ...data,
      userId,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const getUserPlants = async (userId: string) => {
  try {
    const q = query(collection(db, "plants"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const plants: Plant[] = [];
    querySnapshot.forEach((doc) => {
      plants.push({ id: doc.id, ...doc.data() } as Plant);
    });
    return { data: plants, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

// Journal
export interface Journal {
  id: string;
  userId: string;
  plantId: string;
  date: any;
  summary?: string;
  messages: {
    role: "user" | "ai";
    text: string;
    imageUrl?: string;
    ts: any;
  }[];
  createdAt: any;
}

export const createJournal = async (
  userId: string,
  plantId: string,
  messages: Journal["messages"]
) => {
  try {
    const docRef = await addDoc(collection(db, "journals"), {
      userId,
      plantId,
      date: serverTimestamp(),
      messages,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const getUserJournals = async (userId: string) => {
  try {
    const q = query(collection(db, "journals"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const journals: Journal[] = [];
    querySnapshot.forEach((doc) => {
      journals.push({ id: doc.id, ...doc.data() } as Journal);
    });
    return { data: journals, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
};

