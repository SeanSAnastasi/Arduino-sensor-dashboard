import React from 'react';
import './App.css';
import 'chartjs-adapter-moment';
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import Data from './data/data.json';
import moment from 'moment';



function getHumidity(){
  var humidity = [];

  Data.map(row =>{
    humidity.push({x: moment(new Date(row.timestamp)).format('YYYY-MM-DD HH:mm:ss'), y: row.humidity})
  });

  
  return humidity;
}
function getAverageHumidity(){
  var humiditySum = 0;
  Data.map(row =>{
    humiditySum += row.humidity;
  });

  return (humiditySum/Data.length).toFixed(2);
}
function getTemperature(){
  var temperature = [];

  Data.map(row =>{
    temperature.push({x: moment(new Date(row.timestamp)).format('YYYY-MM-DD HH:mm:ss'), y: row.temperature})
  })

  
  return temperature;
}
function getAverageTemperature(){
  var temperatureSum = 0;
  Data.map(row =>{
    temperatureSum += row.temperature;
  });

  return (temperatureSum/Data.length).toFixed(2);
}
function getGas(){
  var gas = [];

  Data.map(row =>{
    gas.push({x: moment(new Date(row.timestamp)).format('YYYY-MM-DD HH:mm:ss'), y: row.gas})
  })

  
  return gas;
}
function getAverageGas(){
  var gasSum = 0;
  Data.map(row =>{
    gasSum += row.gas;
  });

  return (gasSum/Data.length).toFixed(2);
}
console.log(getHumidity());
const data = {
  datasets: [
    {
      label: "Humidity",
      data: getHumidity(),
      fill: true,
      backgroundColor: "rgba(106,127,219,0.2)",
      borderColor: "rgba(106,127,219,1)"
    },
    {
      label: "Temperature",
      data: getTemperature(),
      fill: true,
      backgroundColor: "rgba(87,226,229,0.2)",
      borderColor: "rgba(87,226,229,1)"
    },
    {
      label: "Gas",
      data: getGas(),
      fill: true,
      backgroundColor: "rgba(224,141,172,0.2)",
      borderColor: "rgba(224,141,172,1)"
    }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
        type: 'time',
        time: {
            parser: 'YYYY-MM-DD HH:mm:ss',
            unit: 'day'
        }
    }
}
}

const App = () => {
  return (
    <div className="App">
      <h1>Environment Sensors</h1>
      <div className="chart-container">
        <Line data={data} options={options}/>
      </div>
      <h1>Averages</h1>
      <div className="averages-container">
        <p className="avg humidity">{getAverageHumidity()}%</p>
        <p className="avg temperature">{getAverageTemperature()}°C</p>
        <p className="avg gas">{getAverageGas()}ppm</p>
      </div>
      
    </div>
  )
}

export default App;
