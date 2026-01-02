import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { productAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import NotificationModal from '../components/NotificationModal';

const ProductDetail = () => {
  const { id: slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getBySlug(slug);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setModal({
      isOpen: true,
      type: 'success',
      title: 'Added to Cart!',
      message: `${product.name} has been added to your cart`
    });
    setTimeout(() => navigate('/cart'), 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-600 text-lg">Product not found</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28">
        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {product.images && product.images.length > 0 ? (
              <>
                <div className="relative overflow-hidden rounded-lg border border-gray-200">
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {product.images.slice(1).map((img, idx) => (
                      <div key={idx} className="relative overflow-hidden rounded-lg border border-gray-200 cursor-pointer hover:border-gray-400 transition-colors">
                        <img
                          src={img.url}
                          alt={`${product.name} ${idx + 2}`}
                          className="w-full h-24 object-cover"
                          onClick={(e) => {
                            const mainImg = e.target.parentElement.parentElement.parentElement.querySelector('img');
                            const temp = mainImg.src;
                            mainImg.src = e.target.src;
                            e.target.src = temp;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-gray-200">
                <div className="text-center">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">No Image Available</p>
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-xs font-medium text-gray-600 uppercase tracking-wider mb-3">
                {product.category}
              </span>
              <h1 className="text-4xl font-semibold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-base leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-6">
              <p className="text-sm text-gray-500 mb-1">Price per Piece</p>
              <p className="text-4xl font-semibold text-gray-900">₹{product.price}</p>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-4">Specifications</h3>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Weight/Piece</p>
                  <p className="text-lg font-medium text-gray-900">{product.weightPerPiece}g</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Pieces/KG</p>
                  <p className="text-lg font-medium text-gray-900">{product.piecesPerKg}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Stock</p>
                  <p className="text-lg font-medium text-gray-900">{product.stock}</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <NotificationModal
        isOpen={modal.isOpen}
        setIsOpen={(val) => setModal({ ...modal, isOpen: val })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};

export default ProductDetail;
