import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../redux/slice/orderSlice';
import Navbar from './Navbar';
import '../styles/global.css';

export default function BuyerOrders() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);
  const user = useSelector((state) => state.loginUser);

  useEffect(() => {
    if (user.id && user.type === 'buyer') {
      dispatch(fetchOrders());
    }
  }, [dispatch, user.id, user.type]);

  if (!user.id || user.type !== 'buyer') {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="alert alert-error">Please login as a buyer to view orders</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '2rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>My Orders</h1>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="card">
            <p style={{ textAlign: 'center', padding: '2rem' }}>No orders yet</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {orders.map((order) => (
              <div key={order._id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <strong>Order ID:</strong> {order._id.substring(0, 8)}...
                    <br />
                    <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                    {order.deliveredDate && (
                      <>
                        <br />
                        <strong>Delivered:</strong> {new Date(order.deliveredDate).toLocaleDateString()}
                      </>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                      ${order.totalAmount.toFixed(2)}
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                      Status: <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{order.status}</span>
                    </div>
                    <div style={{ marginTop: '0.5rem' }}>
                      Payment: <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{order.paymentStatus}</span>
                    </div>
                  </div>
                </div>

                {order.shippingAddress && (
                  <div style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                    <strong>Shipping Address:</strong>
                    <div style={{ marginTop: '0.5rem' }}>
                      {order.shippingAddress.street && `${order.shippingAddress.street}, `}
                      {order.shippingAddress.city && `${order.shippingAddress.city}, `}
                      {order.shippingAddress.state && `${order.shippingAddress.state} `}
                      {order.shippingAddress.zipCode && order.shippingAddress.zipCode}
                      {order.shippingAddress.country && `, ${order.shippingAddress.country}`}
                    </div>
                  </div>
                )}

                <div>
                  <strong>Items:</strong>
                  <div style={{ marginTop: '1rem', display: 'grid', gap: '1rem' }}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                        {item.product?.images && item.product.images.length > 0 && (
                          <img
                            src={`http://localhost:8000${item.product.images[0]}`}
                            alt={item.product.title}
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '0.5rem' }}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                            }}
                          />
                        )}
                        <div style={{ flex: 1 }}>
                          <h4 style={{ marginBottom: '0.5rem' }}>{item.product?.title || 'Product'}</h4>
                          <div style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                            Seller: {item.seller?.shopName || item.seller?.name || 'Unknown'}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Quantity: {item.quantity}</span>
                            <span style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

