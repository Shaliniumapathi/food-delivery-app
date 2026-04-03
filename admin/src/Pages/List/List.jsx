import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

function List() {
  
  const [list, setList] = useState([]);

  // fetch data
  const fetchList = async () => {
    const res = await axios.get("http://localhost:4000/api/food/list");
    if (res.data.success) {
      setList(res.data.data);
    }
    else{
      toast.error("Error");
    }
  };

  // delete item
  const removeFood = async (id) => {
    await axios.post("http://localhost:4000/api/food/remove", { id });
    fetchList();
    toast.success("Food Removed");
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add">
      <p>All Foods List</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img
                src={`http://localhost:4000/images/${item.image}`}
                alt=""
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                ❌
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;