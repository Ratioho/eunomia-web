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
  // align-items: center;

// specs: color, behavior
  cursor: auto;
  color: ${props => 
    props.isStashed === true 
      ? "gainsboro" 
      : "black"};
`
const AgendaItemTimeSpot = styled.div`
// outer: position, size, margin
  margin-left: 15px;
  width: 50px;
// inner: arrangement
  display: flex;
  flex-direction: column;
  align-items: center;

// specs: color, behavior
  cursor: pointer;
`
const AgendaItemContent = styled.div`
// outer: position, size, margin
  margin-left: 15px;
`

const Ctrls = styled.div`
// inner: arrangement
    display: flex;
    justify-content: center;
`
const CtrlButton = styled.div`
// outer: position, size, margin
    margin: 2px;

// specs: color, behavior
    cursor: pointer;
    background: whitesmoke;
    &:hover{
      background: gainsboro;
    }
`

const StyledInput = styled.input.attrs(props => ({
  // we can define static props
  type: "time",

  // or we can define dynamic ones
  size: props.size || "1em",
}))`
  // color: palevioletred;
  // font-size: 1em;
  // border: 2px solid palevioletred;
  // border-radius: 3px;

  /* here we use the dynamically computed prop */
  // margin: ${props => props.size};
  // padding: ${props => props.size};

  border: none;

  ::-webkit-datetime-edit-fields-wrapper {
    // display: flex;
  }
  ::-webkit-datetime-edit-text {
    // padding: 1px 1px;
  }
  &:hover{
    cursor: pointer;
  }
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


const AgendaItemTime = ({time, id, dispatch}) => {

  const [ctrlMode, setCtrlMode] = useState(false)
  
  return (
    <AgendaItemTimeSpot>
      {
        time.length > 5 
          ?
        <div onClick = {() => {setCtrlMode(!ctrlMode)}}>
          <div>{time.substring(0, 4)}</div>
          <div>-</div>
          <div>{time.substring(5, 9)}</div>
        </div>
          :
        <div onClick = {() => {setCtrlMode(!ctrlMode)}}>{time}</div>
      }
      
      {
        ctrlMode
          ?
        <Ctrls>
          <CtrlButton>P</CtrlButton>
          <CtrlButton onClick = {() => dispatch({type: 'stash', value: id})}>S</CtrlButton>
          <CtrlButton>O</CtrlButton>
        </Ctrls>
          :
        null
      }
    </AgendaItemTimeSpot>
  )

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
    <AgendaItem isStashed = {info.isStashed}>
      {info.isStashed ? <div>Stashed</div> : null}
      <input type = 'checkbox'
        checked = {info.isChecked}
        onChange = {() => dispatch({type: 'check', value: id})} />
      <div>{id}</div>
      {/* <AgendaItemTimeSpot onClick = {() => setVisibleControl(!visibleControl)}>
        {visibleControl ? <Control /> : info.time}
      </AgendaItemTimeSpot> */}
      
      <AgendaItemTime time = {info.time} id = {id} dispatch = {dispatch}/>

      <AgendaItemContent>
        {info.content}
      </AgendaItemContent>
    </AgendaItem>
  )

}


const PageTodolist = () => {

  const [inputValue, setInputValue] = useState('')


  const [todoState, todoDispatch] = useReducer(reducer, initialState)

  const [read, setRead] = useState(true)

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

        {/* Time Try out */}
        <input type='time'/>

        {/* Styled */}
        <StyledInput readOnly = {read} onClick = {() => {setRead(false)}}/>
        <button onClick = {() => {setRead(true)}}>okay</button>

      </TodolistAgenda>
  )
}
export default PageTodolist