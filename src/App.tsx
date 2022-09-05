import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';

interface FormProps {
  onSubmit: () => any;
  children?: JSX.Element;
}

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
  const search = (): any => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${apiPokemon}`).then((Response) => {
      SetPokemon({
        id: Response.data.id,
        name: Response.data.name,
        img: Response.data.sprites.front_default,
        type: Response.data.types[0].type.name,
        height: Response.data.height,
        weight: Response.data.weight,
      })
      !checkApiPkemon ? setCheckApiPkemon(true) : nothing()
    })

  }
  const nothing = (): any => { }
  const formElement = (): JSX.Element => {
    return (
      <label>
        <input
          type="text"
          value={apiPokemon}
          onChange={(e) => {
            setApiPokemon(e.currentTarget.value);
            //  setCheckApiPkemon(false) 
          }}
          // onKeyUp={() => search()}
          name="search" />
        <input className='_button' onClick={(e) => {
          search()
        }} type="submit" value="Search" />
      </label>)
  }
  const Form = ({ onSubmit, children }: FormProps) =>
    <form
      onKeyUp={
        (e) => {
          /**
           * Note: Pressing enter in some input in a browser forms
           *  triggers onClick on the first child button
           *
           * So, prevent `enter` from triggering `onClick` on any buttons
           *  and instead trigger onSubmit
           */
          if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit();
          }
        }
      }
      onSubmit={
        (e) => {
          /**
           * Prevent submit from reloading the page
           */
          e.preventDefault();
          e.stopPropagation();
          onSubmit();
        }
      }>
      {children}
    </form>
  return (
    <div className='App'>
      <header className="App-header">
        <h1>Pokédex</h1>
        <h3>Input Pokémon ID or Pokémon's Name</h3>
        {
          Form({ onSubmit: nothing(), children: formElement() })
        }
        <div className='test'>
          {
            checkApiPkemon &&
            getPokemon(Pokemon)

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

