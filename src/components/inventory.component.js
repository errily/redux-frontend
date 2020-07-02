import React, { Component, useEffect, useState } from "react";
import InventoryDataService from "../services/inventory.service";

const Inventory = props => {
 const initialInventoryState = {
    id :  null,
    title : "",
    description : "",
    qty:"",
    published :  false
 } ;

 const [currentInventory, setCurrentArtilce] = useState(initialInventoryState);
 const [message, setMessage] = useState("");

 const getInventory = id => {
  InventoryDataService.get(id).then(
    response => {
      setCurrentArtilce(response.data);
      console.log(response.data);
    }).catch(
      e => {
        console.log(e);
      }
    ); 
; }


useEffect(()=>{
    getInventory(props.match.params.id);
}, [props.match.params.id]);

const handleInputChange =  event => {
  const {name , value} =  event.target;
  setCurrentArtilce({...currentInventory, [name] : value});
};

const updatePublished = status => {
  var data = {
     id: currentInventory.id,
      title: currentInventory.title,
      description: currentInventory.description,
      qty: currentInventory.qty,
      published: status
  };

  InventoryDataService.update(currentInventory.id, data)
  .then(response => {
    setCurrentArtilce({...currentInventory,published:status});
    console.log(response.data);
  })
  .catch( e => {
    console.log(e);
  });
}

const updateInventory = () => {
  InventoryDataService.update(currentInventory.id, currentInventory)
  .then(response => {
    console.log(response.data);
    setMessage("The inventory was updated successfully!");
  })
  .catch(e => {
    console.log(e);
  });
};

const deleteInventory= () => {
  InventoryDataService.delete(currentInventory.id)
  .then( response => {
    console.log(response.data);
    props.history.push("/inventory");
  })
  .catch( e => {
    console.log(e);
  });
};

return(
  <div>
  {currentInventory ? (
    <div className="edit-form">
      <h4>Inventory</h4>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={currentInventory.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={currentInventory.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="qty">QTY</label>
          <input
            type="text"
            className="form-control"
            id="qty"
            value={currentInventory.qty}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>
            <strong>Status:</strong>
          </label>
          {currentInventory.published ? "Published" : "Pending"}
        </div>
      </form>

      {currentInventory.published ? (
        <button
          className="badge badge-primary mr-2"
          onClick={() => updatePublished(false)}
        >
          UnPublish
        </button>
      ) : (
        <button
          className="badge badge-primary mr-2"
          onClick={() => updatePublished(true)}
        >
          Publish
        </button>
      )}

      <button
        className="badge badge-danger mr-2"
        onClick={deleteInventory}
      >
        Delete
      </button>

      <button
        type="submit"
        className="badge badge-success"
        onClick={updateInventory}
      >
        Update
      </button>
      <p>{message}</p>
    </div>
  ) : (
    <div>
      <br />
      <p>Please click on a Inventory...</p>
    </div>
  )}
</div>
);
  }
export default Inventory;