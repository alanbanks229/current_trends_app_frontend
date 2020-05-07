import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux"
import DayCard from './WeatherCard.js'
import DegreeToggle from './DegreeToggle.js'
import './weekcontainer.css'


const WeekContainer = ({hide}) => {
    

    const [ fullData, fullDataSet ] = useState([])
    const [ dailyData, dailyDataSet ] = useState([])
    const [ degreeType, degreeTypeSet ] = useState("fahrenheit")
    const user = useSelector(state => state.user_location)
    const lat = useSelector(state => state.coordinates.lat)
    const long = useSelector(state => state.coordinates.long)
    useEffect(() => {
        if (user){
        const weatherURL =
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&APPID=c9342df25e8b5f3a009b16e47b57dd8d`
        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
          const DailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
          debugger
          fullDataSet(data.list)
          dailyDataSet(DailyData)
        })}},[user])

    const updateForecastDegree = event => {
        degreeTypeSet(event.target.value)
    }

    const formatDayCards = () => {
        return dailyData.map((reading, index) => <DayCard reading={reading} key={index} degreeType={degreeType}/>)
    }

    return (
        <>
        {user ? ( hide ? 
          ((<><div className="weathercontainer">
              <h5 className="display-5">{user.city}, {user.state} (5-day forecast)</h5>
              <DegreeToggle degreeType={degreeType} updateForecastDegree={updateForecastDegree}/>
              <br/>
              <div className="row justify-content-center">
    
                  {formatDayCards()}
    
              </div>
        </div></>)) : 

        ((<><div className="weathercontainerHidden">
          <h5 className="display-5">{user.city}, {user.state} (5-day forecast)</h5>
          <DegreeToggle degreeType={degreeType} updateForecastDegree={updateForecastDegree}/>
          <br/>
            <div className="row justify-content-center">
    
              {formatDayCards()}
    
            </div>
        </div></>)) )  : (null)}</>
      )

}

export default WeekContainer;