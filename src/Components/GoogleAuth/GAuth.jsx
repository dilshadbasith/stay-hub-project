import React, { useContext } from "react";
import "../GoogleAuth/GAuth.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../Firebase";
import Axios from "../../lib/Axios";
import { signinSuccess } from "../../Redux/Reducers/UserReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { myContext } from "../Context";

function GAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { handleLoginOpen } = useContext(myContext);


  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await Axios.post("/api/auth/google", {
        headers: {
          "Content-Type": "application.json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }),
      });

    //   const data = await res.json();
    //   dispatch(signinSuccess(data));
    //   navigate('/')
    //   handleLoginOpen() 

    if (res.status === 200) {
        const data = res.data; // Assuming your response data is directly in the response body
        dispatch(signinSuccess(data));
        navigate('/');
        handleLoginOpen();
      } else {
        console.log("Server returned an error:", res.statusText);
      }
    } catch (error) {
      console.log("could not signin with google", error);
    }
  };
  return (
    <div>
      <button onClick={handleGoogleClick} type="button" className="auth-btn">
        Continue with Google
      </button>
    </div>
  );
}

export default GAuth;
