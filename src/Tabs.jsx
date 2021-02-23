import styled from 'styled-components'
import React from 'react'

import TodoList from './Components/TodoList'
import TaskList from './Components/TaskList'



export const Tab0 = ({todoState, todoDispatch, taskState, taskDispatch}) => {
  const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
  `
  const Divider = styled.div`
    height: 100%;
    width: 1px;
    background: black;
  `

  return (
    <Wrapper>
      <TodoList state = {todoState} dispatch = {todoDispatch}/>
      <Divider />
      <TaskList />
    </Wrapper>
  )
}

export const Tab1 = () => {
  return (
    <TaskList />
  )
}

export const Tab2 = () => {
  return (
    <TodoList />
  )
}

export const Tab3 = () => {
  return (
    <div>Statistics</div>
  )
}

export const Tab4 = () => {
  return (
    <div>Notebook</div>
  )
}