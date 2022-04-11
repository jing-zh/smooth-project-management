import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  //   ======cleanup function state========
  const [isCancelled, setIsCancelled] = useState(false);
  //   ================================
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // log the user out

    try {
      //update online state
      const { uid } = user;
      await projectFirestore.collection("users").doc(uid).update({
        online: false,
      });

      //上面这一步一定要在下一步之前！！！

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
