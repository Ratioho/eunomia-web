import React, { useState } from 'react'
import styled from 'styled-components'


// Time Block
const StyledTimeBlock = styled.div`
// outer: position, size, margin
  width: 110px;
  // margin-top: 2px;
  margin-left: 10px;

// inner: arrangement
  display: flex;
  flex-direction: column;
  align-items: center;

  // 
  cursor: ${props => props.isReadOnly === true
    ? 'pointer'
    : 'auto'};
`

const StyledCtrlPanel = styled.div`
// outer: position, size, margin
  width: 100%;

// inner: arrangement
  display: flex;
  justify-content: center;

// specs
  // background: red;
`
const StyledCtrlButton = styled.div`
// outer: position, size, margin
  margin: 2px;
  width: auto;

// specs: color, behavior
  background: whitesmoke;
  cursor: pointer;
  &:hover{
    background: gainsboro;
  }
`

// Content Block
const StyledContentBlock = styled.div`
// outer: position, size, margin
  // margin-top: 9px;
  margin-left: 15px;

// specs:
  font: inherit;
`


const Time = ({time, id, dispatch}) => {

  const [readOnly, setReadOnly] = useState(true)

  const ret = readOnly
      ?
    <StyledTimeBlock isReadOnly = {readOnly} onClick = {() => setReadOnly(false)}>
      {time.map((val, index) => <div key = {index}>{val}</div>)}
    </StyledTimeBlock>
      :
    <StyledTimeBlock isReadOnly = {readOnly}>
      {time.map((val, index) => 
        <input type = 'time' 
          value = {val} 
          key = {index} 
          onChange = {(event) => {
            dispatch({type: 'timeChange', value: id, extra: [index, event.target.value]})
          }}
        />)}
      <StyledCtrlPanel>
        <StyledCtrlButton onClick = {() => {
          dispatch({type: 'stash', value: id})
          setReadOnly(true)
        }}>
          Stash
        </StyledCtrlButton>
        <StyledCtrlButton onClick = {() => setReadOnly(true)}>OK</StyledCtrlButton>
      </StyledCtrlPanel>
    </StyledTimeBlock>

  return ret
}



// Row Wrapper
const StyledAgendaItem = styled.div`
// outer: position
  margin-bottom: 4px;

// inner: arrangement
  display: flex;
  align-items: end;

// specs: color, behavior
  cursor: auto;
  color: ${props => props.isStashed === true
    ? 'gainsboro'
    : 'black'};
`

const AgendaItem = ({info, id, dispatch}) => {

  return (
    <StyledAgendaItem isStashed = {info.isStashed}>
      
      {/* Statsh Padding */}
      {info.isStashed ? <div>Stashed</div> : null}

      {/* Checkbox */}
      <input type = 'checkbox'
        checked = {info.isChecked}
        onChange = {() => dispatch({type: 'check', value: id})}
        disabled = {info.isStashed}
      />

      {/* Time & Ctrl */}
      <Time time = {info.time} 
        id = {id} 
        dispatch = {dispatch} 
      />

      {/* Content */}
      <StyledContentBlock >
        {info.content}
      </StyledContentBlock>

    </StyledAgendaItem>
  )
}

export default AgendaItem