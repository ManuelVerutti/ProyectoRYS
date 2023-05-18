import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [datos, setDatos] = useState([]);
  // const [currentVariable, setCurrentVariable] = useState(null);
  // const [datosVariable, setDatosVariable] = useState(null);

  const [estadoPlazas, setEstadoPlazas] = useState(["", "park1", "park2", "park3", "park4"]);


  useEffect(() => {
    try {
      for (let index = 0; index < datos.length; index++) {

        // console.log("PRUEBA1" + datos[index]);
        for (let j = 0; j < datos[index].results.length; j++) {


          let tempEstados = estadoPlazas;
          for (let k = 1; k <= 4; k++) {

            if(isAdmin){

              if (datos[index].results[j].name == `p${k}_wellparked` && datos[index].results[j].last_value.value == 0) {

                tempEstados[k] += ` no_bien_park`;
  
              }

            }
            if (datos[index].results[j].name == `p${k}_reduce_mob` && datos[index].results[j].last_value.value == 1) {

              tempEstados[k] += ` mov_red`;

            } else {

              if (datos[index].results[j].name == `p${k}_available`) {
                // console.log(datos[index].results[j].name + ":  " + datos[index].results[j].last_value.value);

                if (datos[index].results[j].last_value.value == 1) {


                  tempEstados[k] = `park${k} disponible`;


                }
                else {
                  tempEstados[k] = `park${k} no_disponible`;
                }
              }

            }
            setEstadoPlazas(tempEstados);

          }

        }

      }
    } catch (error) {
      console.log(error);
    }


  }, [datos]);


  useEffect(() => {

    // Ejecutar getValuesPark inmediatamente
    getValuesPark();

    // Ejecutar getValuesPark cada 5 segundos
    const intervalId = setInterval(getValuesPark, 500);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);

  }, []);

  function getValuesPark() {

    let promises = [];
    let tempDatos = [];
    // console.log(token);
    // console.log(token);
    let url =
      [
        'http://industrial.api.ubidots.com/api/v1.6/datasources/646296d745ff7b000d4fa2e7/variables/?token=BBFF-71geyJLgIgl5on5qwRF5BDIoMB9rsY',
        'http://industrial.api.ubidots.com/api/v1.6/datasources/644aa405421f33000cebf1ad/variables/?token=BBFF-71geyJLgIgl5on5qwRF5BDIoMB9rsY',
        'http://industrial.api.ubidots.com/api/v1.6/datasources/644aa62f6f9483000d58cdfb/variables/?token=BBFF-71geyJLgIgl5on5qwRF5BDIoMB9rsY'
      ];

    for (let i = 0; i < url.length; i++) {

      let promise = fetch(url[i])
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          tempDatos.push(result);
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

    console.log("SAPAAAAAA");

  }


  function handleAutenticated() {
    setIsAuthenticated(true);

  }

  return (
    <div className="App">
      {!isAuthenticated && (
        <Userlogin onSubmit={handleAutenticated} setAdmin={setIsAdmin} />
      )}
      {isAuthenticated && (

        <div className='parqueadero'>
          <div className='panel'>
            <button onClick={()=>{window.location.reload()}}>Salir</button>
            <div className='panelInfo'>
              <div> <p>Plaza disponible</p><div className='indicador disponible'></div></div>
              <div> <p>Plaza Ocupada</p><div className='indicador no_disponible'></div></div>
              <div> <p>Plaza para personas con movilidad reducida</p><div className='indicador mov_red'></div></div>
              {isAdmin&&
              <div> <p>Plaza mal parqueada</p><div className='indicador no_bien_park'></div></div>
              }

            </div>
          </div>

          <img className='backGround' src='/OIG.jpg' alt='imgPaueadero'></img>
          <div className='plazas'>
            <div className={estadoPlazas[1]}>
              
            </div>
            <div className={estadoPlazas[2]}>
            </div>
            <div className={estadoPlazas[3]}>
            </div>
            <div className={estadoPlazas[4]}>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}



//ALEJO Y JAVI

function Userlogin({ onSubmit, setAdmin }) {
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
      setAdmin(false);
    } else {
      if (email === 'admin' && password === 'admin') {
        // Aquí deberías agregar la lógica para enviar el formulario a tu API o backend
        onSubmit("ENTRAMOS");
        setAdmin(true);
        console.log('ENTRAMOS');
      } else {
        alert("USUARIO O CONTRASEÑA INCORRECT0")
      }
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
