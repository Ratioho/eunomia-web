import React, { useEffect, useState } from 'react'
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

// specs: color, behavior
  cursor: auto;
`
const AgendaItemTimeSpot = styled.div`
// outer: position, size, margin
  margin-left: 15px;
  width: 50px;
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
    isChecked: false,
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


const PageTodolist = () => {

  const [inputValue, setInputValue] = useState('')

  const [todolist, setTodolist] = useState(initialState)



  return (

      <TodolistAgenda>
        {/* Header */}
        <h2>Today</h2>
        {/* Agenda */}
        {todolist.map((item) => (
          <AgendaItem key = {item.key}>
            <input
              // onChange = {(event) => {setIsChecked(event.target.checked)}}
              type="checkbox" 
              // checked={item.isChecked}
              // 现在，我们需要在整个 list 当中，去修改一个元素的 isChecked 值 
              />
            <AgendaItemTimeSpot>
              {item.time}
            </AgendaItemTimeSpot>
            <AgendaItemContent>
              {item.content}
            </AgendaItemContent>
          </AgendaItem>
        ))}
        {/* Input */}
        <AgendaInput>
          <InputArea type = 'text' value = {inputValue}
            onChange = {(event) => {
              setInputValue(event.target.value)}}
            // onKeyPress = {(event) => {
            //   if (event.key === 'Enter')
            //     appendTodolist(inputValue)}}
          />
          <InputButton 
            // onClick = {() => {appendTodolist(inputValue)}}
          >
            Add
          </InputButton>
        </AgendaInput>
      </TodolistAgenda>
  )
}
export default PageTodolist