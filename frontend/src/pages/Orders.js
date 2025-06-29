import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Plus, Edit, Save, X } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [editingRow, setEditingRow] = useState(null); 
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const fetchOrders = async () => {
    const userId = localStorage.getItem('userId');
   
    if (!userId) return alert('Please login first');
    try {
    const res = await axios.get(`https://photo-lab.onrender.com/api/orders/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      }
    });
      setOrders(res.data);
      setFilteredOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      await axios.delete(`https://photo-lab.onrender.com/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      setFilteredOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  };

  const handleFilterChange = (e) => {
    const status = e.target.value;
    setFilterStatus(status);
    if (status === 'All') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === status));
    }
  };

  const startEditing = (orderId) => {
    setEditingRow(orderId);
  };

  const saveChanges = async (orderId) => {
    const updatedOrder = filteredOrders.find((order) => order._id === orderId);
    try {
      await axios.put(`https://photo-lab.onrender.com/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      },
       updatedOrder); 
      setEditingRow(null); 
      alert('Order updated successfully');
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  const handleInputChange = (e, orderId, field) => {
    const updatedOrders = filteredOrders.map((order) => {
      if (order._id === orderId) {
        return { ...order, [field]: e.target.value };
      }
      return order;
    });
    setFilteredOrders(updatedOrders);
  };
  const cancelChanges = () => {
    setEditingRow(null); // Exit editing mode
  };  
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h1 className="text-2xl font-bold">Order History</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="filter" className="text-sm font-medium">
            Filter by Status:
          </label>
          <select
            id="filter"
            value={filterStatus}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <button
          onClick={() => navigate('/new-order')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          <Plus size={18} /> Add New Order
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Ordered</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border-t border-gray-700 ">
                  <td className="px-4 py-2">
                    {editingRow === order._id ? (
                      <input
                        type="text"
                        value={order.customerName}
                        onChange={(e) => handleInputChange(e, order._id, 'customerName')}
                        className="p-2 border border-gray-300 rounded-lg text-gray-900"
                      />
                    ) : (
                      order.customerName
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRow === order._id ? (
                      <input
                        type="text"
                        value={order.productType}
                        onChange={(e) => handleInputChange(e, order._id, 'productType')}
                        className="p-2 border border-gray-300 rounded-lg text-gray-900"
                      />
                    ) : (
                      order.productType
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRow === order._id ? (
                      <input
                        type="number"
                        value={order.quantity}
                        onChange={(e) => handleInputChange(e, order._id, 'quantity')}
                        className="p-2 border border-gray-300 rounded-lg text-gray-900"
                      />
                    ) : (
                      order.quantity
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRow === order._id ? (
                      <input
                        type="number"
                        value={order.price}
                        onChange={(e) => handleInputChange(e, order._id, 'price')}
                        className="p-2 border border-gray-300 rounded-lg text-gray-900"
                      />
                    ) : (
                      `₹${order.price}`
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingRow === order._id ? (
                      <select
                        value={order.status}
                        onChange={(e) => handleInputChange(e, order._id, 'status')}
                        className="p-2 border border-gray-300 rounded-lg text-gray-900"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    ) : (
                      order.status
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-center flex gap-2  justify-center">
                    {editingRow === order._id ? (
                      <>
                      <button
                        onClick={() => saveChanges(order._id)}
                        className="text-green-400 hover:text-green-600"
                        title="Save Changes"
                      >
                        <Save size={18} />
                      </button>
                      <button
                        onClick={() => cancelChanges()}
                        className="text-gray-400 hover:text-gray-600"
                        title="Cancel Changes"
                      >
                        <X size={18} />
                      </button>
                    </>
                    ) : (
                      <>
                      <button
                        onClick={() => startEditing(order._id)}
                        className="text-blue-400 hover:text-blue-600"
                        title="Edit Order"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="text-red-400 hover:text-red-600"
                        title="Delete Order"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                    )}
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-4 text-center text-gray-400" colSpan="8">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;