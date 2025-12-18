import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Find everything you love — for less.</h2>
            <p className="text-lg text-slate-600 mb-6">Shop trending products, trusted brands, and local favorites. Fast delivery, easy returns.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="inline-flex items-center bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-md shadow">Shop Now</Link>
              <Link to="/register" className="inline-flex items-center border border-slate-200 px-6 py-3 rounded-md text-slate-700 hover:bg-slate-50">Create Account</Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <img src="/hero-sample.png" alt="hero" className="w-full h-64 object-cover rounded-lg" />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Why shop with us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="font-semibold text-lg mb-2">Great prices</h4>
              <p className="text-slate-600">We negotiate with suppliers so you get excellent deals every day.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="font-semibold text-lg mb-2">Secure checkout</h4>
              <p className="text-slate-600">Industry-standard security for your payments and personal data.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h4 className="font-semibold text-lg mb-2">Fast delivery</h4>
              <p className="text-slate-600">We ship quickly and track every order end-to-end.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

