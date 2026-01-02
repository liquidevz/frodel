import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoryAPI } from '../../services/api';
import { Plus, Edit, Trash2 } from 'lucide-react';
import NotificationModal from '../../components/NotificationModal';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });
  const [deleteSlug, setDeleteSlug] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll();
      setCategories(response.data.data);
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to fetch categories'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    setDeleteSlug(slug);
    setModal({
      isOpen: true,
      type: 'warning',
      title: 'Confirm Delete',
      message: 'Are you sure you want to delete this category?',
      onConfirm: () => confirmDelete(slug)
    });
  };

  const confirmDelete = async (slug) => {
    try {
      await categoryAPI.delete(slug);
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success',
        message: 'Category deleted successfully'
      });
      fetchCategories();
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || 'Failed to delete category'
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link
          to="/admin/categories/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{category.slug}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Link
                    to={`/admin/categories/edit/${category.slug}`}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit className="w-4 h-4 inline" />
                  </Link>
                  <button
                    onClick={() => handleDelete(category.slug)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NotificationModal
        isOpen={modal.isOpen}
        setIsOpen={(val) => setModal({ ...modal, isOpen: val })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
      />
    </div>
  );
};

export default CategoryList;
