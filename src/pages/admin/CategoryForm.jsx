import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryAPI } from '../../services/api';
import { ArrowLeft } from 'lucide-react';
import NotificationModal from '../../components/NotificationModal';

const CategoryForm = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  useEffect(() => {
    if (slug) {
      fetchCategory();
    }
  }, [slug]);

  const fetchCategory = async () => {
    try {
      const response = await categoryAPI.getBySlug(slug);
      setName(response.data.data.name);
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to fetch category'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (slug) {
        await categoryAPI.update(slug, { name });
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Success',
          message: 'Category updated successfully'
        });
      } else {
        await categoryAPI.create({ name });
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Success',
          message: 'Category created successfully'
        });
      }
      setTimeout(() => navigate('/admin/categories'), 1500);
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to save category'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate('/admin/categories')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Categories
      </button>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">{slug ? 'Edit' : 'Create'} Category</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Category'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/categories')}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
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

export default CategoryForm;
