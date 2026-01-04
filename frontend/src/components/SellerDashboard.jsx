import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchMyProducts, deleteProduct } from '../redux/slice/productSlice';
import api from '../utils/api';
import Navbar from './Navbar';
import '../styles/global.css';
import api from '../utils/api';

export default function SellerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { products, loading } = useSelector((state) => state.myProducts);
  const user = useSelector((state) => state.loginUser);
  const [activeTab, setActiveTab] = useState('products');
  const [sellerOrders, setSellerOrders] = useState([]);

  useEffect(() => {
    if (!user.id || user.type !== 'seller') {
      navigate('/login');
      return;
    }

    if (location.pathname.includes('orders')) {
      setActiveTab('orders');
      fetchOrders();
    } else {
      setActiveTab('products');
      dispatch(fetchMyProducts());
    }
  }, [dispatch, user, navigate, location]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/seller/my-orders');
      setSellerOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  if (!user.id || user.type !== 'seller') {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '2rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>Seller Dashboard</h1>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid var(--border-color)' }}>
          <button
            className={activeTab === 'products' ? 'btn' : 'btn btn-outline'}
            onClick={() => {
              setActiveTab('products');
              navigate('/seller/products');
            }}
          >
            My Products
          </button>
          <button
            className={activeTab === 'orders' ? 'btn' : 'btn btn-outline'}
            onClick={() => {
              setActiveTab('orders');
              navigate('/seller/orders');
              fetchOrders();
            }}
          >
            Orders
          </button>
        </div>

        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>My Products ({products.length})</h2>
              <button onClick={() => navigate('/seller/products/add')} className="btn">
                + Add New Product
              </button>
            </div>

            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="card">
                <p style={{ textAlign: 'center', padding: '2rem' }}>No products yet. Add your first product!</p>
                <button onClick={() => navigate('/seller/products/add')} className="btn" style={{ display: 'block', margin: '0 auto' }}>
                  Add Product
                </button>
              </div>
            ) : (
              <div className="grid grid-3">
                {products.map((product) => (
                  <div key={product._id} className="card">
                    {product.images && product.images.length > 0 && (
                      <img
                        src={`http://localhost:8000${product.images[0]}`}
                        alt={product.title}
                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                      />
                    )}
                    <h3 style={{ marginBottom: '0.5rem' }}>{product.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                      {product.description?.substring(0, 100)}...
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                        ${product.price}
                      </span>
                      <span style={{ color: product.quantity > 0 ? 'var(--secondary-color)' : 'var(--danger-color)' }}>
                        Stock: {product.quantity}
                      </span>
                    </div>
                    <div style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>
                      Status: <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{product.status}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => navigate(`/seller/products/edit/${product._id}`)}
                        className="btn btn-secondary"
                        style={{ flex: 1 }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="btn btn-danger"
                        style={{ flex: 1 }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Orders ({sellerOrders.length})</h2>
            {sellerOrders.length === 0 ? (
              <div className="card">
                <p style={{ textAlign: 'center', padding: '2rem' }}>No orders yet</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sellerOrders.map((order) => (
                  <div key={order._id} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div>
                        <strong>Order ID:</strong> {order._id.substring(0, 8)}...
                        <br />
                        <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                        <br />
                        <strong>Buyer:</strong> {order.buyer?.name || 'Unknown'}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                          ${order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                        </div>
                        <div style={{ marginTop: '0.5rem' }}>
                          Status: <span style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{order.status}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <strong>Items:</strong>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
                          {item.product?.title} - Qty: {item.quantity} - ${item.price} each
                        </div>
                      ))}
                    </div>
                    {order.status !== 'delivered' && order.status !== 'cancelled' && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleUpdateOrderStatus(order._id, 'processing')}
                          className="btn btn-secondary"
                          disabled={order.status === 'processing'}
                        >
                          Mark as Processing
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(order._id, 'shipped')}
                          className="btn btn-secondary"
                          disabled={order.status === 'shipped' || order.status === 'pending'}
                        >
                          Mark as Shipped
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(order._id, 'delivered')}
                          className="btn btn-success"
                          disabled={order.status === 'delivered'}
                        >
                          Mark as Delivered
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

