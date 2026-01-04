import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../redux/slice/searchProductsSlice';
import { addReview } from '../redux/slice/productSlice';
import { addToCart } from '../redux/slice/cartSlice';
import Navbar from './Navbar';
import '../styles/global.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct, loading } = useSelector((state) => state.products);
  const user = useSelector((state) => state.loginUser);
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!user.id) {
      navigate('/login');
      return;
    }
    dispatch(addToCart({ productId: id, quantity }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user.id || user.type !== 'buyer') {
      alert('Only buyers can leave reviews');
      return;
    }
    dispatch(addReview({ productId: id, rating: reviewRating, comment: reviewComment }))
      .then(() => {
        setReviewComment('');
        setShowReviewForm(false);
        dispatch(fetchProduct(id));
      });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  if (!currentProduct) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="alert alert-error">Product not found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
          ← Back
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Product Images */}
          <div>
            {currentProduct.images && currentProduct.images.length > 0 ? (
              <img
                src={`http://localhost:8000${currentProduct.images[0]}`}
                alt={currentProduct.title}
                style={{ width: '100%', borderRadius: '0.75rem', boxShadow: 'var(--shadow-lg)' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
                }}
              />
            ) : (
              <div style={{ width: '100%', height: '400px', background: 'var(--bg-secondary)', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                No Image Available
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 style={{ marginBottom: '1rem' }}>{currentProduct.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                ${currentProduct.price}
              </span>
              {currentProduct.rating?.average > 0 && (
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span>{currentProduct.rating.average.toFixed(1)} ({currentProduct.rating.count} reviews)</span>
                </div>
              )}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <strong>Category:</strong> {currentProduct.category}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <strong>Seller:</strong> {currentProduct.seller?.shopName || currentProduct.seller?.name || 'Unknown'}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <strong>Stock:</strong> {currentProduct.quantity > 0 ? `${currentProduct.quantity} available` : 'Out of Stock'}
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3>Description</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>{currentProduct.description}</p>
            </div>

            {currentProduct.quantity > 0 && user.type === 'buyer' && (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={currentProduct.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(currentProduct.quantity, parseInt(e.target.value) || 1)))}
                  style={{ width: '80px', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}
                />
                <button onClick={handleAddToCart} className="btn" style={{ flex: 1 }}>
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="card" style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Reviews ({currentProduct.reviews?.length || 0})</h2>
            {user.type === 'buyer' && (
              <button onClick={() => setShowReviewForm(!showReviewForm)} className="btn">
                {showReviewForm ? 'Cancel' : 'Write a Review'}
              </button>
            )}
          </div>

          {showReviewForm && (
            <form onSubmit={handleSubmitReview} style={{ marginBottom: '2rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
              <div className="input-group">
                <label>Rating</label>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(parseInt(e.target.value))}
                  style={{ width: '100px' }}
                >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>{rating} Stars</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Comment</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Write your review..."
                  rows={4}
                />
              </div>
              <button type="submit" className="btn">Submit Review</button>
            </form>
          )}

          {currentProduct.reviews && currentProduct.reviews.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {currentProduct.reviews.map((review, index) => (
                <div key={index} style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <strong>{review.user?.name || 'Anonymous'}</strong>
                    <span className="stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                  </div>
                  {review.comment && <p style={{ color: 'var(--text-secondary)' }}>{review.comment}</p>}
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </>
  );
}

