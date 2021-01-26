import styled from 'styled-components'
import ReactDom from 'react-dom'
import React, {useState} from 'react'

import PageTodolist from './pages/PageMain'


import {stateTodolist, stateSchedule} from './state'

const MainFrame = styled.div`
// outer: position, size, margin
  margin: 0;
  height: 99vh;
  width: 99%;

// inner: arrangement
  display: flex;
  padding: 0;
  box-sizing: border-box;

// web only
  border: 1px solid black;
`

const Sidebar = styled.div`
// outer: position, size, margin
  height: 100%;
  width: 200px;
  margin: 0;

// inner: arrangement
  display: flex;
  flex-direction: column;

// specs: color, behavior
  background: whitesmoke;
`

const Tab = styled.div`
// outer: position, size, margin
  margin: 2px 0 2px 0;

// inner: arrangement
  padding: 5px 0 5px 30px;

// specs: color, behavior
  background: ${props => 
    props.isActive === true 
      ? "gainsboro" 
      : "whitesmoke"};
  &:hover{
    background: gainsboro;
    cursor: pointer;
  }
`


const Content = ({
  tabSelect,
  todolist, setTodolist,
  schedule, setSchedule,
}) => {
  switch (tabSelect) {
    case 'td':
      return  <PageTodolist 
                // todolist = {todolist} setTodolist = {setTodolist}
                // schedule = {schedule} setSchedule = {setSchedule}
              />
    case 'sc':
      return  <div>schedule page</div>
    case 'ca':
      return  <div>schedule page</div>
    case 'st':
      return  <div>schedule page</div>
    case 'nb':
      return  <div>schedule page</div>
    default:
      return  <div>Contact developer for this bug</div>
  }
}

const Application = () => {

  const [currentTab, setCurrentTab] = useState('td')
  
  const [todolist, setTodolist] = useState(stateTodolist)
  const [schedule, setSchedule] = useState(stateSchedule)

  return (
    <MainFrame>
      <Sidebar>
        <svg viewBox="0 0 80 40" fill="pink">
          <circle cx="20" cy="20" r="11" />
        </svg>
        <Tab onClick = {() => {setCurrentTab('td')}}
          isActive = {currentTab === 'td'}> 
          ToDoList
        </Tab>
        <Tab onClick = {() => {setCurrentTab('sc')}}
          isActive = {currentTab === 'sc'}> 
          Schedule
        </Tab>
        <Tab onClick = {() => {setCurrentTab('ca')}}
          isActive = {currentTab === 'ca'}> 
          Calendar
        </Tab>
        <Tab onClick = {() => {setCurrentTab('st')}}
          isActive = {currentTab === 'st'}> 
          Stats
        </Tab>
        <Tab onClick = {() => {setCurrentTab('nb')}}
          isActive = {currentTab === 'nb'}> 
          Notebook
        </Tab>
      </Sidebar>
      <Content tabSelect = {currentTab} 
        todolist = {todolist} setTodolist = {setTodolist}
        schedule = {schedule} setSchedule = {setSchedule}
      />
    </MainFrame>
  )
}

ReactDom.render(<Application />, document.getElementById('root'))