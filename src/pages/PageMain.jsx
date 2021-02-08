import React, { useState, useReducer } from 'react'
import styled from 'styled-components'
import AgendaItem from './AgendaItem'
import PageSchedule from './PageSchedule'


const initialState = [
  // 随着排序的进行，key可能会变化。想象一个场景：我们把第一个项目删了，再添加一个项目，
  // 则 key 会重复。所以在这里应当删掉。
  {
    key: '0',
    type: 'spot',
    isChecked: false,
    isStashed: false,
    time: ['11:30'],
    content: 'Get up, shower, brush teeth',
  },
  {
    key: '1',
    type: 'span',
    isChecked: false,
    isStashed: false,
    time: ['00:30', '16:00'],
    content: 'Eunomia app development',
  },
]

const categoryInitState = {
  // Long-term, routine like activities,
  // like work, study, fitness, chore, etc
  'work': {},
  'fit': {},
}

const okrInitState = {
  // Goals to achieve
  'app development': {
    content: 'to develop a time management application for mac and windows'
  },
  'calculus tutorial': {
    content: 'to create a calculus tutorial based on Stewart Calculus'
  }
}

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
        ...action.value
      }
      ret.push(item)
      ret.sort((a, b) => a.time[0].localeCompare(b.time[0]))
      return ret
    case 'timeChange':
      ret[action.value].time[action.extra[0]] = action.extra[1]
      ret.sort((a, b) => a.time[0].localeCompare(b.time[0]))
      return ret
    default:
      return ret
  }
}


const categoryReducer = (state, action) => state
const okrReducer = (state, action) => state


const StyledPageWrapper = styled.div`
// outer: position, size, margin
  flex: 1;

// inner: arrangement
  padding: 0 20px 0 20px;

// specs: color, behavior
  border-right: 1px solid black;
`

const StyledAgendaHeader = styled.div`
`
const StyledAgendaList = styled.div`
`
const StyledAgendaInput = styled.div`
  display: flex;
  width: 400px;
  margin-top: 15px;
`

const TaskPageWrapper = styled.div`
  // flex: 0.8;
  height: 100%;
  overflow-y: auto;
  width: 230px;
  border-right: 1px solid black;
`


const parseInput = (s, dispatch) => {
  const item = {
    type: 'spot',
    isChecked: false,
    isStashed: false,
    time: [],
    content: '',
  }
  item.time.push(s.substring(0, 5))
  item.content = s.substring(6)
  // console.log(item)
  dispatch({type: 'append', value: item})
}



const PageTodolist = () => {

  const [todoState, todoDispatch] = useReducer(reducer, initialState)
  const [catState, catDispatch] = useReducer(categoryReducer, categoryInitState)
  const [okrState, okrDispatch] = useReducer(okrReducer, okrInitState)

  const [agendaInput, setAgendaInput] = useState('')

  return (
    <>

    <StyledPageWrapper>

      <StyledAgendaHeader>
        <h2>Today</h2>
      </StyledAgendaHeader>
      

      <StyledAgendaList>
        {todoState.map((item, index) =>
          <AgendaItem key = {item.key}
            info = {item}
            id = {index}
            dispatch = {todoDispatch}
          />
        )}
      </StyledAgendaList>

      {/* Input */}
      <StyledAgendaInput>
        <input type = 'textarea' value = {agendaInput}
          onChange = {(event) => setAgendaInput(event.target.value)}
          onKeyPress = {(event) => {
            if (event.key === 'Enter') {
              parseInput(agendaInput, todoDispatch)
              setAgendaInput('')
            }
          }}
          style = {{flex: 1}}
        />
        <button onClick = {() => {
          parseInput(agendaInput, todoDispatch)
          setAgendaInput('')
        }}>
          Add
        </button>
      </StyledAgendaInput>

    </StyledPageWrapper>


    <TaskPageWrapper>
      <PageSchedule />
    </TaskPageWrapper>
    </>
  )
}


export default PageTodolist