import React, { useState, useReducer } from 'react'
import styled from 'styled-components'
import AgendaItem from './AgendaItem'



const initialState = [
  {
    key: '0',
    type: 'spot',
    isChecked: true,
    isStashed: false,
    time: ['11:30'],
    content: 'Get up, shower, brush teeth',
  },
  {
    key: '1',
    type: 'span',
    isChecked: false,
    isStashed: false,
    time: ['00:30', '16:00'],
    content: 'Eunomia app development',
  },
]

const reducer = (state, action) => {
  const ret = [...state]
  switch(action.type) {
    case 'check':
      ret[action.value].isChecked = !ret[action.value].isChecked
      return ret
    case 'stash':
      ret[action.value].isStashed = !ret[action.value].isStashed
      return ret
    case 'append':
      const item = {
        key: ret.length.toString(),
        type: 'spot',
        isChecked: false,
        isStashed: false,
        time: ['00:00'],
        content: action.value
      }
      ret.push(item)
      return ret
    case 'timeChange':
      ret[action.value].time[action.extra[0]] = action.extra[1]
      return ret
    default:
      return ret
  }
}

const StyledPageWrapper = styled.div`
// outer: position, size, margin
  flex: 1;

// inner: arrangement
  padding: 0 20px 0 20px;

// specs: color, behavior
`

const PageTodolist = () => {

  const [todoState, todoDispatch] = useReducer(reducer, initialState)

  const [agendaInput, setAgendaInput] = useState('')

  return (
    <StyledPageWrapper>

      {/* Header */}
      <h2>Today</h2>

      {/* Agenda */}
      {todoState.map((item, index) =>
        <AgendaItem key = {item.key}
          info = {item}
          id = {index}
          dispatch = {todoDispatch}
        />
      )}

      {/* Input */}
      <>
        <input type = 'text' value = {agendaInput}
          onChange = {(event) => setAgendaInput(event.target.value)}
          onKeyPress = {(event) => {
            if (event.key === 'Enter') {
              todoDispatch({type: 'append', value: agendaInput})
              setAgendaInput('')
            }
          }}
        />
        <button onClick = {() => {
          todoDispatch({type: 'append', value: agendaInput})
          setAgendaInput('')
        }}>
          Add
        </button>
      </>

    </StyledPageWrapper>
  )
}


export default PageTodolist