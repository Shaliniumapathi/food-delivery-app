import React from 'react'
import './Cart.css'
import {StoreContext} from '../../Context/StoreContext.jsx';
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'

function Cart() {

  const {cartItems, food_list_api, removeFromCart, getTotalCartAmount, url} = useContext(StoreContext);
  const foodList = food_list_api || [];

  const resolveImage = (image) => {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    if (image.startsWith('/')) return image;
    return `${url}/images/${image}`;
  };
 
  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-tems-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>   
        </div>
        <br/>
        <hr/>
      {foodList.map((item) => {
  if(cartItems[item._id || item.id] && cartItems[item._id || item.id] > 0){
    return(
      <div key={item._id || item.id} className="cart-items-title cart-items-item">
        <img src={resolveImage(item.image)} alt=""/>
        <p>{item.name}</p>
        <p>${item.price}</p>
        <p>{cartItems[item._id || item.id]}</p>
         <p>${item.price*cartItems[item._id || item.id]}</p>
         <p onClick={() => removeFromCart(item._id || item.id)}>X</p>
      </div>
    )
  }
  return null;
})}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
          </div>
           <button onClick={()=>{navigate("/order")}}>Proceed To Checkout</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type='text' placeholder="promo code"/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart