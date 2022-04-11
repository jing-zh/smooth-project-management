import { useEffect, useState } from "react";
import {
  projectAuth,
  projectStorage,
  projectFirestore,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  // ====cleanup=====
  const [isCancelled, setIsCancelled] = useState(false);
  // =========
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);
    // in1
    // 思考一下这里怎么解释async, await, try的用法

    try {
      // signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // upload user thumbnail

      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      const imgUrl = await img.ref.getDownloadURL();

      //   add display name to user

      await res.user.updateProfile({ displayName, photoURL: imgUrl });

      // create a user document

      await projectFirestore.collection("users").doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl,
      });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      // =========n1====================
      // 这里结合AuthContext.js看

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

    // in3
    // 从try这里一大串逻辑怎么解释
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { signup, error, isPending };
};
