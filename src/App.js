import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [datos, setDatos] = useState([0, 0, 0,0,0,0]);
  const [estados, setEstados]=useState(["card0", "card0", "card0","card0","card0","card0"]);


  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  

  function handleTokenSubmit(tokenInput) {
    setToken(tokenInput);

  let promises = [];
  let tempDatos = datos.slice(); // crea una copia del array datos
  let tempEstados = estados.slice(); // crea una copia del array estados

  for (let i = 0; i < datos.length; i++) {
    const url =
      "http://industrial.api.ubidots.com/api/v1.6/devices/javirmanico/parking-" + (i + 1) + "/lv?token=" + tokenInput;

    let promise = fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        tempDatos[i] = result;
        tempEstados[i] = "card" + result + "";
      })
      .catch((error) => console.error(error));

    promises.push(promise);
  }

  Promise.all(promises).then(() => {
    console.log(tempEstados);
    setEstados(tempEstados);
    setDatos(tempDatos);
  });

  }

  return (
    <div className="App">
      {!isAuthenticated && (
        <TokenForm onSubmit={handleTokenSubmit} />
      )}
      {isAuthenticated && (

        <div className='parking'>
          <div className='header'>
          <h3 onClick={()=>{setToken(null); setIsAuthenticated(false)}}>Salir</h3>
            <h1>Parqueaderos UAO</h1>
          </div>
          {
          datos.map((value, index) => (

            <div key={index} className={estados[index]}>
              
              <p >{index + 1}</p>
              
            </div>

          ))}
        </div>

      )}
    </div>
  );
}

function TokenForm({ onSubmit }) {
  const [tokenInput, setTokenInput] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(tokenInput);
  }

  function handleChange(event) {
    setTokenInput(event.target.value);
  }

  return (
    <div className='tokemForm'>
      <img src='https://www.uao.edu.co/wp-content/uploads/2020/05/UAO-logo-acreditacion.png'></img>
      <form className='tokemContent' onSubmit={handleSubmit}>
        <label>
          Token:
          <input type="text" value={tokenInput} onChange={handleChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>

  );
}

export default App;
