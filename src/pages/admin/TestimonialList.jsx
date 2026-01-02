import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { testimonialAPI } from '../../services/api';
import { Plus, Edit2, Trash2, MessageCircle } from 'lucide-react';
import NotificationModal from '../../components/NotificationModal';

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await testimonialAPI.getAll();
      setTestimonials(response.data.data);
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to load testimonials'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowDeleteModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await testimonialAPI.delete(id);
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success!',
        message: 'Testimonial deleted successfully'
      });
      setShowDeleteModal(false);
      fetchTestimonials();
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to delete testimonial'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage customer testimonials</p>
        </div>
        <Link
          to="/admin/testimonials/create"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 text-lg">No testimonials yet</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {testimonial.image && (
                <img
                  src={testimonial.image}
                  alt={testimonial.by}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <p className="text-gray-700 text-center mb-4 italic">"{testimonial.testimonial}"</p>
              <p className="text-sm font-semibold text-gray-900 text-center">- {testimonial.by}</p>
              <p className="text-xs text-gray-500 text-center mb-4">Order: {testimonial.order}</p>
              <div className="flex justify-center gap-2">
                <Link
                  to={`/admin/testimonials/edit/${testimonial._id}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDeleteClick(testimonial)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeleteModal && selectedTestimonial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Testimonial</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the testimonial by <strong>{selectedTestimonial.by}</strong>?
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(selectedTestimonial._id)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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

export default TestimonialList;
