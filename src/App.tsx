import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';


function App() {
  const [checkApiPkemon, setCheckApiPkemon] = useState(false)
  const [apiPokemon, setApiPokemon] = useState("")
  const [Pokemon, SetPokemon] = useState({
    id: "",
    name: "",
    img: "",
    type: "",
    height: "",
    weight: "",
  })
  const search = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${apiPokemon}`).then((Response) => {
      SetPokemon({
        id: Response.data.id,
        name: apiPokemon,
        img: Response.data.sprites.front_default,
        type: Response.data.types[0].type.name,
        height: Response.data.height,
        weight: Response.data.weight,
      })
      setCheckApiPkemon(true)
    })

  }
  return (
    <div className='App'>
      <header className="App-header">
        <h1>Pokédex</h1>
        <form>
          <label>
            <input
              type="text"
              value={apiPokemon}
              onChange={(e) => { setApiPokemon(e.target.value); setCheckApiPkemon(false) }}
              name="search" />
          </label>
          <input className='_button' onClick={(e) => {
            search()
          }} type="button" value="Search" />
        </form>
        <div className='test'>
          {
            checkApiPkemon && getPokemon(Pokemon)
          }
        </div>
      </header>
    </div>
  );
}

export default App;

function getPokemon(Pokemon: any) {
  return (
    <div className='test_app'>
      <img src={Pokemon.img} alt="" />
      <p><span>ID:</span> <b>{Pokemon.id}</b></p>
      <p><span>Name:</span> <b>{Pokemon.name}</b></p>
      <p><span>Type:</span> <b>{Pokemon.type}</b></p>
      <p><span>Height:</span> <b>{Pokemon.height}</b></p>
      <p><span>Weight:</span> <b>{Pokemon.weight}</b></p>
    </div >
  )
}


