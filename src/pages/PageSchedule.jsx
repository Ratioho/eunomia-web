import React, {useState} from 'react'
import styled from 'styled-components'

const itemInfo = {
  state: 'unfinished',
  time: '1130',
  content: 'Getup, shower, brush teeth',
}

const spanInfo = {
  state: 'unfinished',
  time: '1200-1600',
  content: 'App development',
}

const Wrapper = styled.div`
  display: block;
`

const ScheduleItemWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  background: whitesmoke;
  cursor: auto;
`

const ItemTime = styled.div`
  background: aqua;
  cursor: pointer;
`

const SpanTime = styled.div`
  display: block;
  background: aqua;
`

/**
 * item 的若干种状态：
 * 1. todo
 * 2. done
 * 3. seal
 */
const ScheduleItem = ({info}) => {

  const [completeStatus, setCompleteStatus] = useState(info.state)
  const [isChecked, setIsChecked] = useState(false)
  const [timeFocus, setTimeFocus] = useState(false)

  const TimeFunctions = ({setVisible}) => {

    return (
      <>
        <button>postpone</button>
        <button>stash</button>
        {/* Confirm & Cancel */}
        <button
          onClick = {() => setVisible(false)}
        >cancel</button>
      </>
    )
  }


  return (
    <ScheduleItemWrapper>
      <input 
        // onClick={props.handleCheckChieldElement} 
        onChange = {(event) => {setIsChecked(event.target.checked)}}
        type="checkbox" 
        checked={isChecked} />
      <ItemTime
        onClick = {() => {setTimeFocus(true)}}
      >{info.time}</ItemTime>
      {timeFocus
        ? <TimeFunctions setVisible = {setTimeFocus}/>
        : null}
      <div>{info.content}</div>
    </ScheduleItemWrapper>
  )
}


const ScheduleSpan = ({info}) => {

  const [isChecked, setIsChecked] = useState(false)

  return (
    <ScheduleItemWrapper>
      <input 
        // onClick={props.handleCheckChieldElement} 
        onChange = {(event) => {setIsChecked(event.target.checked)}}
        type="checkbox" 
        checked={isChecked} />
      <SpanTime>
        <div>1200</div>
        <div>....|....</div>
        <div>1600</div>
      </SpanTime>
      <div>{info.content}</div>
    </ScheduleItemWrapper>
  )
}

const PageSchedule = () => {
  return (
    <Wrapper>
      <h2>Schedule Page: Now used for item test</h2>
      <p>{JSON.stringify(itemInfo)}</p>
      <ScheduleItem info = {itemInfo} />
      <ScheduleSpan info = {spanInfo} />
    </Wrapper>
  )
}

export default PageSchedule