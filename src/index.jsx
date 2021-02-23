import React, { useReducer, useState } from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'

import { Tab0, Tab1, Tab2, Tab3, Tab4 } from './Tabs'

import { todoInitState, 
  todoReducer, 
  taskInitState, 
  taskReducer } from './reducer'

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

const Content = styled.div`
  height: 100%;
  width: 100%;
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




const Application = () => {

  const TabSwitches = ['TodoList', 'Schedule', 'Calendar', 'Stats', 'Notebook']
  const [currentTab, setCurrentTab] = useState(0)
  const TabContents = [Tab0, Tab1, Tab2, Tab3, Tab4]

  const [todoState, todoDispatch] = useReducer(todoReducer, todoInitState)
  const [taskState, taskDispatch] = useReducer(taskReducer, taskInitState)
  const TabContent = TabContents[currentTab]


  return (
    <MainFrame>
      <Sidebar>
        <svg viewBox="0 0 80 40" fill="pink">
          <circle cx="20" cy="20" r="11" />
        </svg>
        {TabSwitches.map((name, index) => 
          <Tab onClick = {() => setCurrentTab(index)}
            key = {index}
            isActive = {currentTab === index}>
            {name}
          </Tab>
        )}
      </Sidebar>
     
      <Content>
        <TabContent todoState = {todoState}
          todoDispatch = {todoDispatch}
          taskState = {taskState}
          taskDispatch = {taskDispatch}/>
      </Content>
      

    </MainFrame>
  )
}

ReactDom.render(<Application />, document.getElementById('root'))