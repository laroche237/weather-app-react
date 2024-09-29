import React , {useEffect, useState} from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import './App.css';

const App=()=> {
  const [weatherData, setWeatherData]=useState(null);
  const [city, setCity]=useState('');
  const [query, setQuery]=useState('');
  const [error, setError]=useState('');

  const API_KEY = 'your API key' 
  useEffect(() =>{
    if(query==='') return;
    const fetchWeather = async() => {
      try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`);
        setWeatherData(response.data);
        setError('');
      }catch(err){
             setError('Ville non trouvée. Veuillez essayer une autre.');
             setWeatherData(null);
      }
    };
    fetchWeather();
  }, [query, API_KEY] );

  const getLocationWeather = () =>{
    if(!navigator.geolocation){
      setError('La géolocalisation n\'est pas supportée par votre navigateur.');
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position)=>{
      const {latitude, longitude }=position.coords;
      try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
        setWeatherData(response.data);
        setError('');
      }catch(err){
        setError('Impossible de récupérer les données météorologiques.');
        setWeatherData(null);
      }
    }, () => {
      setError('Impossible d\'obtenir votre position');
    });
  };

  const handleSubmit = (e)  => {
    e.preventDefault();
    if(city.trim() !== ''){
      setQuery(city);
    }
  };
  return (
    <div className="app">
      <h1>WEATHER APP</h1>
      <div className="search">
      <form
       onSubmit={handleSubmit}>
        <input 
        type='text'
        placeholder='Entrez une ville'
        value={city}
        onChange={(e) => setCity(e.target.value)}
       />
       <button
       type='submit'
       > 
          Search
       </button>
       </form>
       <button
       onClick={getLocationWeather}
       > 
          Use my localisation
       </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weatherData && <Weather data={weatherData} />}
    </div>
  );
};

export default App;
