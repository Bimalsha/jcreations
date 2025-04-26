import React from 'react';

const DeliveryInfo = ({ deliveryInfo, setDeliveryInfo }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg border-1 border-gray-300 p-6 mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Delivery Information</h3>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                id="customer_name" 
                name="customer_name" 
                value={deliveryInfo.customer_name || ''}
                onChange={handleChange}
                placeholder="Enter your name" 
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-900 focus:border-indigo-900"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Location</label>
              
              {/* Dropdown for location selection */}
              <select 
                id="city" 
                name="city" 
                value={deliveryInfo.city || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-900 focus:border-indigo-900"
              >
                <option value="">Select</option>
                <option value="city1">City 1</option>
                <option value="city2">City 2</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="deliveryDateTime" className="block text-sm font-medium text-gray-700">Date & Time for Delivery</label>
              <input 
                type="datetime-local" 
                id="deliveryDateTime" 
                name="deliveryDateTime" 
                value={deliveryInfo.deliveryDateTime || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-900 focus:border-indigo-900"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input 
                type="text" 
                id="contact_number" 
                name="contact_number" 
                value={deliveryInfo.contact_number || ''}
                onChange={handleChange}
                placeholder="Enter your contact number" 
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-900 focus:border-indigo-900"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                value={deliveryInfo.address || ''}
                onChange={handleChange}
                placeholder="Enter your address" 
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-900 focus:border-indigo-900"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeliveryInfo;