import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Users, Book as Books, Home } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { toast, Toaster } from 'react-hot-toast';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: userData } = await supabase
        .from('users')
        .select('statut')
        .eq('email', user.email)
        .single();

      if (userData?.statut !== 'admin') {
        toast.error('Access denied. Admin privileges required.');
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Error checking admin status:', error);
      navigate('/');
    }
  };

  if (!isAdmin) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#D4AF37] border-t-transparent"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <div className="bg-[#2A3B4C] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Link to="/" className="flex items-center hover:text-[#D4AF37]">
              <Home className="h-5 w-5 mr-2" />
              Back to Site
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <nav className="space-y-2">
              <Link
                to="/admin/users"
                className="flex items-center px-4 py-2 rounded-lg hover:bg-[#2A3B4C] hover:text-white transition-colors"
              >
                <Users className="h-5 w-5 mr-2" />
                Users
              </Link>
              <Link
                to="/admin/books"
                className="flex items-center px-4 py-2 rounded-lg hover:bg-[#2A3B4C] hover:text-white transition-colors"
              >
                <Books className="h-5 w-5 mr-2" />
                Books
              </Link>
            </nav>
          </div>

          <div className="md:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;