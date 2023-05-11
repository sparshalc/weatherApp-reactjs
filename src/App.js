import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const[data, setData] = useState({});
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=71b98b3d351cf579de51029a1f86573c`

  const searchLocation = (event) =>{
    if(event.key == 'Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div>
      <div className="app">
        <div className="search">
          <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder='Enter Location...'
          onKeyPress={searchLocation}
          type="text"/>
        </div>
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          {data.name !== undefined &&
            <div className="bottom">
            <div className="feels">
            {data.main ? <p className='bold'>{data.main.feels_like}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
            {data.main ? <p className='bold'>{data.main.humidity}°C</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
            {data.wind ? <p className='bold'>{data.wind.speed}</p> : null}
            <p>Winds</p>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
