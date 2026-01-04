import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/slice/loginUser';
import { clearCart } from '../redux/slice/cartSlice';
import '../styles/global.css';

export default function Navbar() {
  const user = useSelector((state) => state.loginUser);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItemCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearCart());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-brand">
          MultiSeller Store
        </Link>
        <div className="navbar-links">
          {user.id ? (
            <>
              {user.type === 'buyer' ? (
                <>
                  <Link to="/products" className="navbar-link">Products</Link>
                  <Link to="/cart" className="navbar-link">
                    Cart {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
                  </Link>
                  <Link to="/orders" className="navbar-link">My Orders</Link>
                </>
              ) : (
                <>
                  <Link to="/seller/dashboard" className="navbar-link">Dashboard</Link>
                  <Link to="/seller/products" className="navbar-link">My Products</Link>
                  <Link to="/seller/orders" className="navbar-link">Orders</Link>
                </>
              )}
              <span className="navbar-link">Hello, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/signup" className="btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

