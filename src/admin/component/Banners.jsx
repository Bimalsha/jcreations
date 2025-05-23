import React, {useEffect, useState} from 'react';
import { FaTrash } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import api from '../../utils/axios.js';
import toast, { Toaster } from 'react-hot-toast';
import useAuthStore from '../../stores/authStore';

const Banners = () => {
  const { user } = useAuthStore();
  const [newBannerFile, setNewBannerFile] = useState(null);
  const [newBannerPreview, setNewBannerPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size must be less than 2MB');
        return;
      }

      // Check file type
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }

      setNewBannerFile(file);
      setNewBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size must be less than 2MB');
        return;
      }

      // Check file type
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }

      setNewBannerFile(file);
      setNewBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setNewBannerFile(null);
    setNewBannerPreview(null);
    setTitle('');
    setSubtitle('');
    setLink('');
    setError(null);
  };

  const validateForm = () => {
    if (!newBannerFile) {
      toast.error('Please select a banner image');
      return false;
    }

    if (!title.trim()) {
      toast.error('Banner title is required');
      return false;
    }

    if (!subtitle.trim()) {
      toast.error('Banner subtitle is required');
      return false;
    }

    if (!link.trim()) {
      toast.error('Banner link is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('image', newBannerFile);
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('link', link);

    setLoading(true);
    setError(null);

    try {
      const token = user?.token;

      const response = await api.post('/admin/banner', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('Banner uploaded successfully');
        handleCancel();
      } else {
        throw new Error('Failed to upload banner');
      }
    } catch (err) {
      console.error('Error uploading banner:', err);
      const errorMessage = err.response?.data?.message || 'Failed to upload banner';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);
  const formattedDateTime = `${currentDateTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} | ${currentDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}`;

  // Get appropriate greeting based on time of day
  const getGreeting = () => {
    const hour = currentDateTime.getHours();
    if (hour < 12) return 'Good Morning!';
    if (hour < 18) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  return (
      <div>
        <Toaster position="top-right" />
        <div className="bg-[#F2EFE7] w-full pb-6 px-6 pt-6">
          <div className="flex items-center justify-between px-6 pt-6 mb-6">
            <h2 className="text-2xl font-semibold text-[#333333] mt-[-10px] ml-[-20px]">Banners</h2>
            <span className="text-sm text-gray-500 mt-[-10px] absolute right-8">
           {formattedDateTime} | {getGreeting()}
          </span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-3 px-6 text-lg font-light text-[#333333]">Current Banner</h3>

          {/* Current Banner Display */}
          <div className="px-6 mb-6">
            <div className="relative rounded-lg overflow-hidden w-full max-w-md">
              <div className="relative">
                <img
                    src="/hero/home back.webp"
                    alt="Current Banner"
                    className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          <h3 className="mb-3 px-6 text-lg font-light text-[#333333]">Upload New Banner</h3>

          {/* Upload New Banner Section */}
          <div className="px-6 mb-6">
            <div
                className={`border-2 border-dashed ${newBannerPreview ? 'border-green-300' : 'border-gray-300'} rounded-lg p-8 flex flex-col items-center justify-center w-full max-w-md ${newBannerPreview ? 'h-auto' : 'h-36'}`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
              {newBannerPreview ? (
                  <div className="w-full relative">
                    <img
                        src={newBannerPreview}
                        alt="New Banner Preview"
                        className="w-full h-auto rounded-lg"
                    />
                    <button
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                        onClick={() => {
                          setNewBannerFile(null);
                          setNewBannerPreview(null);
                        }}
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
              ) : (
                  <>
                    <input
                        type="file"
                        id="banner-upload"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <label htmlFor="banner-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <FiUpload size={42} className="text-gray-400 mb-2" />
                        <p className="text-sm text-gray-700 font-medium">Drag and drop your new banner</p>
                        <p className="text-xs text-gray-500 mt-1">Recommended size: 1200x400px (max 2MB)</p>
                      </div>
                    </label>
                  </>
              )}
            </div>
          </div>

          {/* Banner Details Form */}
          <div className="px-6 mb-6 max-w-md">
            <div className="space-y-4">
              <div>
                <label htmlFor="banner-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Title
                </label>
                <input
                    type="text"
                    id="banner-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Enter banner title"
                />
              </div>

              <div>
                <label htmlFor="banner-subtitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Subtitle
                </label>
                <input
                    type="text"
                    id="banner-subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="Enter banner subtitle"
                />
              </div>

              <div>
                <label htmlFor="banner-link" className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Link URL
                </label>
                <input
                    type="text"
                    id="banner-link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    placeholder="https://example.com/page"
                />
              </div>
            </div>
          </div>

          {/* Error message */}
          {error && (
              <div className="px-6 mb-4">
                <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
                  {error}
                </div>
              </div>
          )}

          {/* Action Buttons */}
          <div className="px-6 mt-4 flex">
            <button
                className="border border-gray-300 rounded-lg px-6 py-2 mr-3 font-medium hover:bg-gray-50 transition-colors"
                onClick={handleCancel}
                disabled={loading}
            >
              Cancel
            </button>
            <button
                className="bg-black text-white rounded-lg px-8 py-2 font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={loading}
            >
              {loading ? 'Uploading...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
  );
};

export default Banners;