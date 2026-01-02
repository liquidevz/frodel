import React, { useState, useEffect } from 'react';
import { enquiryAPI } from '../../services/api';
import { Eye, Edit2 } from 'lucide-react';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState({
    status: 'new',
    adminNotes: '',
  });

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
      alert('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setFormData({
      status: enquiry.status,
      adminNotes: enquiry.adminNotes || '',
    });
    setShowDetails(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateEnquiry = async (e) => {
    e.preventDefault();

    try {
      await enquiryAPI.update(selectedEnquiry.id, formData);
      alert('Enquiry updated successfully');
      setShowDetails(false);
      fetchEnquiries();
    } catch (error) {
      alert('Failed to update enquiry: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Enquiries Management</h1>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 text-lg">No enquiries yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Total Value
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {enquiry.customerName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{enquiry.customerEmail}</td>
                    <td className="px-6 py-4 text-gray-600">{enquiry.items.length}</td>
                    <td className="px-6 py-4 text-gray-600">${enquiry.totalValue.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[enquiry.status]}`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewDetails(enquiry)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedEnquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Enquiry Details</h2>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Customer Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold text-gray-900">{selectedEnquiry.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">{selectedEnquiry.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">{selectedEnquiry.customerPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-semibold text-gray-900">{selectedEnquiry.companyName || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Ordered Items</h3>
                <div className="space-y-2">
                  {selectedEnquiry.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-gray-900">
                      <span>{item.productId?.name || 'Product'} x {item.quantity}</span>
                      <span>${(item.productId?.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-bold flex justify-between">
                    <span>Total:</span>
                    <span>${selectedEnquiry.totalValue.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              {selectedEnquiry.message && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-gray-900 mb-2">Customer Message</h3>
                  <p className="text-gray-600">{selectedEnquiry.message}</p>
                </div>
              )}

              {/* Status Update Form */}
              <form onSubmit={handleUpdateEnquiry} className="space-y-4">
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

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Update Enquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDetails(false)}
                    className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
