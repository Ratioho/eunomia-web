import React, { useState } from 'react'
import styled from 'styled-components'

const TodolistAgenda = styled.div`
// outer: position, size, margin
  flex: 1;

// specs: color, behavior
  border: 1px solid silver;
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
  border: 1px solid, silver;
`


const TodolistDetail = styled.div`
// outer: position, size, margin
  flex: 1;
`



const PageTodolist = ({
  todolist, setTodolist,
  schedule, setSchedule,
}) => {

  const [inputValue, setInputValue] = useState('')

  const addTodolist = (s) => {
    const obj = {
      key: todolist.length,
      content: s,
    }
    setTodolist([...todolist, obj])
    setInputValue('')
  }

  return (
    <>
      <TodolistAgenda>
        {/* Header */}
        <h2>Today</h2>
        {/* Agenda */}
        {todolist.map((item) => (
          <p key = {item.key}>{item.content}</p>
        ))}
        {/* Input */}
        <AgendaInput>
          <InputArea type = 'text' value = {inputValue}
            onChange = {(event) => {setInputValue(event.target.value)}}
            onKeyPress = {(event) => {
              if (event.key === 'Enter')
                addTodolist(inputValue)}}
          />
          <InputButton onClick = {() => {addTodolist(inputValue)}}>
            Add
          </InputButton>
        </AgendaInput>
      </TodolistAgenda>

      <TodolistDetail>
        <h2>25:00</h2>
      </TodolistDetail>
    </>
  )
}
export default PageTodolist