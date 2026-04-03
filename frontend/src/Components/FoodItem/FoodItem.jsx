import React from 'react'
import "./FoodItem.css"
import { useContext } from 'react'
import { Plus } from 'lucide-react'
import { StoreContext } from '../../Context/StoreContext'

function FoodItem({id,name,price,image,description}){

 const { cartItems = {}, addToCart, removeFromCart } = useContext(StoreContext);
 const itemQty = cartItems?.[id] || 0;

  return (
    <div className='food-item'>

      <div className='food-item-container'>

        <img className='food-item-img' src={image} alt="food-image"/>

        {!itemQty ? (
          <button 
            className="add-btn"
            onClick={()=>addToCart(id)}
          >
            <Plus size={18}/>
          </button>
        ) : (
          <div className="counter">
            <button onClick={()=>removeFromCart(id)}>-</button>
            <p>{itemQty}</p>
            <button onClick={()=>addToCart(id)}>+</button>
          </div>
        )}

      </div>

      <div className='food-item-info'>

        <div className='food-item-name-rating'>
          <h3>{name}</h3>
        </div>

        <p className='food-item-description'>{description}</p>
        <p className='food-item-price'>${price}</p>

      </div>

    </div>
  )
}

export default FoodItem