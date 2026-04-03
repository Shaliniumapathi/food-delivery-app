import React from 'react'
import './Sidebar.css'
import { CircleFadingPlus, FolderCheck, Import} from 'lucide-react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <CircleFadingPlus />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <FolderCheck />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/order" className="sidebar-option">
         <Import />
          <p>Orders</p>
        </NavLink>

      </div>
    </div>
  )
}

export default Sidebar
