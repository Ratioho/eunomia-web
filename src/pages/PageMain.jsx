import React, { useState, useReducer } from 'react'
import styled from 'styled-components'


/**
 * Agenda Column Wrappers
 */
const TodolistAgenda = styled.div`
// outer: position, size, margin
  flex: 1;

// inner: arrangement
  padding-left: 20px;

// specs: color, behavior
  // border: 1px solid silver;
`

const AgendaInput = styled.div`
// inner: arrangement
  display: flex;
  padding: 5px 20px 0 0;
`

const InputArea = styled.input`
// outer: position, size, margin
  margin-right: 5px;
  flex: 1; // take as much space as possible
`

const InputButton = styled.div`
// inner: arrangement
  padding: 5px;

// specs: color, behavior
  border: 1px solid black;
  &:hover{
    background: whitesmoke;
    cursor: pointer;
  }
`


const AgendaItem = styled.div`
// outer: position, size, margin

// inner: arrangement
  display: flex;
  align-items: center;

// specs: color, behavior
  cursor: auto;
`
const AgendaItemTimeSpot = styled.div`
// outer: position, size, margin
  margin-left: 15px;
  // width: 50px;
// inner: arrangement

// specs: color, behavior
  cursor: pointer;
`
const AgendaItemContent = styled.div`
// outer: position, size, margin
  margin-left: 15px;
`


const initialState = [
  {
    key: '0',
    type: 'spot',
    isChecked: true,
    isStashed: false,
    time: '1130',
    content: 'Get up, shower, brush teeth',
  },
  {
    key: '1',
    type: 'span',
    isChecked: false,
    isStashed: false,
    time: '1200-1800',
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
        time: '0000',
        content: action.value
      }
      ret.push(item)
      return ret
    default:
      return ret
  }
}


const Item = ({info, id, dispatch}) => {

  const [visibleControl, setVisibleControl] = useState(false)

  const Control = () => {
    return (
      <button 
        onClick = {() => {
          dispatch({type: 'stash', value: id})
          setVisibleControl(false)
        }}>
        {info.isStashed ? 'unstash' : 'stash'}
      </button>
    )
  }

  return (
    <AgendaItem>
      {info.isStashed ? <div>Stashed</div> : null}
      <input type = 'checkbox'
        checked = {info.isChecked}
        onChange = {() => dispatch({type: 'check', value: id})} />
      <div>{id}</div>
      <AgendaItemTimeSpot onClick = {() => setVisibleControl(!visibleControl)}>
        {info.time}
      </AgendaItemTimeSpot>
      {visibleControl ? <Control /> : null}
      <AgendaItemContent>
        {info.content}
      </AgendaItemContent>
    </AgendaItem>
  )

}


const PageTodolist = () => {

  const [inputValue, setInputValue] = useState('')


  const [todoState, todoDispatch] = useReducer(reducer, initialState)


  return (

      <TodolistAgenda>
        {/* Header */}
        <h2>Today</h2>
        {/* Agenda */}
        {todoState.map((item, index) => (
          <Item info = {item} id = {index} dispatch = {todoDispatch} key = {item.key}/>
        ))}
        {/* Input */}
        <AgendaInput>
          <InputArea type = 'text' value = {inputValue}
            onChange = {(event) => {
              setInputValue(event.target.value)}}
            onKeyPress = {(event) => {
              if (event.key === 'Enter'){
                todoDispatch({type: 'append', value: inputValue})
                setInputValue('')
              }}}
          />
          <InputButton 
            onClick = {() => {todoDispatch({type: 'append', value: inputValue}); setInputValue('')}}
          >
            Add
          </InputButton>
        </AgendaInput>
      </TodolistAgenda>
  )
}
export default PageTodolist