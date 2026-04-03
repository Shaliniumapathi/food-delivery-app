import React, { useEffect, useState } from "react";
import "./Order.css";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  // Fetch orders
  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:4000/api/order/list");
    if (res.data.success) {
      setOrders(res.data.data);
    }
  };

  // Update order status
  const updateStatus = async (id, status) => {
    await axios.post("http://localhost:4000/api/order/status", {
      id,
      status,
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders">
      <h2>Orders Management</h2>

      <div className="orders-container">
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            
            <div className="order-top">
              <p><b>Order ID:</b> {order._id}</p>
              <p><b>Status:</b> {order.status}</p>
            </div>

            <div className="order-items">
              {order.items.map((item, i) => (
                <p key={i}>
                  {item.name} x {item.quantity}
                </p>
              ))}
            </div>

            <div className="order-user">
              <p><b>Name:</b> {order.address.name}</p>
              <p><b>Phone:</b> {order.address.phone}</p>
              <p><b>Address:</b> {order.address.street}</p>
            </div>

            <div className="order-bottom">
              <p><b>Total:</b> ₹{order.amount}</p>

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;