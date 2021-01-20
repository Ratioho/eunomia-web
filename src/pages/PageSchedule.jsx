import React, {useState} from 'react'
import styled from 'styled-components'

const itemInfo = {
  state: 'unfinished',
  time: '1130',
  content: 'Getup, shower, brush teeth',
}

const Wrapper = styled.div`
  display: block;
`

const ScheduleItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: whitesmoke;
  cursor: auto;
`

const ItemCheckbox = styled.div`
  background: aqua;
  cursor: pointer;
`


const ScheduleItem = ({info}) => {

  const [completeStatus, setCompleteStatus] = useState(info.state)

  return (
    <ScheduleItemWrapper>
      <ItemCheckbox onClick = {() => setCompleteStatus('finished')}>
        {completeStatus === 'unfinished'
          ? '口'
          : 'X'}
      </ItemCheckbox>
      <div>{info.time}</div>
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
    </Wrapper>
  )
}

export default PageSchedule