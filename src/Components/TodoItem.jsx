import React, { useState } from 'react'
import styled from 'styled-components'

const ItemWrapper = styled.div`
  display: flex;
`
const CheckBox = styled.input.attrs({
  type: 'checkbox',
})``
const TimeBlock = styled.span`
  padding: 0 0 0 1rem;
`
const ContentBlock = styled.div`
  padding: 0 0 0 1rem;
`

export const ListItem = ({ item, idx, dispatch }) => {
  const [editable, setEditable] = useState(false)
  const [time, setTime] = useState('')

  return (
    <ItemWrapper>
      <CheckBox
        checked={item.check}
        onChange={() => {
          dispatch({ type: 'listCheck', value: idx })
        }}
      />

      {editable ? (
        <>
          <input
            type="time"
            value={time}
            onChange={(event) => {
              setTime(event.target.value)
            }}
          />
          <button
            onClick={() => {
              setEditable(false)
              let newTime = item.time - (item.time % 10000)
              newTime =
                newTime +
                parseInt(time.substring(0, 2)) * 100 +
                parseInt(time.substring(3, 5))
              dispatch({ type: 'editTime', value: { id: idx, time: newTime } })
            }}
          >
            OK
          </button>
        </>
      ) : (
        <TimeBlock onDoubleClick={() => setEditable(true)}>
          {item['time'].toString().substring(8, 10) +
            ':' +
            item['time'].toString().substring(10, 12)}
          {/* {item.time} */}
        </TimeBlock>
      )}

      <ContentBlock>
        {item.content === '' ? '@ ' + item.task : item.content}
      </ContentBlock>
    </ItemWrapper>
  )
}

export const TodoItem = ({ item, idx, dispatch }) => {
  return (
    <ItemWrapper>
      <CheckBox
        checked={item.check}
        onChange={() => {
          dispatch({ type: 'todoCheck', value: idx })
        }}
      />

      <ContentBlock>{item.content}</ContentBlock>
    </ItemWrapper>
  )
}
