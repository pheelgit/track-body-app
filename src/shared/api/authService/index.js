import { auth } from "app/dataBase/firebaseAppDb";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const authService = {
  isAuth() {
    const user = auth.currentUser;
    return user ? user.uid : null;
  },

  logIn: (payload) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        const user = userCredential;

        console.log(user);
        console.log("logged User");
        // ...
      })
      .catch((error) => {
        console.log("logged error !!");
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errCode:", errorCode);
        console.log("errMess:", errorMessage);
      });
  },
  logOut: () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("signOut success");
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
