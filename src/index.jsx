import React, { useReducer, useState } from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import { ListItem, TodoItem } from './Components/TodoItem'
import { initState, reducer } from './reducer'


const TodoListWrapper = styled.div`
  padding: 0 0 0 3rem;
  overflow: auto;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Main = styled.div`
  overflow-wrap: break-word;
`
const Footer = styled.div`
  margin-top: 1rem;
  display: flex;
`
const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const appendInput = (s, dispatch) => {
  // check if time included
  let h = parseInt(s.substring(0, 2))
  let m = parseInt(s.substring(2, 4))
  if (!isNaN(h) && !isNaN(m) && h >= 0 && h <= 24 && m >= 0 && m <= 60) {
    let dateObj = new Date()
    let timeString = dateObj.getFullYear() * 100000000 
        + dateObj.getMonth() * 1000000 + 1000000
        + dateObj.getDate() * 10000
        + h * 100 + m
    let newItem = {
      content: s.substring(4).trim(),
      time: timeString,
      check: false,
      duration: 5,
      task: ''
    }
    dispatch({type: 'listAppend', value: newItem})
  }
  else {
    let newItem = {
      content: s,
      check: false,
      task: ''
    }
    dispatch({type: 'todoAppend', value: newItem})
  }
}

const TodoList = () => {

  const [state, dispatch] = useReducer(reducer, initState)
  const [input, setInput] = useState('')
 
  return (
    <PageWrapper>
      <TodoListWrapper>
        <Header>
          <h2>Today</h2>
          <div>
            <button>save</button>
          </div>
        </Header>
        <Main>
          <h4>Scheduled</h4>
          {state.sList.map((item, index) => (
            <>
              <ListItem 
                item = {item} 
                key = {index} 
                idx = {index} 
                dispatch = {dispatch}
              />
              <hr />
            </>
          ))}
          <h4>Todo</h4>
          {state.tList.map((item, index) => (
            <TodoItem 
              item = {item} 
              key = {index} 
              idx = {index} 
              dispatch = {dispatch}
            />
          ))}
        </Main>
        <Footer>
          <input type='text' style = {{flex: 1}}
            value = {input}
            onChange = {(event) => {
              setInput(event.target.value)
            }}
            onKeyPress = {(event) => {
              if (event.key === 'Enter') {
                appendInput(input, dispatch)
                setInput('')
              }
            }}
          />
          <button style={{marginLeft: '2rem'}}
            onClick = {() => {
              appendInput(input, dispatch)
              setInput('')
            }}
          >
            Add
          </button>
        </Footer>
      </TodoListWrapper>
      <TodoListWrapper>
        <h2>Task List</h2>
      </TodoListWrapper>
    </PageWrapper>
  )
}

ReactDom.render(<TodoList />, document.getElementById('root'))



