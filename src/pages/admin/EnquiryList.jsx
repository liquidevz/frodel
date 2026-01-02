import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { enquiryAPI } from '../../services/api';
import { Eye, MessageSquare, Mail, Trash2 } from 'lucide-react';
import NotificationModal from '../../components/NotificationModal';

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, type: 'success', title: '', message: '' });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [emailData, setEmailData] = useState({ message: '', quote: null });

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    quoted: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const response = await enquiryAPI.getAll();
      setEnquiries(response.data.data);
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    try {
      await enquiryAPI.delete(slug);
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success!',
        message: 'Enquiry deleted successfully'
      });
      setShowDeleteModal(false);
      fetchEnquiries();
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to delete enquiry'
      });
    }
  };

  const handleDeleteClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowDeleteModal(true);
  };

  const handleEmailClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowEmailModal(true);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!emailData.message) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Validation Error',
        message: 'Please enter an email message'
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('message', emailData.message);
      if (emailData.quote) {
        formData.append('quote', emailData.quote);
      }

      await enquiryAPI.reply(selectedEnquiry.slug, formData);
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success!',
        message: 'Email sent successfully'
      });
      setShowEmailModal(false);
      setEmailData({ message: '', quote: null });
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: 'Failed to send email'
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Enquiries</h1>
        <p className="text-gray-500 mt-1">Manage customer enquiries and requests</p>
      </div>

      {enquiries.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 text-lg">No enquiries yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.slug} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{enquiry.customerName}</p>
                      <p className="text-sm text-gray-500">{enquiry.companyName || 'Individual'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{enquiry.customerEmail}</p>
                      <p className="text-sm text-gray-500">{enquiry.customerPhone}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{enquiry.items.length} items</td>
                    <td className="px-6 py-4 font-medium text-gray-900">${enquiry.totalValue.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[enquiry.status]}`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/enquiries/${enquiry.slug}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleEmailClick(enquiry)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(enquiry)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reply to Enquiry</h2>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">To: {selectedEnquiry.customerEmail}</p>
              <p className="text-sm text-gray-600">Customer: {selectedEnquiry.customerName}</p>
            </div>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Message *</label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                  rows="8"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter your email message (HTML supported)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">Quote Attachment (Optional)</label>
                <input
                  type="file"
                  onChange={(e) => setEmailData({...emailData, quote: e.target.files[0]})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Send Email
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailData({ message: '', quote: null });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Enquiry</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the enquiry from <strong>{selectedEnquiry.customerName}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(selectedEnquiry.slug)}
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

export default EnquiryList;