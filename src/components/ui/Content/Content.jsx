
import React, { useEffect } from 'react'
import { useState } from 'react';

export const Content = () => {

  const [characters,SetCharacters] = useState([])

  const initialApiURL = "https://rickandmortyapi.com/api/character";

  const [url,SetUrl] = useState(initialApiURL)

  const fetchData = async (api) =>{
    fetch(api)
      .then(response => response.json())
      
      .then(data=> {if(data.results)
        SetCharacters(data.results)
      })
      .catch(error=>{
        console.log("SE EJECUTA CATCH xdxd")
        console.log(error)
        SetCharacters([])
      })
      console.log("link:"+api);

  }

  useEffect(()=>{
    fetchData(url);
    console.log("useEffect on");
  },[url])

  const HandleSearchName = (event) =>  {
    if (event.target.value === ""){
      SetUrl(initialApiURL)
    }
    else{
      SetUrl(initialApiURL+"?name="+event.target.value)
    }
  }
  return (
    <div>
      <div className="searchContainer">
            <h1>Search a character!</h1>
            <input id="SearchBar" type="text" placeholder="Example: Rick" onChange={HandleSearchName} ></input>
      </div>

      <div id="CardSection">

        {characters.map((item,index)=>(
          <div key={index} className="card">
          <div className="div-img">
            <img key={item.index} className="img-card" src={item.image}  alt= "img card"></img>
          </div>
          <div className="txt-content">
            <h2>{item.name}</h2>
            <p>Gender: {item.gender}</p>
            <p>Location: {item.location.name}</p>
            <p>Origin: {item.origin.name}</p>
	          <p>Status: {item.status}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}
