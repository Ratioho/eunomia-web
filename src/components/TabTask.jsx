import React, { useState } from 'react'
import styled from 'styled-components'
import { category, tasks } from './constants'

const DivTask = styled.div`display: flex;`

const DivTaskLeft = styled.div`
  flex: 1;
  border-right: 1px solid grey;
  height: 100vh;
  padding: 15px 0px 0px 15px;
  overflow: auto;
`

const DivTaskRight = styled.div`
  flex: 1;
  height: 100vh;  
  padding: 15px 15px 0px 15px;
  overflow: auto;
`

const ListItem = styled.li`
  &:hover{
    background: gainsboro;
    cursor: pointer;
  }
`

const DetailPage = ({activeState, data}) => {
  return (
    <div>
    <p>{JSON.stringify(activeState)}</p>
    <p>{JSON.stringify(data)}</p>
    </div>
  )
}

const TabTask = () => {

  const [cat, setCat] = useState(category)
  const [tas, setTas] = useState(tasks)

  const [active, setActive] = useState(['default', 'default'])

  return (
    <DivTask>
      <DivTaskLeft>
        {/* Header */}
        <div style={{fontSize: 28}}>Task</div>
        <h3>Category</h3>
        {/* <ul> */}
        <ul>
          {/* {JSON.stringify(Object.keys(cat))} */}
          {Object.keys(cat).map((key) => 
            <ListItem onClick={()=>{
              setActive(['category', key])
            }}>
              {key}
            </ListItem>)}
        </ul>
        <h3>Tasks</h3>
        <ul>
          {Object.keys(tas).map((key) => 
            <ListItem onClick={()=>{
              setActive(['task', key])
            }}>
              {key}
            </ListItem>)}
          {/* <li>App develop</li>
          <li>Calculus Stream Tutorial</li>
          <li>Film Commenting</li>
          <li>Film analysis: cyberpunk</li>
          <li>Film analysis: louis & thelma</li> */}
        </ul>
        {/* <h3>Deadline/OKR</h3>
        <ul>
          <li>Java Assignments</li>
          <li>Art History Readings</li>
          <li>numpy homework</li>
        </ul> */}
      </DivTaskLeft>
      <DivTaskRight>
        <DetailPage activeState={active} 
          data = {
            active[0] === 'category'
            ? cat[active[1]]
            : tas[active[1]]
          }
        />
      </DivTaskRight>
    </DivTask>
    

  )
}

export default TabTask