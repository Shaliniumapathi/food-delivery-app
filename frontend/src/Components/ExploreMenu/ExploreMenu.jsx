import React from 'react'
import './ExploreMenu.css'
import menuItems from '../../data/menu'

function ExploreMenu({category, setcategory}) {

  const handleClick = (menuName) => {
    if(category === menuName){
      setcategory("All")   // show all items
    } else {
      setcategory(menuName)
    }
  }

  return (
    <div className='exploremenu' id='explore-menu'>
        <h1>Explore Our Menu</h1>

        <div className='explore-menu-list'>
          {menuItems.map((item,index)=>(
            <div
              key={index}
              onClick={()=>handleClick(item.menu_name)}
              className={`explore-menu-list-item ${category === item.menu_name ? "active" : ""}`}
            >
              <img src={item.menu_image} alt={item.menu_name}/>
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>

        <hr/>
    </div>
  )
}

export default ExploreMenu