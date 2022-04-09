import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  //   ======cleanup function state========
  const [isCancelled, setIsCancelled] = useState(false);
  //   ================================
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // log the user out

    try {
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: "LOGOUT" });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  //   ================cleanup function================
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  //   =============n3===================================

  return { logout, error, isPending };
  //   ======================n2==================
  // 这上面很多步骤和useSignup基本一致
};
