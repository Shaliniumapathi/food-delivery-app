import React, { useContext, useEffect, useState } from 'react';
import './Admin.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { url, token, user } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url + '/api/order/list', { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.data || []);
      } else {
        setOrders([]);
      }
    } catch (err) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.post(url + '/api/order/status', { orderId, status }, { headers: { token } });
      fetchOrders();
    } catch (err) {
      console.error('updateStatus error', err);
    }
  };

  if (!token) return null;

  return (
    <div className='admin'>
      <h1>Admin Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='admin-order-list'>
          {orders.map((order) => (
            <div key={order._id} className='admin-order-card'>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>User:</strong> {order.userId}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Amount:</strong> ${order.amount.toFixed(2)}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Payment:</strong> {order.payment ? 'Paid' : 'Pending'}</p>
              <div className='admin-order-items'>
                {order.items.map((item, idx) => (
                  <div key={idx} className='admin-order-item'>
                    <img src={item.image || ''} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='order-actions'>
                <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
                  <option value='Food Processing'>Food Processing</option>
                  <option value='Order Confirmed'>Order Confirmed</option>
                  <option value='Preparing'>Preparing</option>
                  <option value='Out for Delivery'>Out for Delivery</option>
                  <option value='Delivered'>Delivered</option>
                  <option value='Cancelled'>Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
