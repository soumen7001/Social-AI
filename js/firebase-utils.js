// Firebase Utility Functions
import { db, auth } from './firebase-config.js';
import { collection, addDoc, doc, getDoc, setDoc, getDocs, query, where, deleteDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// Firestore Helpers
export const dbAdd = async (collectionName, data) => {
  try {
    await addDoc(collection(db, collectionName), {
      ...data,
      serverTimestamp: new Date().toISOString()
    });
    return true;
  } catch (e) {
    console.error(`dbAdd Error in ${collectionName}:`, e);
    throw new Error(formatFirebaseError(e));
  }
};

export const dbSet = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
    return true;
  } catch (e) {
    console.error(`dbSet Error in ${collectionName}:`, e);
    throw new Error(formatFirebaseError(e));
  }
};

export const dbGet = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (e) {
    console.error(`dbGet Error in ${collectionName}:`, e);
    throw new Error(formatFirebaseError(e));
  }
};

export const dbDelete = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    console.error(`dbDelete Error in ${collectionName}:`, e);
    throw new Error(formatFirebaseError(e));
  }
};

export const dbQuery = async (collectionName, field, value) => {
  try {
    const q = query(collection(db, collectionName), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error(`dbQuery Error in ${collectionName}:`, e);
    throw new Error(formatFirebaseError(e));
  }
};

// Auth Helpers
export const sendResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (err) {
    throw new Error(formatFirebaseError(err));
  }
};

export const signUpUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential.user;
  } catch (err) {
    throw new Error(formatFirebaseError(err));
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (err) {
    throw new Error(formatFirebaseError(err));
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    throw new Error(formatFirebaseError(err));
  }
};

export const signOutUser = () => signOut(auth);
export const onAuthUpdate = (callback) => onAuthStateChanged(auth, callback);

// Private Helper: User-facing Error Messages
function formatFirebaseError(error) {
    const code = error.code;
    switch (code) {
        case 'auth/user-not-found': return "No account found with this email.";
        case 'auth/wrong-password': return "Incorrect password. Please try again.";
        case 'auth/email-already-in-use': return "This email is already registered.";
        case 'auth/weak-password': return "Password should be at least 6 characters.";
        case 'auth/invalid-email': return "Please enter a valid email address.";
        case 'permission-denied': return "You don't have permission to perform this action.";
        default: return error.message || "An unexpected error occurred. Please try again.";
    }
}
