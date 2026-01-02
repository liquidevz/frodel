import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { testimonialAPI } from '../../services/api';
import NotificationModal from '../../components/NotificationModal';

const TestimonialForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    testimonial: '',
    by: '',
    order: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  useEffect(() => {
    if (isEdit) {
      fetchTestimonial();
    }
  }, [id]);

  const fetchTestimonial = async () => {
    try {
      const response = await testimonialAPI.getById(id);
      const testimonial = response.data.data;
      setFormData({
        testimonial: testimonial.testimonial,
        by: testimonial.by,
        order: testimonial.order || 0,
      });
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to load testimonial'
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.testimonial || !formData.by) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('testimonial', formData.testimonial);
      data.append('by', formData.by);
      data.append('order', formData.order);
      if (imageFile) {
        data.append('image', imageFile);
      }

      if (isEdit) {
        await testimonialAPI.update(id, data);
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Success!',
          message: 'Testimonial updated successfully'
        });
      } else {
        await testimonialAPI.create(data);
        setModal({
          isOpen: true,
          type: 'success',
          title: 'Success!',
          message: 'Testimonial created successfully'
        });
      }

      setTimeout(() => navigate('/admin/testimonials'), 1500);
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || 'Failed to save testimonial'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{isEdit ? 'Edit Testimonial' : 'Create Testimonial'}</h1>
        <p className="text-gray-500 mt-1">Fill in the testimonial details below</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Testimonial *
            </label>
            <textarea
              name="testimonial"
              value={formData.testimonial}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              By (Name) *
            </label>
            <input
              type="text"
              name="by"
              value={formData.by}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {imageFile && (
              <p className="text-sm text-gray-600 mt-1">Selected: {imageFile.name}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium shadow-sm"
            >
              {loading ? 'Saving...' : isEdit ? 'Update Testimonial' : 'Create Testimonial'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/testimonials')}
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

export default TestimonialForm;
