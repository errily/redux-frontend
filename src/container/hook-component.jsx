
import React, { Component ,useState, useEffect } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import {GlobalConsumer} from "../context/context";


const Hooks = (props) => {
    const [count , setCount] =  useState(0);
    

    useEffect(() => {
        document.title = `Title Change: ${count}`
        return () => {
            document.title = `React App`
        }
    });
    
    return(
       
                        <div className="container">
                            {console.log(props)}
                                  <p>Nilai saya saat ini adalah : {props.state.globalcounter} </p>
                            <button className="btn btn-primary" onClick={()=> props.dispatch({type: "ADD_COUNTER"})}>Tambah</button>
			                <button className="btn btn-primary" onClick={()=> props.dispatch({type: "SUB_COUNTER"})}>Kurang</button>
                         </div>
                
    );
}


export default GlobalConsumer(Hooks)

