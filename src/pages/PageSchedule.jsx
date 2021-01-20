import React, {useState} from 'react'
import styled from 'styled-components'

const itemInfo = {
  state: 'unfinished',
  time: '1130',
  content: 'Get up, shower, brush teeth',
}

const spanInfo = {
  state: 'unfinished',
  time: '1200-1600',
  content: 'App development',
}





// Styles

const Wrapper = styled.div`
// outer: position, size, margin
  height: 100%;
  width: 100%;
  margin: 0;

// inner: arrangement
  display: flex;
  flex-direction: column;

// specs: color, behavior
`

const ScheduleItemWrapper = styled.div`
  display: flex;
  cursor: auto;
`


const ItemTime = styled.div`
  cursor: pointer;
  margin-left: 15px;
  // flex: 1%;
  width: 50px;
`
const ItemContent = styled.div`
  margin-left: 15px;
  // flex: 70%;
`


/**
 * item 的若干种状态：
 * 1. todo
 * 2. done
 * 3. seal
 */
const ScheduleItem = ({info}) => {

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
        onChange = {(event) => {setIsChecked(event.target.checked)}}
        type="checkbox" 
        checked={isChecked} />
      <ItemTime
        onClick = {() => {setTimeFocus(true)}}
      >{info.time}</ItemTime>
      {timeFocus
        ? <TimeFunctions setVisible = {setTimeFocus}/>
        : null}
      <ItemContent>{info.content}</ItemContent>
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
      <ItemTime>
        <div>1200</div>
        <div>....|....</div>
        <div>1600</div>
      </ItemTime>
      <ItemContent>{info.content}</ItemContent>
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