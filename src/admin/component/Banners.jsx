import React, {useEffect, useState} from 'react';
import { FaTrash } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import api from '../../utils/axios.js';
import toast, { Toaster } from 'react-hot-toast';

const Banners = () => {
  const [newBannerFile, setNewBannerFile] = useState(null);
  const [newBannerPreview, setNewBannerPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [currentBanner, setCurrentBanner] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  const storageUrl = import.meta.env.VITE_STORAGE_URL;

  // Fetch current banner
  useEffect(() => {
    const fetchCurrentBanner = async () => {
      setFetchLoading(true);
      try {
        const response = await api.get('/banner');
        if (response.status === 200 && response.data) {
          setCurrentBanner(response.data);
        }
      } catch (err) {
        console.error('Error fetching banner:', err);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchCurrentBanner();
  }, []);

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
    setError(null);
  };

  const validateForm = () => {
    if (!newBannerFile) {
      toast.error('Please select a banner image');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('image', newBannerFile);

    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/admin/banner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.status === 200 || response.status === 201) {
        toast.success('Banner uploaded successfully');

        // Refresh current banner after successful upload
        const bannerResponse = await api.get('/banner');
        if (bannerResponse.status === 200 && bannerResponse.data) {
          setCurrentBanner(bannerResponse.data);
        }

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

  return (
      <div className="flex flex-col h-screen">
        <Toaster position="top-right" />
        {/* Fixed header section */}
        <div className="bg-[#F2EFE7] w-full pb-6 px-6 pt-6 sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 pt-6 mb-6">
            <h2 className="text-2xl font-semibold text-[#333333] mt-[-10px] ml-[-20px]">Banners</h2>
            <span className="text-sm text-gray-500 mt-[-10px] absolute right-8">
            {formattedDateTime} | {getGreeting()}
          </span>
          </div>
        </div>

        {/* Scrollable content section */}
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="mt-6">
            <h3 className="mb-3 px-6 text-lg font-light text-[#333333]">Current Banner</h3>

            {/* Current Banner Display */}
            <div className="px-6 mb-6">
              <div className="relative rounded-lg overflow-hidden w-full max-w-md">
                {fetchLoading ? (
                    <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Loading banner...</p>
                    </div>
                ) : currentBanner ? (
                    <div className="relative">
                      <img
                          src={`${storageUrl}/${currentBanner.image_path}`}
                          alt="Current Banner"
                          className="w-full h-auto rounded-lg"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/hero/home back.webp";
                            toast.error("Failed to load banner image");
                          }}
                      />
                    </div>
                ) : (
                    <div className="relative">
                      <img
                          src="/hero/home back.webp"
                          alt="Default Banner"
                          className="w-full h-auto rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <p className="text-white text-sm">No banner available</p>
                      </div>
                    </div>
                )}
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
      </div>
  );
};

export default Banners;