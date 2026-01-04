import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, updateProduct, fetchMyProducts, fetchProduct } from '../redux/slice/productSlice';
import { fetchProduct as fetchProductDetail } from '../redux/slice/searchProductsSlice';
import Navbar from './Navbar';
import '../styles/global.css';

export default function AddProduct() {
  const { id } = useParams();
  const isEdit = !!id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginUser);
  const { currentProduct } = useSelector((state) => state.products);
  const { loading } = useSelector((state) => state.myProducts);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    status: 'active',
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (!user.id || user.type !== 'seller') {
      navigate('/login');
      return;
    }

    if (isEdit) {
      dispatch(fetchProductDetail(id)).then((result) => {
        if (result.payload) {
          const product = result.payload;
          setFormData({
            title: product.title || '',
            description: product.description || '',
            price: product.price || '',
            quantity: product.quantity || '',
            category: product.category || '',
            status: product.status || 'active',
          });
          setExistingImages(product.images || []);
        }
      });
    }
  }, [dispatch, id, isEdit, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleRemoveExistingImage = (imagePath) => {
    setExistingImages(existingImages.filter(img => img !== imagePath));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.price || !formData.quantity || !formData.category) {
      alert('Please fill in all required fields');
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      images: images,
    };

    if (isEdit) {
      dispatch(updateProduct({ id, productData }))
        .unwrap()
        .then(() => {
          navigate('/seller/products');
        })
        .catch((error) => {
          alert(error || 'Failed to update product');
        });
    } else {
      dispatch(createProduct(productData))
        .unwrap()
        .then(() => {
          navigate('/seller/products');
        })
        .catch((error) => {
          alert(error || 'Failed to create product');
        });
    }
  };

  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Food', 'Health', 'Beauty', 'Other'];

  return (
    <>
      <Navbar />
      <div className="container" style={{ maxWidth: '800px', marginTop: '2rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>{isEdit ? 'Edit Product' : 'Add New Product'}</h1>

        <form onSubmit={handleSubmit} className="card">
          <div className="input-group">
            <label htmlFor="title">Product Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="images">Product Images (Max 5)</label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            {images.length > 0 && (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {images.map((image, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '0.5rem' }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {isEdit && existingImages.length > 0 && (
            <div className="input-group">
              <label>Existing Images</label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {existingImages.map((image, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img
                      src={`http://localhost:8000${image}`}
                      alt={`Existing ${index}`}
                      style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '0.5rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(image)}
                      className="btn btn-danger"
                      style={{ position: 'absolute', top: '5px', right: '5px', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn" disabled={loading} style={{ flex: 1 }}>
              {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/seller/products')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

