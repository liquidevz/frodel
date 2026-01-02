import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productAPI, categoryAPI } from '../../services/api';
import NotificationModal from '../../components/NotificationModal';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id: slug } = useParams();
  const isEdit = !!slug;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    weightPerPiece: '',
    piecesPerKg: '',
    price: '',
    stock: '',
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    if (isEdit) {
      fetchProduct();
    }
  }, [slug]);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getBySlug(slug);
      const product = response.data.data;
      setFormData({
        name: product.name,
        description: product.description || '',
        category: product.category,
        weightPerPiece: product.weightPerPiece,
        piecesPerKg: product.piecesPerKg,
        price: product.price,
        stock: product.stock,
      });
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to load product'
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.weightPerPiece || !formData.piecesPerKg || !formData.price) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all required fields including category'
      });
      return;
    }

    if (!imageFiles.length && !isEdit) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Validation Error',
        message: 'Please select at least one image'
      });
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('weightPerPiece', formData.weightPerPiece);
      data.append('piecesPerKg', formData.piecesPerKg);
      data.append('price', formData.price);
      data.append('stock', formData.stock || '0');

      if (imageFiles.length > 0) {
        imageFiles.forEach((file) => {
          data.append('images', file);
        });
      }

      if (isEdit) {
        await productAPI.update(slug, data);
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Success!',
          message: 'Product updated successfully'
        });
      } else {
        await productAPI.create(data);
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Success!',
          message: 'Product created successfully'
        });
      }

      setTimeout(() => navigate('/admin/products'), 1500);
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || 'Failed to save product'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{isEdit ? 'Edit Product' : 'Create Product'}</h1>
        <p className="text-gray-500 mt-1">Fill in the product details below</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Weight per Piece (g) *
              </label>
              <input
                type="number"
                step="0.01"
                name="weightPerPiece"
                value={formData.weightPerPiece}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Pieces per KG *
              </label>
              <input
                type="number"
                name="piecesPerKg"
                value={formData.piecesPerKg}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Product Images (up to 5) {!isEdit && '*'}
            </label>
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files).slice(0, 5))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {imageFiles.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                Selected: {imageFiles.length} image(s)
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium shadow-sm"
            >
              {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
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

export default ProductForm;