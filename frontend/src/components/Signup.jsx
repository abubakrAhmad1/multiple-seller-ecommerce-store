import { useState } from "react";
import { signInWithGoogle } from "../firebase";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const [googleUser, setGoogleUser] = useState(null);

  function handleChange(e) {
    const { id, value } = e.target;
    // setFormData(prev => ({
    //   ...prev,
    //   [id]: value,
    // }));
    const temp = {...formData};
    temp[id] = value;
    setFormData(temp);
  }

  function handleSelectChange(e) {
    setFormData(prev => ({
      ...prev,
      type: e.target.value,
    }));
  }

  async function googleSignIn(event) {
    event.preventDefault();

    if (!formData.type) {
      alert("Please select a user type before signing in with Google.");
      return;
    }

    try {
      const res = await signInWithGoogle();
      setGoogleUser(res.user); // You can use this to send to backend
      console.log("Google User:", res.user);

      // OPTIONAL: Send to your backend with formData.type
      // Example:
      // await fetch('/api/save-user', { method: 'POST', body: JSON.stringify({ ...res.user, type: formData.type }) })

    } catch (err) {
      console.error("Google Sign-In Failed", err);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.type) {
      alert("Please fill in all fields.");
      return;
    }

    // Submit formData to your backend or Firebase
    console.log("Normal Signup Data:", formData);
  }

  return (
    <div>
      <form>
        <h1>SIGN UP</h1>

        <fieldset>
          <legend>Details</legend>

          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} />

          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} />

          <label htmlFor="type">Select Type</label>
          <select id="type" value={formData.type} onChange={handleSelectChange}>
            <option value="" disabled>
              Select Type
            </option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
          </select>

          <button onClick={googleSignIn}>Sign Up with Google</button>
          <button onClick={handleSubmit}>Submit</button>
        </fieldset>
      </form>
    </div>
  );
}
