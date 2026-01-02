import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { enquiryAPI } from '../../services/api';
import NotificationModal from '../../components/NotificationModal';

const EnquiryDetail = () => {
  const navigate = useNavigate();
  const { id: slug } = useParams();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    status: 'new',
    adminNotes: '',
  });
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    quoted: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  useEffect(() => {
    fetchEnquiry();
  }, [slug]);

  const fetchEnquiry = async () => {
    try {
      setLoading(true);
      const response = await enquiryAPI.getBySlug(slug);
      const data = response.data.data;
      setEnquiry(data);
      setFormData({
        status: data.status,
        adminNotes: data.adminNotes || '',
      });
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to load enquiry'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await enquiryAPI.update(slug, formData);
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success!',
        message: 'Enquiry updated successfully'
      });
      setTimeout(() => navigate('/admin/enquiries'), 1500);
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to update enquiry'
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

  if (!enquiry) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Enquiry Details</h1>
        <p className="text-gray-500 mt-1">View and manage enquiry information</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-4xl">
        {/* Customer Info */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
          <h3 className="font-bold text-gray-900 mb-3">Customer Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-semibold text-gray-900">{enquiry.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">{enquiry.customerEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold text-gray-900">{enquiry.customerPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Company</p>
              <p className="font-semibold text-gray-900">{enquiry.companyName || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-100">
          <h3 className="font-bold text-gray-900 mb-3">Ordered Items</h3>
          <div className="space-y-2">
            {enquiry.items.map((item, index) => (
              <div key={index} className="flex justify-between text-gray-900">
                <span>{item.productId?.name || 'Product'} x {item.quantity}</span>
                <span>₹{(item.productId?.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 font-bold flex justify-between">
              <span>Total:</span>
              <span>₹{enquiry.totalValue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Message */}
        {enquiry.message && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-gray-900 mb-2">Customer Message</h3>
            <p className="text-gray-600">{enquiry.message}</p>
          </div>
        )}

        {/* Status Update Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="quoted">Quoted</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Admin Notes
            </label>
            <textarea
              name="adminNotes"
              value={formData.adminNotes}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm"
            >
              Update Enquiry
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/enquiries')}
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              Back
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

export default EnquiryDetail;