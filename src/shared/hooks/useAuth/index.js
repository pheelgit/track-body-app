import { app } from "app/dataBase/firebaseAppDb";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const auth = getAuth(app);

export const useAuth = () => {
  const [user, loading, error] = useAuthState(auth);
  return { user, loading, error };
};
