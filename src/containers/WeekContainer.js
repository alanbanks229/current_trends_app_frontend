import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux"
import DayCard from './WeatherCard.js'
import DegreeToggle from './DegreeToggle.js'
import './weekcontainer.css'


const WeekContainer = () => {
    let user_zip = '20854'

    const [ fullData, fullDataSet ] = useState([])
    const [ dailyData, dailyDataSet ] = useState([])
    const [ degreeType, degreeTypeSet ] = useState("fahrenheit")
    const userLocation = useSelector(state => state.user_location)
    useEffect(() => {
        const weatherURL =
        `http://api.openweathermap.org/data/2.5/forecast?zip=11102&units=imperial&APPID=c9342df25e8b5f3a009b16e47b57dd8d`
    
        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
          const DailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
          debugger
          fullDataSet(data.list)
          dailyDataSet(DailyData)
        })},[])

    const updateForecastDegree = event => {
        degreeTypeSet(event.target.value)
    }

    const formatDayCards = () => {
        return dailyData.map((reading, index) => <DayCard reading={reading} key={index} degreeType={degreeType}/>)
    }

    return (
        <div className="container">
        <h5 className="display-5 text-muted">New York, US (5-day, forecast)</h5>
        <DegreeToggle degreeType={degreeType} updateForecastDegree={updateForecastDegree}/>
          <div className="row justify-content-center">
  
            {formatDayCards()}
  
          </div>
        </div>
      )

}

export default WeekContainer;