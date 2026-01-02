import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardOverview from './admin/Dashboard';
import ProductList from './admin/ProductList';
import ProductForm from './admin/ProductForm';
import EnquiryList from './admin/EnquiryList';
import EnquiryDetail from './admin/EnquiryDetail';
import TestimonialList from './admin/TestimonialList';
import TestimonialForm from './admin/TestimonialForm';
import CategoryList from './admin/CategoryList';
import CategoryForm from './admin/CategoryForm';
import { Package, MessageSquare, LogOut, BarChart3, ChevronRight, MessageCircle, FolderTree } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isSelected = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <motion.nav
        layout
        className="sticky top-0 h-screen shrink-0 border-r border-gray-300 bg-white p-2"
        style={{
          width: open ? "225px" : "fit-content",
        }}
      >
        {/* Title Section */}
        <div className="mb-3 border-b border-gray-300 pb-3">
          <div className="flex items-center gap-2 p-2">
            <motion.div
              layout
              className="grid size-10 shrink-0 place-content-center rounded-md bg-blue-600 text-white text-2xl"
            >
              ❄
            </motion.div>
            {open && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
              >
                <span className="block text-xs font-semibold">Admin Panel</span>
                <span className="block text-xs text-gray-500">{user?.name}</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Menu Options */}
        <div className="space-y-1">
          <Link to="/admin/dashboard">
            <motion.div
              layout
              className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
                isSelected('/admin/dashboard') || location.pathname === '/admin'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <motion.div layout className="grid h-full w-10 place-content-center text-lg">
                <BarChart3 className="w-5 h-5" />
              </motion.div>
              {open && (
                <motion.span
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.125 }}
                  className="text-xs font-medium"
                >
                  Dashboard
                </motion.span>
              )}
            </motion.div>
          </Link>

          <Link to="/admin/products">
            <motion.div
              layout
              className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
                isSelected('/admin/products')
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <motion.div layout className="grid h-full w-10 place-content-center text-lg">
                <Package className="w-5 h-5" />
              </motion.div>
              {open && (
                <motion.span
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.125 }}
                  className="text-xs font-medium"
                >
                  Products
                </motion.span>
              )}
            </motion.div>
          </Link>

          <Link to="/admin/enquiries">
            <motion.div
              layout
              className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
                isSelected('/admin/enquiries')
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <motion.div layout className="grid h-full w-10 place-content-center text-lg">
                <MessageSquare className="w-5 h-5" />
              </motion.div>
              {open && (
                <motion.span
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.125 }}
                  className="text-xs font-medium"
                >
                  Enquiries
                </motion.span>
              )}
            </motion.div>
          </Link>

          <Link to="/admin/testimonials">
            <motion.div
              layout
              className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
                isSelected('/admin/testimonials')
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <motion.div layout className="grid h-full w-10 place-content-center text-lg">
                <MessageCircle className="w-5 h-5" />
              </motion.div>
              {open && (
                <motion.span
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.125 }}
                  className="text-xs font-medium"
                >
                  Testimonials
                </motion.span>
              )}
            </motion.div>
          </Link>

          <Link to="/admin/categories">
            <motion.div
              layout
              className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
                isSelected('/admin/categories')
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <motion.div layout className="grid h-full w-10 place-content-center text-lg">
                <FolderTree className="w-5 h-5" />
              </motion.div>
              {open && (
                <motion.span
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.125 }}
                  className="text-xs font-medium"
                >
                  Categories
                </motion.span>
              )}
            </motion.div>
          </Link>
        </div>

        {/* Logout Button */}
        <motion.button
          layout
          onClick={handleLogout}
          className="absolute bottom-16 left-0 right-0 mx-2 flex h-10 items-center rounded-md text-red-600 hover:bg-red-50 transition-colors"
        >
          <motion.div layout className="grid h-full w-10 place-content-center text-lg">
            <LogOut className="w-5 h-5" />
          </motion.div>
          {open && (
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="text-xs font-medium"
            >
              Logout
            </motion.span>
          )}
        </motion.button>

        {/* Toggle Button */}
        <motion.button
          layout
          onClick={() => setOpen((pv) => !pv)}
          className="absolute bottom-0 left-0 right-0 border-t border-gray-300 transition-colors hover:bg-gray-100"
        >
          <div className="flex items-center p-2">
            <motion.div layout className="grid size-10 place-content-center text-lg">
              <ChevronRight
                className={`w-5 h-5 transition-transform ${open && 'rotate-180'}`}
              />
            </motion.div>
            {open && (
              <motion.span
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
                className="text-xs font-medium"
              >
                Hide
              </motion.span>
            )}
          </div>
        </motion.button>
      </motion.nav>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/create" element={<ProductForm />} />
            <Route path="/products/edit/:id" element={<ProductForm />} />
            <Route path="/enquiries" element={<EnquiryList />} />
            <Route path="/enquiries/:id" element={<EnquiryDetail />} />
            <Route path="/testimonials" element={<TestimonialList />} />
            <Route path="/testimonials/create" element={<TestimonialForm />} />
            <Route path="/testimonials/edit/:id" element={<TestimonialForm />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/create" element={<CategoryForm />} />
            <Route path="/categories/edit/:slug" element={<CategoryForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
