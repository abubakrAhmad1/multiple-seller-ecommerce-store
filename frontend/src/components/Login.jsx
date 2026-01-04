import { useDispatch, useSelector } from "react-redux";
import { handleChange, submitSignInData } from "../redux/slice/signInSlice";
import { setUser } from "../redux/slice/loginUser";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/global.css";

export default function Login() {
  const { email, password, type, loading, error } = useSelector((state) => state.signin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.token) {
        navigate(user.type === 'seller' ? '/seller/dashboard' : '/products');
      }
    }
  }, [navigate]);

  function loginFunction(event) {
    event.preventDefault();
    if (!email || !password || !type) {
      return;
    }
    dispatch(submitSignInData({ email, password, type }))
      .unwrap()
      .then((res) => {
        dispatch(setUser(res));
        if (type === "seller") {
          navigate('/seller/dashboard');
        } else {
          navigate("/products");
        }
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ maxWidth: '500px', marginTop: '3rem' }}>
        <div className="card">
          <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Login</h1>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={loginFunction}>
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => dispatch(handleChange({ id: 'password', value: e.target.value }))}
                required
              />
            </div>

            <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
}
