import React, { useState, useReducer, useEffect } from 'react'

const taskInitState = {
	'app development': {
    title: 'app development',
    description: "eunomia app",
    schedule: ['2020-01-01', '2020-02-20'],
    timeEstimated: 12000,
    timeTaken: 2000,
  },
  'calculus tutorial': {
  	title: 'calculus tutorial',
  	description: "make a video tutorial of calculus based on Stewart's textbook",
  	schedule: ['2020-01-01', '2020-03-30'],
  	timeEstimated: 34 * 60,
  	timeTaken: 0,
  }
}

const catInitState = {
  'Work': {
    title: 'Work',
    description: 'everyday work',
  },
  'Fitness': {
    title: 'Fitness',
    description: 'fitness every week',
  }
}


const Clock = () => {
  const [time, setTime] = useState(0)

  useEffect(
    () => {
      const timer = setInterval(() => {setTime((prev) => prev + 1)}, 60000)
      return () => clearInterval(timer)
    }
  )

  const date = new Date()


  return (
    <div style={{fontSize: 64}}>{date.getHours() + ":" + date.getMinutes()}</div>
  )
}

const PageSchedule = () => {

  const [navigation, setNavigation] = useState(['home'])

  return (
    <>
      {/* Digital Clock */}
      <Clock />

      {/* Separater */}
      <div style={{borderBottom: '1px solid black', width: '100%'}}></div>
      {/* Navigation */}
      <div>
        {navigation.map((item) => <span key = {item}>{item + '/'} </span>)}
      </div>
      {/* Title */}
      <h2>Tasks</h2>
      {/* Content */}
      <h3>Category</h3>
      <div>
        {
          Object.keys(catInitState).map((key) => (
            <>
            <h5 onClick = {() => {setNavigation(['home', 'category', key])}}>{key}</h5>
            <div key = {key}>{JSON.stringify(catInitState[key])}</div>
            </>
          ))
        }
      </div>
      <h3>Tasks</h3>
      <div>
        {
          Object.keys(taskInitState).map((key) => (
            <>
            <h5 onClick = {() => {setNavigation(['home', 'tasks', key])}}>{key}</h5>
            <div key = {key}>{JSON.stringify(taskInitState[key])}</div>
            </>
          ))
        }
      </div>
    </>
  )
}

export default PageSchedule