'use client';
import { useEffect } from 'react';
import { X, Mail, User, Phone, MapPin, Calendar, Star } from 'lucide-react';

export default function UserModal({ user, onClose }) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 w-full max-w-md transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 pb-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Profile Header */}
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-24 h-24 rounded-3xl mx-auto shadow-xl ring-4 ring-white dark:ring-gray-700"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              User Profile
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
              <div className="w-8 h-8 bg-blue-500 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-300">4.8</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">Rating</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl">
              <div className="w-8 h-8 bg-green-500 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-semibold text-green-700 dark:text-green-300">ID</p>
              <p className="text-xs text-green-600 dark:text-green-400">{user.id}</p>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
              <div className="w-8 h-8 bg-purple-500 rounded-xl mx-auto mb-2 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">Active</p>
              <p className="text-xs text-purple-600 dark:text-purple-400">Status</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Email Address</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{user.email}</p>
              </div>
            </div>

            {/* Phone (Mock data) */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Phone Number</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>

            {/* Location (Mock data) */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Location</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02]">
              <Mail className="w-4 h-4" />
              <span>Send Message</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-[1.02]">
              <User className="w-4 h-4" />
              <span>View Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}