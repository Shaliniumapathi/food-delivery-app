import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

function FoodDisplay({category}) {

const {food_list_api, loading, error, url} = useContext(StoreContext)
const foodList = food_list_api || [];

const resolveImage = (image) => {
  if (!image) return '';
  if (image.startsWith('http')) return image;
  if (image.startsWith('/')) return image;
  return `${url}/images/${image}`;
};

  if (loading) return <div className='food-display'>Loading menu...</div>;
  if (error) return <div className='food-display error'>{error}</div>;

  return (
    <div className='food-display' id="food-display">
        <h2>Top Dishes near you</h2>

        <div className="food-display-list">
          {foodList.filter((item) => category === 'All' || item.category === category).map((item) => (
            <FoodItem
              key={item.id || item._id}
              id={item.id || item._id}
              name={item.name}
              price={item.price}
              image={resolveImage(item.image)}
              description={item.description}
            />
          ))}
        </div>

    </div>
  )
}

export default FoodDisplay