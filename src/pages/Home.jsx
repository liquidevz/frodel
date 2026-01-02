import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { ShoppingCart, Package, TrendingUp, Snowflake } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import { StaggerTestimonials } from '../components/StaggerTestimonials';
import GetInTouch from '../components/GetInTouch';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        <Navigation />
        <HeroSection />
      </div>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <Package className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Browse hundreds of premium frozen food products with detailed specifications and pricing.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <ShoppingCart className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Easy Bulk Orders</h3>
              <p className="text-gray-600">
                Add items to your cart and submit bulk enquiries with custom quantities and requirements.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">Best Pricing</h3>
              <p className="text-gray-600">
                Competitive pricing for bulk orders. Contact us for volume discounts and special offers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg sm:text-xl text-gray-600">Trusted by restaurants, caterers, and food businesses across the region.</p>
        </div>
        <StaggerTestimonials />
      </section>

      {/* Get In Touch Section */}
      <GetInTouch />

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Order?</h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8">
            Browse our complete product catalog and submit your bulk enquiry today.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Start Shopping
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Snowflake className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">FrozenFood</span>
              </div>
              <p className="text-sm">Premium frozen food products for bulk orders.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400">Browse All</a></li>
                <li><a href="#" className="hover:text-blue-400">Categories</a></li>
                <li><a href="#" className="hover:text-blue-400">Bulk Orders</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms</a></li>
                <li><a href="#" className="hover:text-blue-400">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2024 FrozenFood Directory. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
