import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, enquiryAPI } from '../../services/api';
import { Package, MessageSquare, Clock } from 'lucide-react';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    recentEnquiries: [],
    lowStockProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [productsRes, enquiriesRes] = await Promise.all([
        productAPI.getAll(),
        enquiryAPI.getAll()
      ]);

      const products = productsRes.data.data;
      const enquiries = enquiriesRes.data.data;

      const newEnquiries = enquiries.filter(e => e.status === 'new').length;
      const recentEnquiries = enquiries.slice(0, 5);
      const lowStockProducts = products.filter(p => p.stock < 10);

      setStats({
        totalProducts: products.length,
        totalEnquiries: enquiries.length,
        newEnquiries,
        recentEnquiries,
        lowStockProducts
      });
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    quoted: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Products</p>
              <p className="text-4xl font-bold mt-2">{stats.totalProducts}</p>
            </div>
            <Package className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Enquiries</p>
              <p className="text-4xl font-bold mt-2">{stats.totalEnquiries}</p>
            </div>
            <MessageSquare className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">New Enquiries</p>
              <p className="text-4xl font-bold mt-2">{stats.newEnquiries}</p>
            </div>
            <Clock className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Enquiries</h2>
            <Link
              to="/admin/enquiries"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              View All →
            </Link>
          </div>
        </div>
        <div className="p-6">
          {stats.recentEnquiries.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No enquiries yet</p>
          ) : (
            <div className="space-y-3">
              {stats.recentEnquiries.map((enquiry) => (
                <div key={enquiry.slug} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{enquiry.customerName}</p>
                    <p className="text-sm text-gray-600">{enquiry.customerEmail}</p>
                    <p className="text-sm text-gray-500">
                      {enquiry.items.length} items • ₹{enquiry.totalValue.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[enquiry.status]}`}>
                      {enquiry.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Low Stock Alert */}
      {stats.lowStockProducts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-red-200">
          <div className="p-6 border-b border-red-200 bg-red-50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-red-900">⚠️ Low Stock Alert</h2>
              <Link
                to="/admin/products"
                className="text-red-600 hover:text-red-800 font-medium text-sm"
              >
                Manage Products →
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {stats.lowStockProducts.map((product) => (
                <div key={product.slug} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">
                      Stock: {product.stock}
                    </p>
                    <p className="text-sm text-gray-500">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/products"
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-white"
        >
          <div className="flex items-center gap-4">
            <Package className="w-10 h-10" />
            <div>
              <h3 className="font-bold text-lg">Manage Products</h3>
              <p className="text-sm text-blue-100">Add, edit, or remove products</p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/enquiries"
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-white"
        >
          <div className="flex items-center gap-4">
            <MessageSquare className="w-10 h-10" />
            <div>
              <h3 className="font-bold text-lg">View Enquiries</h3>
              <p className="text-sm text-green-100">Process customer enquiries</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardOverview;
