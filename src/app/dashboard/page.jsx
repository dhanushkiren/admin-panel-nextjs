'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import UserModal from '../../components/UserModal';
import { fetchUsers } from '../../features/userSlice';
import { getToken, removeToken } from '../../lib/auth';
import { logout } from '../../features/authSlice';
import { 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Mail,
  Eye
} from 'lucide-react';

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { list: users, loading, error } = useSelector(state => state.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/');
    } else {
      dispatch(fetchUsers(page));
      const expiryTimeout = setTimeout(() => {
        removeToken();
        dispatch(logout());
        router.push('/');
        alert('Session expired. Please log in again.');
      }, 1000 * 60 * 5);
      setAuthChecked(true);
      return () => clearTimeout(expiryTimeout);
    }
  }, [dispatch, router, page]);
   
  // Filter users based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [users, searchTerm]);

  const UserCard = ({ user, onClick }) => (
    <div
      onClick={() => onClick(user)}
      className="group cursor-pointer bg-white dark:bg-gray-800 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 transform hover:scale-[1.02] transition-all duration-300"
    >
      <div className="relative">
        <img 
          src={user.avatar} 
          alt={`${user.first_name} ${user.last_name}`}
          className="w-20 h-20 rounded-2xl mx-auto mb-4 ring-4 ring-white dark:ring-gray-700 shadow-lg group-hover:ring-indigo-200 dark:group-hover:ring-indigo-800 transition-all duration-300" 
        />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
      </div>
      <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-1">
        {user.first_name} {user.last_name}
      </h3>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center justify-center space-x-1">
        <Mail className="w-3 h-3" />
        <span>{user.email}</span>
      </p>
      <div className="flex justify-center">
        <button className="flex items-center space-x-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Eye className="w-3 h-3" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );

  const UserListItem = ({ user, onClick }) => (
    <div
      onClick={() => onClick(user)}
      className="group cursor-pointer bg-white dark:bg-gray-800 backdrop-blur-sm p-4 rounded-xl shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt={`${user.first_name} ${user.last_name}`}
            className="w-12 h-12 rounded-xl ring-2 ring-white dark:ring-gray-700 shadow-md" 
          />
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate flex items-center space-x-1">
            <Mail className="w-3 h-3" />
            <span>{user.email}</span>
          </p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
    </div>
  );

  // Avoid rendering until auth is confirmed
  if (!authChecked) return <div className="min-h-screen bg-gray-50 dark:bg-gray-900"></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-xl">
              <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              User Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and view all users in your organization
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-md'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-400 shadow-md'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Users</p>
                  <p className="text-2xl font-bold">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Filtered Results</p>
                  <p className="text-2xl font-bold">{filteredUsers.length}</p>
                </div>
                <Filter className="w-8 h-8 text-green-200" />
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Current Page</p>
                  <p className="text-2xl font-bold">{page}</p>
                </div>
                <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">{page}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-800 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading users...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <span className="text-red-600 dark:text-red-400 text-xl">⚠</span>
              </div>
              <div>
                <h3 className="text-red-800 dark:text-red-200 font-semibold">Error Loading Users</h3>
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredUsers.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm ? 'No users found' : 'No users available'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm 
                ? `No users match "${searchTerm}". Try adjusting your search.`
                : 'There are no users to display at the moment.'
              }
            </p>
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-gray-900 dark:text-white">Previous</span>
            </button>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Users Grid/List */}
        {!loading && filteredUsers.length > 0 && (
          <div className="mb-8">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
                {filteredUsers.map(user => (
                  <UserCard key={user.id} user={user} onClick={setSelectedUser} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredUsers.map(user => (
                  <UserListItem key={user.id} user={user} onClick={setSelectedUser} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredUsers.length > 0 && (
          <div className="flex items-center justify-center space-x-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-gray-900 dark:text-white">Previous</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <span className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold shadow-md">
                {page}
              </span>
            </div>
            
            <button
              onClick={() => setPage(p => p + 1)}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <span className="text-gray-900 dark:text-white">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* User Modal */}
        {selectedUser && (
          <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
        )}
      </div>
    </div>
  );
}