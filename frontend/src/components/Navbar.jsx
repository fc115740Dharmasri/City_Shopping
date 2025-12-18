import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-md bg-accent-600 flex items-center justify-center text-white font-bold">SS</div>
            <div>
              <h1 className="text-lg font-bold text-slate-800">City Shopping</h1>
              <p className="text-xs text-slate-500">Shop Here!!, live well</p>
            </div>
          </Link>

          <div className="flex-1 mx-6 hidden md:block">
            <div className="relative">
              <input
                aria-label="Search"
                className="w-full rounded-lg border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
                placeholder="Search products, categories..."
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-500 text-white px-3 py-1 rounded-md">Search</button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-slate-700 hover:text-slate-900">Products</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-slate-700 hover:text-slate-900">Dashboard</Link>
                <button onClick={handleLogout} className="bg-accent-500 hover:bg-accent-600 text-white px-3 py-1.5 rounded-md">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-700 hover:text-slate-900">Login</Link>
                <Link to="/register" className="bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5 rounded-md">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

