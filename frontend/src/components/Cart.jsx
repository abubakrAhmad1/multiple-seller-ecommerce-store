import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateCartItem } from '../redux/slice/cartSlice';
import { createOrder } from '../redux/slice/orderSlice';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/global.css';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.loginUser);
  const { loading: orderLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (user.id && user.type === 'buyer') {
      dispatch(fetchCart());
    }
  }, [dispatch, user.id, user.type]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateCartItem({ productId, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    if (!user.address) {
      alert('Please update your address in profile before checkout');
      return;
    }
    dispatch(createOrder({ shippingAddress: user.address }))
      .unwrap()
      .then(() => {
        navigate('/orders');
      })
      .catch((error) => {
        alert(error || 'Failed to create order');
      });
  };

  const total = items.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  if (!user.id || user.type !== 'buyer') {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="alert alert-error">Please login as a buyer to view cart</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '2rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>Shopping Cart</h1>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="card">
            <p style={{ textAlign: 'center', padding: '2rem' }}>Your cart is empty</p>
            <Link to="/products" className="btn" style={{ display: 'block', textAlign: 'center', maxWidth: '200px', margin: '0 auto' }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div>
              {items.map((item) => (
                <div key={item.product?._id} className="card" style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                  {item.product?.images && item.product.images.length > 0 && (
                    <img
                      src={`http://localhost:8000${item.product.images[0]}`}
                      alt={item.product.title}
                      style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '0.5rem' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                      }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ marginBottom: '0.5rem' }}>{item.product?.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                      ${item.product?.price} each
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <label>Quantity:</label>
                      <button
                        onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                        className="btn btn-secondary"
                        style={{ padding: '0.25rem 0.75rem' }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                        className="btn btn-secondary"
                        style={{ padding: '0.25rem 0.75rem' }}
                        disabled={item.quantity >= item.product?.quantity}
                      >
                        +
                      </button>
                    </div>
                    <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                      Subtotal: ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.product._id))}
                      className="btn btn-danger"
                      style={{ padding: '0.5rem 1rem' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
              <h2 style={{ marginBottom: '1.5rem' }}>Order Summary</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid var(--border-color)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="btn btn-success"
                style={{ width: '100%' }}
                disabled={orderLoading}
              >
                {orderLoading ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              <Link to="/products" className="btn btn-outline" style={{ width: '100%', display: 'block', textAlign: 'center', marginTop: '1rem' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
