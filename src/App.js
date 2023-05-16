import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [datos, setDatos] = useState({});
  const [currentVariable, setCurrentVariable] = useState(null);
  const [datosVariable, setDatosVariable] = useState(null);

  useEffect(() => {

    handleTokenSubmit();

  }, [token]);


  function handleVariableSumbit(currentVar) {

    let promises = [];
    let tempDatos = {}; // crea una copia del array datos
    console.log(token);
    console.log(token);
    let url = '';

    if (token == "BBFF-rgVXhx600zQ2ipyBtIx7pmHQWlD5pT") {

      url = `https://industrial.api.ubidots.com/api/v1.6/devices/device1/${currentVar}/values/?token=BBFF-rgVXhx600zQ2ipyBtIx7pmHQWlD5pT`;

    } else if (token == "BBFF-vnBDBCkElNwXFRr1jgVEFtqZ8ckzQ0") {

      url = `https://industrial.api.ubidots.com/api/v1.6/devices/device2/${currentVar}/values/?token=BBFF-vnBDBCkElNwXFRr1jgVEFtqZ8ckzQ0`;

    } else {
      url = `https://industrial.api.ubidots.com/api/v1.6/devices/device3/${currentVar}/values/?token=BBFF-BC6L9f0acjyd9CY8BZjITgocDgWIwM`;
    }

    let promise = fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        tempDatos = result;
      })
      .catch((error) => {
        console.error(error)
      }
      );

    promises.push(promise);

    Promise.all(promises).then(() => {
      setDatosVariable(tempDatos);
    });
  }


  function handleTokenSubmit() {
    let promises = [];
    let tempDatos = {}; // crea una copia del array datos
    console.log(token);

    let url = "";

    if (token == "BBFF-rgVXhx600zQ2ipyBtIx7pmHQWlD5pT") {

      url = "https://industrial.api.ubidots.com/api/v1.6/datasources/64597ab8b9f6bc000e40b998/variables/?token=BBFF-rgVXhx600zQ2ipyBtIx7pmHQWlD5pT"

    } else if (token == "BBFF-vnBDBCkElNwXFRr1jgVEFtqZ8ckzQ0") {
      url = "https://industrial.api.ubidots.com/api/v1.6/datasources/64597ac62712e2000bd67812/variables/?token=BBFF-vnBDBCkElNwXFRr1jgVEFtqZ8ckzQ0"

    } else {
      url = "https://industrial.api.ubidots.com/api/v1.6/datasources/64597ad19e59ae000b384259/variables/?token=BBFF-BC6L9f0acjyd9CY8BZjITgocDgWIwM"
    }

    let promise = fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        tempDatos = result;
      })
      .catch((error) => {
        console.error(error)
      }
      );

    promises.push(promise);

    Promise.all(promises).then(() => {
      setDatos(tempDatos);
    });
  }

  function handleAutenticated() {
    setIsAuthenticated(true);

  }

  return (
    <div className="App">
      {!isAuthenticated && (
        <Userlogin onSubmit={handleAutenticated} />
      )}
      {isAuthenticated && (

        <div>

          {!token ?
            <>
              <div className='deviceSelector'>
                <div className='cardDevice'>
                  <h1>Seleccione el dispositivo</h1>
                  <div>
                    <button onClick={() => { setToken("BBFF-rgVXhx600zQ2ipyBtIx7pmHQWlD5pT") }}>Dispositivo 1</button>
                    <button onClick={() => { setToken("BBFF-vnBDBCkElNwXFRr1jgVEFtqZ8ckzQ0") }}>Dispositivo 2</button>
                    <button onClick={() => { setToken("BBFF-BC6L9f0acjyd9CY8BZjITgocDgWIwM") }}>Dispositivo 3</button>
                  </div>
                </div>

              </div>


            </>
            :
            <>
              <div className='main'>
                <button onClick={() => { setToken(null) }}>Salir</button>
                <div className='menuVar'>
                  {datos.results.map((variable, index) => (
                    <button key={index} onClick={() => { setCurrentVariable(variable.name); handleVariableSumbit(variable.name); }}>
                      {variable.name}
                    </button>
                  ))}
                </div>

                {!currentVariable ?

                  <>
                    <p>seleccione una variable</p>
                  </> :
                  <>
                    <div className='contentInfo'>
                      {datosVariable &&
                        <p>
                          Ultimo dato {datosVariable.results[0].value}
                        </p>
                      }


                      <div className='tableInfo'>
                        <h2>Tabla de {currentVariable}</h2>
                        <table>
                          <thead>
                            <tr>
                              <th>fecha</th>
                              <th>valor</th>
                            </tr>
                          </thead>
                          <tbody>
                            {!datosVariable ?
                              <>

                              </>
                              :
                              <>
                                {datosVariable.results.map((valor, index) => (
                                  <tr key={index}>
                                    <td>{valor.timestamp}</td>
                                    <td>{valor.value}</td>
                                  </tr>
                                ))}
                              </>
                            }

                          </tbody>
                        </table>
                      </div>

                    </div>

                  </>

                }

              </div>
            </>
          }

        </div>

      )}
    </div>
  );
}





//ALEJO Y JAVI

function Userlogin({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  };
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (email === '1' && password === '1') {
      // Aquí deberías agregar la lógica para enviar el formulario a tu API o backend
      onSubmit("ENTRAMOS");
      console.log('ENTRAMOS');
    } else {
      alert("USUARIO O CONTRASEÑA INCORRECT0")
    }
  };

  return (
    <div className='tokemForm'>
      <img src='https://www.uao.edu.co/wp-content/uploads/2020/05/UAO-logo-acreditacion.png'></img>
      <form className='tokemContent' onSubmit={handleSubmit}>
        <label>
          Correo:
          <input type="text" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Contraseña:
          <input type="text" value={password} onChange={handlePasswordChange} />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );



}

export default App;
