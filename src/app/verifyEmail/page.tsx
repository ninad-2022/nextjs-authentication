"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const VerifyEmail = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const VerifyUserEmail = useCallback(async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setIsVerified(true);
      setError(false)
    } catch (error: any) {
      setError(true);
      setIsVerified(false);
      console.log("error: ", error.response.data);
    }
  }, [token]);

  useEffect(() => {
    setError(false);
    if (token.length > 0) VerifyUserEmail();
  }, [VerifyUserEmail, token.length]);

  useEffect(() => {
    setError(false);
    const urlTokenTwo = window.location.search.split("=")[1];
    setToken(urlTokenTwo || "");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No token"}
      </h2>
      {isVerified && (
        <div>
          <h2>Verfied</h2>
          <Link href="/login">login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
