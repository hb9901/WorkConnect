"use client";
import { useState } from "react";
import SignUp from "./_components/SignUp";
import SignIn from "./_components/SignIn";

const SIGN_IN = "SIGNIN";

const AuthPage = () => {
  const [view, setView] = useState(SIGN_IN);

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      {view === SIGN_IN ? (
        <SignIn setView={setView} />
      ) : (
        <SignUp setView={setView} />
      )}
    </main>
  );
};

export default AuthPage;
