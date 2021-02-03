import React, { useState, useReducer, useEffect } from 'react'
import styled from 'styled-components'

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


const ClockWrapper = styled.div`
  height: 20%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 78px;
  font-family: futura;
`

const Clock = () => {
  const [time, setTime] = useState(0)

  useEffect(
    () => {
      const timer = setInterval(() => {setTime((prev) => prev + 1)}, 60000)
      return () => clearInterval(timer)
    }
  )

  const date = new Date()

  const formatTime = (hour, minute) => {
    const h = hour < 10 ? '0' + hour : hour
    const m = minute < 10 ? '0' + minute : minute

    return h + ':' + m
  }


  return (
    <ClockWrapper>{formatTime(date.getHours(), date.getMinutes())}</ClockWrapper>
  )
}

const PageSchedule = () => {

  const [navigation, setNavigation] = useState(['home'])

  return (
    <>
      {/* Digital Clock */}
      <Clock />

      {/* Separater */}
      <hr />
      {/* Navigation */}
      <div>
        {navigation.map((item) => <span key = {item} onClick = {() => {
          const ret = []
          for (let i of navigation) {
            ret.push(i)
            if (i === item) {
              break
            }
          }
          if (ret.length === 1) {
            setNavigation(ret)
          }
        }}>{item + '/'} </span>)}
      </div>
      {/* Title */}
      <h2>Tasks</h2>
      {/* Content */}
      {
        navigation.length === 1
          ?
        <>
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
          :
        <>
          <h4>{navigation[2]}</h4>
          <div>
            {
              navigation[1] === 'category'
                ?
              JSON.stringify(catInitState[navigation[2]])
                :
              JSON.stringify(taskInitState[navigation[2]])
            }
          </div>
        </>
      }
      
    </>
  )
}

export default PageSchedule