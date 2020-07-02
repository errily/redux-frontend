import React, { Component, useState, useEffect } from "react";
import InventoryDataService from "../services/inventory.service";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";


const InventoryList = () => {
  const [inventorys , setInventorys] = useState([]);
  const [currentInventory, setCurrentInventory] = useState(null);
  const [currentIndex, setCurrentIndex] =  useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveInventorys();
  }, []);

  const onChangeSearchTitle = e =>{
      const searchTitle = e.target.value;
      setSearchTitle(searchTitle);
  };

  const retrieveInventorys = () => {
    InventoryDataService.getUser(AuthService.getCurrentUser().id)
    .then( response => {
      setInventorys(response.data);
      console.log(response.data);
    }).catch( e=> {
      console.log(e);
    });
 
  };

  const refreshList = () => {
    retrieveInventorys();
    setCurrentInventory(null);
    setCurrentIndex(-1);
  };


  const setActiveInventory = (inventory, index) => {
    setCurrentIndex(index);
    setCurrentInventory(inventory);
  };

  const removeAllInventory = () => {
    InventoryDataService.deleteUser(AuthService.getCurrentUser().id)
    .then(response => {
      console.log(response.data);
      refreshList();
    })
    .catch(e => {
      console.log(e);
    });
  };

  const findByTitle = () => {
    InventoryDataService.findByTitle(searchTitle)
    .then( response => {
      setInventorys(response.data);
      console.log(response.data);
    })
    .catch( e => {
      console.log(e);
    });
 
  };



  return ( 
<div className="list row">
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByTitle}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <h4>Inventorys List</h4>

      <ul className="list-group">
        {inventorys &&
          inventorys.map((arc, index) => (
            <li
              className={
                "list-group-item " +
                (index === currentIndex ? "active" : "")
              }
              onClick={() => setActiveInventory(arc, index)}
              key={index}
            >
              {arc.title}
            </li>
          ))}
      </ul>

      <button className="m-3 btn btn-sm btn-danger" onClick={removeAllInventory}>
        Remove All
      </button>
    </div>
    <div className="col-md-6">
      {currentInventory ? (
        <div>
          <h4>Inventory</h4>
          <div>
            <label>
              <strong>Title:</strong>
            </label>{" "}
            {currentInventory.title}
          </div>
          <div>
            <label>
              <strong>Description:</strong>
            </label>{" "}
            {currentInventory.description}
          </div>
          <div>
            <label>
              <strong>Qty:</strong>
            </label>{" "}
            {currentInventory.qty}
          </div>
          <div>
            <label>
              <strong>Status:</strong>
            </label>{" "}
            {currentInventory.published ? "Published" : "Pending"}
          </div>

          <Link
            to={"/inventory/" + currentInventory.id}
            className="badge badge-warning"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Inventory...</p>
        </div>
      )}
    </div>
</div>
);

};


export default InventoryList;