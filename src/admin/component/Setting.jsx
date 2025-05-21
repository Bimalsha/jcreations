import React, { useState, useEffect } from 'react';
import api from '../../utils/axios';

function Setting() {
    const [deliveryLocations, setDeliveryLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        city: '',
        shipping_charge: 0,
        is_active: true
    });
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Fetch all delivery locations
    const fetchDeliveryLocations = async () => {
        setLoading(true);
        try {
            const response = await api.get('/locations');
            setDeliveryLocations(response.data.locations || []);
            setError(null);
        } catch (err) {
            setError('Failed to fetch delivery locations');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Create new delivery location
    const createDeliveryLocation = async () => {
        setLoading(true);
        try {
            await api.post('/admin/locations', formData);
            fetchDeliveryLocations();
            resetForm();
            showSuccessMessage('Location added successfully');
        } catch (err) {
            setError('Failed to create delivery location');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Update delivery location
    const updateDeliveryLocation = async () => {
        setLoading(true);
        try {
            await api.put(`/admin/locations/${editId}`, formData);
            fetchDeliveryLocations();
            closeModal();
            showSuccessMessage('Location updated successfully');
        } catch (err) {
            setError('Failed to update delivery location');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Delete delivery location
    const deleteDeliveryLocation = async (id) => {
        if (window.confirm('Are you sure you want to delete this location?')) {
            setLoading(true);
            try {
                await api.delete(`/admin/locations/${id}`);
                fetchDeliveryLocations();
                showSuccessMessage('Location deleted successfully');
            } catch (err) {
                setError('Failed to delete delivery location');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
    };

    // Show success message with auto-dismiss
    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : 
                   name === 'shipping_charge' ? parseFloat(value) : value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            updateDeliveryLocation();
        } else {
            createDeliveryLocation();
        }
    };

    // Set up form for editing and open modal
    const handleEdit = (location) => {
        setFormData({
            city: location.city,
            shipping_charge: location.shipping_charge,
            is_active: location.is_active
        });
        setEditId(location.id);
        setShowModal(true);
    };

    // Close modal and reset form
    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            city: '',
            shipping_charge: 0,
            is_active: true
        });
        setEditId(null);
    };

    // Load delivery locations on component mount
    useEffect(() => {
        fetchDeliveryLocations();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4 h-screen overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
            
            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-sm">
                    <p className="font-medium">{successMessage}</p>
                </div>
            )}
            
            {/* Error Message */}
            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-sm">
                    <p className="font-medium">{error}</p>
                </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md  ">
                <div className="p-6 border-b border-gray-200 ">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Delivery Locations</h3>
                    
                    {/* Add Location Form */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200 ">
                        <h4 className="text-lg font-medium text-gray-700 mb-4">
                            Add New Location
                        </h4>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City
                                    </label>
                                    <input 
                                        type="text" 
                                        name="city" 
                                        value={formData.city} 
                                        onChange={handleInputChange} 
                                        required 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter city name"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Shipping Charge (Rs)
                                    </label>
                                    <input 
                                        type="number" 
                                        name="shipping_charge" 
                                        value={formData.shipping_charge} 
                                        onChange={handleInputChange} 
                                        step="0.01"
                                        min="0"
                                        required 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <input 
                                    id="is_active"
                                    type="checkbox" 
                                    name="is_active" 
                                    checked={formData.is_active} 
                                    onChange={handleInputChange} 
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                                    Active
                                </label>
                            </div>
                            
                            <div className="flex items-center space-x-3 pt-2">
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                                >
                                    {loading ? 'Processing...' : 'Add Location'}
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    {/* Locations Table */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-medium text-gray-700">All Delivery Locations</h4>
                            
                            {loading && !editId && (
                                <span className="text-sm text-gray-500">Loading...</span>
                            )}
                        </div>
                        
                        {deliveryLocations.length > 0 ? (
                            <div className="overflow-x-auto max-h-[500px] overflow-y-auto border border-gray-200 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 ">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                City
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Shipping Charge
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Created
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Updated
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {deliveryLocations.map((location) => (
                                            <tr key={location.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{location.city}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">Rs.{parseFloat(location.shipping_charge || 0).toFixed(2)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {location.is_active ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                            Inactive
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(location.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(location.updated_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEdit(location)}
                                                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
                                                        >
                                                            Edit
                                                        </button>
                                                        
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-8 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                                <p>No delivery locations found</p>
                                <p className="text-sm mt-2">Add your first location using the form above</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Edit Location Modal */}
            {showModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        {/* Background overlay */}
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        {/* Modal panel */}
                        <div 
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog" 
                            aria-modal="true" 
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-headline">
                                            Edit Location
                                        </h3>
                                        
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        City
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        name="city" 
                                                        value={formData.city} 
                                                        onChange={handleInputChange} 
                                                        required 
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Shipping Charge (Rs)
                                                    </label>
                                                    <input 
                                                        type="number" 
                                                        name="shipping_charge" 
                                                        value={formData.shipping_charge} 
                                                        onChange={handleInputChange} 
                                                        step="0.01"
                                                        min="0"
                                                        required 
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center">
                                                <input 
                                                    id="modal_is_active"
                                                    type="checkbox" 
                                                    name="is_active" 
                                                    checked={formData.is_active} 
                                                    onChange={handleInputChange} 
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="modal_is_active" className="ml-2 block text-sm text-gray-700">
                                                    Active
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button 
                                    type="button" 
                                    onClick={updateDeliveryLocation}
                                    disabled={loading}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                                >
                                    {loading ? 'Updating...' : 'Update Location'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={closeModal}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Setting;
