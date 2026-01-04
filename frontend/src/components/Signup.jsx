import { useSelector, useDispatch } from "react-redux";
import { handleChange, submitFormData } from "../redux/slice/signupSlice";
import { setUser } from "../redux/slice/loginUser";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/global.css";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, password, type, phone, shopName, loading, error, success } = useSelector((state) => state.signup);

  useEffect(() => {
    if (success) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        dispatch(setUser(user));
        navigate(user.type === 'seller' ? '/seller/dashboard' : '/products');
      }
    }
  }, [success, dispatch, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!name || !email || !password || !type) {
      return;
    }
    dispatch(submitFormData({ name, email, password, type, phone, shopName }));
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ maxWidth: '500px', marginTop: '3rem' }}>
        <div className="card">
          <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Sign Up</h1>
          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">Account created successfully!</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="type">I am a</label>
              <select
                id="type"
                value={type}
                onChange={(e) => dispatch(handleChange({ id: 'type', value: e.target.value }))}
                required
              >
                <option value="">Select Type</option>
                <option value="seller">Seller</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => dispatch(handleChange({ id: 'name', value: e.target.value }))}
                required
              />
            </div>

            {type === 'seller' && (
              <div className="input-group">
                <label htmlFor="shopName">Shop Name (Optional)</label>
                <input
                  type="text"
                  id="shopName"
                  value={shopName}
                  onChange={(e) => dispatch(handleChange({ id: 'shopName', value: e.target.value }))}
                />
              </div>
            )}

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => dispatch(handleChange({ id: 'email', value: e.target.value }))}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone (Optional)</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => dispatch(handleChange({ id: 'phone', value: e.target.value }))}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password (Min 6 characters)</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => dispatch(handleChange({ id: 'password', value: e.target.value }))}
                minLength={6}
                required
              />
            </div>

            <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
