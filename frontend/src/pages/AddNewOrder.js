import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddOrder = () => {
  const navigate = useNavigate()
  const toDateInputValue = (date) => date.toISOString().slice(0, 10)

  const today = toDateInputValue(new Date())

  const [form, setForm] = useState({
    customerName: '',
    productType: '',
    quantity: 1,
    price: 0,
    status: 'Pending',
    orderDate: today,
    mobile: '',
  address: '',
  city: '',
  })

  useEffect(() => {
    console.log('Form state:', form)
  }, [form])

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    try {
      await axios.post('https://photo-lab.onrender.com/api/orders', { ...form, userId }, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      })
      alert('Order added!')
      navigate('/orders')
    } catch (err) {
      console.error(err)
      alert('Failed to add order')
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 ">
      <h1 className="text-3xl font-bold mb-6 text-white-800">Add New Order</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Customer Name */}
        <div style={{margin:"10px"}}>
          <label className="block text-sm font-medium text-white-700 mb-1">
            Customer Name
          </label>
          <input
            name="customerName"
            type="text"
            placeholder="Enter customer name"
            value={form.customerName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          />
        </div>

        {/* Product Type */}
        <div style={{ margin: "10px" }}>
          <label className="block text-sm font-medium text-white-700 mb-1">
            Product Type
          </label>
          <select
            name="productType"
            value={form.productType}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          >
            <option value="" disabled>
              Select product type
            </option>
            <option value="photo frames">Photo Frames</option>
            <option value="albums">Albums</option>
            <option value="photo">Photo</option>
            <option value="one side printing">One Side Printing</option>
          </select>
        </div>

        {/* Quantity */}
        <div style={{margin:"10px"}}>
          <label className="block text-sm font-medium text-white-700 mb-1">
            Quantity
          </label>
          <input
            name="quantity"
            type="number"
            min={1}
            value={form.quantity}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          />
        </div>

        {/* Price */}
        <div style={{margin:"10px"}}>
          <label className="block text-sm font-medium text-white-700 mb-1">
            Price
          </label>
          <input
            name="price"
            type="number"
            min={0}
            value={form.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          />
        </div>

        {/* Status */}
        <div style={{margin:"10px"}}>
          <label className="block text-sm font-medium text-white-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {/* Order Date */}
        <div style={{margin:"10px"}}>
          <label className="block text-sm font-medium text-white-700 mb-1">
            Order Date
          </label>
          <input
            name="orderDate"
            type="date"
            value={form.orderDate}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
          />
        </div>
        {/* Mobile */}
<div style={{ margin: "10px" }}>
  <label className="block text-sm font-medium text-white-700 mb-1">
    Mobile
  </label>
  <input
    name="mobile"
    type="text"
    placeholder="Enter mobile number"
    value={form.mobile}
    onChange={handleChange}
    required
    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
  />
</div>

{/* Address */}
<div style={{ margin: "10px" }}>
  <label className="block text-sm font-medium text-white-700 mb-1">
    Address
  </label>
  <input
    name="address"
    placeholder="Enter address"
    value={form.address}
    onChange={handleChange}
    required
    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
  ></input>
</div>

{/* City */}
<div style={{ margin: "10px" }}>
  <label className="block text-sm font-medium text-white-700 mb-1">
    City
  </label>
  <input
    name="city"
    type="text"
    placeholder="Enter city"
    value={form.city}
    onChange={handleChange}
    required
    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
  />
</div>

        {/* Submit Button */}
        <div className="md:col-span-2 ml-2">
          <button
            type="submit"
            className=" py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            Add Order
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddOrder
