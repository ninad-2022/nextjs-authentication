import React, { useState } from 'react'

const SignupPage = () => {
  const [user, setUser] = useState({
    email:"",
    password: "",
    username:"",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  return (
    <div>SignupPage</div>
  )
}

export default SignupPage