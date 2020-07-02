import React, { Component, useState } from "react";
import InventoryDataService from "../services/inventory.service";
import AuthService from "../services/auth.service";




const AddInventory = () => {

  const initialInventoryState = {
    id: null,
    title: "",
    description: "", 
    qty:"",
    published: false,
    userId : AuthService.getCurrentUser().id,

  };

  const [inventory , setInventory]  = useState(initialInventoryState);
  const [submitted , setSubmitterd] = useState(false);

  const handleInputChange = event => {
      const {name , value} = event.target;
      setInventory({...inventory, [name] :  value});
  };

  const saveInventory = () => {
    var data = {
      title : inventory.title,
      description : inventory.description,
      qty:inventory.qty,
      userId : AuthService.getCurrentUser().id,
    };

    InventoryDataService.create(data).then(
      response => {
        setInventory({
          id : response.data.id,
          title : response.data.title,
          description : response.data.description,
          qty:response.data.qty,
          published : response.data.published

        });

        setSubmitterd(true);
        console.log(response.data);
      }).catch( e => {
        console.log(e);
      });
  };

  const newInventory = () => {
    setInventory(initialInventoryState);
    setSubmitterd(false);

  };

  return(
    <div className="submit-form">
    {submitted ? (
      <div>
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={newInventory}>
          Add
        </button>
      </div>
    ) : (
      <div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={inventory.title}
            onChange={handleInputChange}
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            value={inventory.description}
            onChange={handleInputChange}
            name="description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="qty">QTY</label>
          <input
            type="text"
            className="form-control"
            id="qty"
            required
            value={inventory.qty}
            onChange={handleInputChange}
            name="qty"
          />
        </div>

        <button onClick={saveInventory} className="btn btn-success">
          Submit
        </button>
      </div>
    )}
  </div>
  );
};

export default AddInventory;