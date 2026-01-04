import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setFilters, clearFilters, fetchCategories } from '../redux/slice/searchProductsSlice';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/global.css';

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error, currentPage, totalPages, filters, categories } = useSelector((state) => state.products);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ ...localFilters, page: currentPage }));
  }, [dispatch, currentPage, localFilters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value, page: 1 };
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
    dispatch(fetchProducts(newFilters));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters(localFilters));
    dispatch(fetchProducts({ ...localFilters, page: 1 }));
  };

  const clearAllFilters = () => {
    const cleared = {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };
    setLocalFilters(cleared);
    dispatch(clearFilters());
    dispatch(fetchProducts({ ...cleared, page: 1 }));
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: '2rem' }}>
        <h1 style={{ marginBottom: '2rem' }}>Products</h1>

        {/* Filters */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <label>Search</label>
              <input
                type="text"
                value={localFilters.search}
                onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
                placeholder="Search products..."
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}
              />
            </div>
            <div style={{ minWidth: '150px' }}>
              <label>Category</label>
              <select
                value={localFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div style={{ minWidth: '120px' }}>
              <label>Min Price</label>
              <input
                type="number"
                value={localFilters.minPrice}
                onChange={(e) => setLocalFilters({ ...localFilters, minPrice: e.target.value })}
                placeholder="Min"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}
              />
            </div>
            <div style={{ minWidth: '120px' }}>
              <label>Max Price</label>
              <input
                type="number"
                value={localFilters.maxPrice}
                onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: e.target.value })}
                placeholder="Max"
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}
              />
            </div>
            <div style={{ minWidth: '150px' }}>
              <label>Sort By</label>
              <select
                value={`${localFilters.sortBy}-${localFilters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleFilterChange('sortBy', sortBy);
                  handleFilterChange('sortOrder', sortOrder);
                }}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '0.5rem' }}
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating.average-desc">Highest Rated</option>
              </select>
            </div>
            <button type="submit" className="btn">Search</button>
            <button type="button" onClick={clearAllFilters} className="btn btn-secondary">Clear</button>
          </form>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : products.length === 0 ? (
          <div className="alert alert-info">No products found</div>
        ) : (
          <>
            <div className="grid grid-3">
              {products.map((product) => (
                <Link key={product._id} to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card" style={{ cursor: 'pointer' }}>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                        ${product.price}
                      </span>
                      {product.rating?.average > 0 && (
                        <div className="rating">
                          <span className="stars">★</span>
                          <span>{product.rating.average.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      By {product.seller?.shopName || product.seller?.name || 'Seller'}
                    </div>
                    {product.quantity === 0 && (
                      <div style={{ marginTop: '0.5rem', color: 'var(--danger-color)', fontWeight: '500' }}>Out of Stock</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                <button
                  className="btn btn-outline"
                  disabled={currentPage === 1}
                  onClick={() => dispatch(fetchProducts({ ...localFilters, page: currentPage - 1 }))}
                >
                  Previous
                </button>
                <span style={{ display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-outline"
                  disabled={currentPage === totalPages}
                  onClick={() => dispatch(fetchProducts({ ...localFilters, page: currentPage + 1 }))}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

