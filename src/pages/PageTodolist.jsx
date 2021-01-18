import React, { useEffect, useState } from 'react'
import styled from 'styled-components'


/**
 * Agenda Column Wrappers
 */
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


/**
 * Detail Column Wrappers
 */
const TodolistDetail = styled.div`
// outer: position, size, margin
  flex: 1;
`

const DetailTimer = () => {

  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    const interval = setInterval(()=>{setSeconds(seconds+1)}, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>{seconds}</div>
  )
}

const DetailSchedule = ({schedule}) => {
  return (
    <>
      <p>Category</p>
      {Object.keys(schedule['category']).map((key) => {
        return (
          <React.Fragment key={key}>
            <p>{key}</p>
            <p>{JSON.stringify(schedule['category'][key])}</p>
          </React.Fragment>
        )
      })}
      <p>Tasks</p>
      {Object.keys(schedule['tasks']).map((key) => {
        return (
          <p  key={key}>{JSON.stringify(schedule['tasks'][key])}</p>
        )
      })}
    </>
  )
}

const PageTodolist = ({
  todolist, setTodolist,
  schedule, setSchedule,
}) => {

  const [inputValue, setInputValue] = useState('')

  // Given input string s, append todolist with it
  const appendTodolist = (s) => {
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
            onChange = {(event) => {
              setInputValue(event.target.value)}}
            onKeyPress = {(event) => {
              if (event.key === 'Enter')
                appendTodolist(inputValue)}}
          />
          <InputButton onClick = {() => {appendTodolist(inputValue)}}>
            Add
          </InputButton>
        </AgendaInput>
      </TodolistAgenda>

      <TodolistDetail>
        <DetailTimer />
        <DetailSchedule schedule = {schedule} />
      </TodolistDetail>
    </>
  )
}
export default PageTodolist