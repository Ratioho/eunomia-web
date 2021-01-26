import React, { useState } from 'react'
import styled from 'styled-components'

// Row Wrapper
const StyledAgendaItem = styled.div`
// inner: arrangement
  display: flex;
  align-items: end;

// specs: color, behavior
  cursor: auto;
  color: ${props => props.isStashed === true
    ? 'gainsboro'
    : 'black'};
`

// Checkbox Block
const StyledCheckbox = styled.input`
// outer: position, size, margin
  margin-top: 10px;
`


// Time Block
const StyledTimeBlock = styled.div`
// outer: position, size, margin
  width: 110px;
  margin-top: 2px;
  margin-left: 10px;

// inner: arrangement
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledTimeInput = styled.input`
  display: block;
  margin: 5px 5px 5px 20px;
  flex: 1;
  border: none;
  font-size: inherit;
  font: inherit;
  cursor: ${props => props.isReadOnly === true
    ? 'pointer'
    : 'auto'};
  color: ${props => props.isReadOnly === true
    ? 'red'
    : 'black'};
`

const StyledCtrlPanel = styled.div`
// outer: position, size, margin
  width: 100%;

// inner: arrangement
  display: flex;
  justify-content: stretch;

// specs
  background: red;
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
  margin-top: 9px;
  margin-left: 15px;

// specs:
  font: inherit;
`

const AgendaItem = ({info, id, dispatch}) => {

  const [ctrlVisible, setCtrlVisible] = useState(false)

  return (
    <StyledAgendaItem isStashed = {info.isStashed}>
      
      {/* Statsh Padding */}
      {info.isStashed ? <div>Stashed</div> : null}

      {/* Checkbox */}
      <StyledCheckbox type = 'checkbox'
        checked = {info.isChecked}
        onChange = {() => dispatch({type: 'check', value: id})} 
        disabled = {info.isStashed}
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
                type = 'time'
                value = {info.time[0]}
                onChange = {(event) => {
                  dispatch({type: 'timeChange', value: id, extra: event.target.value})
                }}
                readOnly = {!ctrlVisible}
                // disabled = {!info.isStashed}
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
      <StyledContentBlock>{info.content}</StyledContentBlock>

    </StyledAgendaItem>
  )
}

export default AgendaItem