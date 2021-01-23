import React, { useState, useReducer } from 'react'
import styled from 'styled-components'


const StyledAgendaItem = styled.div`
// inner: arrangement
  display: flex;
  align-items: center;

// specs: color, behavior
  cursor: auto;
  color: ${props => props.isStashed === true
    ? 'gainsboro'
    : 'black'};
`
const StyledTimeBlock = styled.div`
// outer: position, size, margin
  // width: 70px;

// inner: arrangement
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledTimeInput = styled.input.attrs(props => ({
  type: 'time',
}))`
  display: block;
  margin: 5px;
  flex: 1;
  border: none;
`

const StyledCtrlPanel = styled.div`
// inner: arrangement
  display: flex;
  justify-content: center;
`
const StyledCtrlButton = styled.div`
// outer: position, size, margin
  margin: 2px;

// specs: color, behavior
  background: whitesmoke;
  cursor: pointer;
  &:hover{
    background: gainsboro;
  }
`

const AgendaItem = ({info, id, dispatch}) => {

  const [ctrlVisible, setCtrlVisible] = useState(false)

  return (
    <StyledAgendaItem isStashed = {info.isStashed}>
      
      {/* Statsh Padding */}
      {info.isStashed ? <div>Stashed</div> : null}

      {/* Checkbox */}
      <input type = 'checkbox'
        checked = {info.isChecked}
        onChange = {() => dispatch({type: 'check', value: id})} 
      />

      {/* Time & Ctrl */}
      <StyledTimeBlock>
        <div onClick = {() => setCtrlVisible(!ctrlVisible)}>
          {
            info.time.length > 1
              ?
            <>
              <div>block</div>
            </>
              :
            <>
              <StyledTimeInput 
                value = {info.time[0]}
                onChange = {(event) => {
                  dispatch({type: 'timeChange', value: id, extra: event.target.value})
                }}
              />
            </>
          }
        </div>
        {
          ctrlVisible
            ?
          <StyledCtrlPanel>
            <StyledCtrlButton>Po</StyledCtrlButton>
            <StyledCtrlButton>Ss</StyledCtrlButton>
            <StyledCtrlButton>OK</StyledCtrlButton>
          </StyledCtrlPanel>
            :
          null
        }
      </StyledTimeBlock>

      {/* Content */}
      <div>{info.content}</div>

    </StyledAgendaItem>
  )
}






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
    time: ['12:00', '16:00'],
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
        time: '00:00',
        content: action.value
      }
      ret.push(item)
      return ret
    case 'timeChange':
      ret[action.value].time = [action.extra]
      console.log(ret)
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