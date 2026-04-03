import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import {StoreContext} from '../../Context/StoreContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {
  const {getTotalCartAmount, token, food_list_api, cartItems, url} = useContext(StoreContext)
  const foodList = food_list_api.length ? food_list_api : [];
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [name]: value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    foodList.forEach((item) => {
      const itemId = item.id || item._id;
      if (itemId && cartItems[itemId] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[itemId],
        });
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  }

  const navigate = useNavigate();

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
      <div className="multi-fields">
        <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="FirstName" required/>
        <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder="LastName" required/>
      </div>
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email Address" required/>
          <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder="Street" required/>
      <div className="multi-fields">
        <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder="City" required/>
        <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder="State" required/>
      </div>
      <div className="multi-fields">
        <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Pin Code" required/>
        <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder="Country" required/>
      </div>
      <div className="multi-fields">
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="number" placeholder="phone" required/> 
      </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount()===0?0:2}</p>
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>
           <button type='submit'>Proceed To payment</button>
        </div>
          
        </div>
    </form>
  )
}

export default PlaceOrder