import React, { useReducer, useState } from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import { ListItem, TodoItem } from './Components/TodoItem'
import { initState, reducer } from './reducer'


const TodoListWrapper = styled.div`
  padding: 0 1rem 0 1rem;
  overflow: auto;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Main = styled.div`
  overflow-wrap: break-word;
`
const Footer = styled.div`
  margin-top: 1rem;
  display: flex;
`
const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
`

const appendInput = (s, dispatch) => {
  // check if time included
  let h = parseInt(s.substring(0, 2))
  let m = parseInt(s.substring(2, 4))
  if (!isNaN(h) && !isNaN(m) && h >= 0 && h <= 24 && m >= 0 && m <= 60) {
    let dateObj = new Date()
    let timeString = dateObj.getFullYear() * 100000000 
        + dateObj.getMonth() * 1000000 + 1000000
        + dateObj.getDate() * 10000
        + h * 100 + m
    let newItem = {
      content: s.substring(4).trim(),
      time: timeString,
      check: false,
      duration: 5,
      task: ''
    }
    dispatch({type: 'listAppend', value: newItem})
  }
  else {
    let newItem = {
      content: s,
      check: false,
      task: ''
    }
    dispatch({type: 'todoAppend', value: newItem})
  }
}




const taskState = [
  {
    title: 'App Development',
    desc: 'a todo app with my thinking',
    time: 240,
    isOpen: false,
    children: [
      {
        title: 'App Development / structure refactor',
        desc: '',
        time: 60,
        isOpen: false,
        children: []
      },
      {
        title: 'App Development / task list',
        desc: '',
        time: 40,
        isOpen: false,
        children: []
      },
      {
        title: 'App Development / rethink storage',
        desc: '',
        time: 40,
        isOpen: false,
        children: []
      },
      {
        title: 'App Development / additional utilities',
        desc: 'duration view, calendar, etc',
        time: 0,
        isOpen: false,
        children: []
      }
    ]
  },
  {
    title: 'Math',
    desc: '',
    time: 300,
    isOpen: false,
    children: [
      {
        title: 'Math / Calculus',
        desc: '',
        time: 180,
        isOpen: false,
        children: [
          {
            title: 'Math / Calculus / Single variable',
            desc: '',
            time: 0,
            isOpen: false,
            children: []
          },
          {
            title: 'Math / Calculus / Multivariable',
            desc: '',
            time: 0,
            isOpen: false,
            children: []
          }
        ]
      },
      {
        title: 'Math / Linear Algebra',
        desc: '',
        time: 0,
        isOpen: false,
        children: []
      }
    ]
  }
]

const openFolder = (path) => {
  const titles = path.split('/')
  const paths = titles.reduce((acc, cur) => {
    return (
      acc.push(acc[-1] + cur)
    )
  }, [''])
  paths.shift()
  let currentList = taskState
  for (let i of paths) {
    let node = currentList.find((item) => item.title === i)
    currentList = node.children
  }
}


const TreeNodeWrapper = styled.div`
  padding-left: ${props => props.level / 2}rem;
`
const TreeNode = ({level, node}) => {
  return (
    <TreeNodeWrapper level = {level}>
      <span>{node.isOpen ? '- ' : '+ '}</span>
      <span>{node.title}</span>
      {
        node.isOpen && node.children.length > 0
        ?
        node.children.map((item) => TreeNode({level: level+1, node: item}))
        :
        null
      }
    </TreeNodeWrapper>
  )
}

const TodoList = () => {

  const [state, dispatch] = useReducer(reducer, initState)
  const [input, setInput] = useState('')
 
  return (
    <PageWrapper>
      <TodoListWrapper>
        <Header>
          <h2>Today</h2>
          <div>
            <button>save</button>
          </div>
        </Header>
        <Main>
          <h4>Scheduled</h4>
          {state.sList.map((item, index) => (
            <>
              <ListItem 
                item = {item} 
                key = {index} 
                idx = {index} 
                dispatch = {dispatch}
              />
              <hr />
            </>
          ))}
          <h4>Todo</h4>
          {state.tList.map((item, index) => (
            <TodoItem 
              item = {item} 
              key = {index} 
              idx = {index} 
              dispatch = {dispatch}
            />
          ))}
        </Main>
        <Footer>
          <input type='text' style = {{flex: 1}}
            value = {input}
            onChange = {(event) => {
              setInput(event.target.value)
            }}
            onKeyPress = {(event) => {
              if (event.key === 'Enter') {
                appendInput(input, dispatch)
                setInput('')
              }
            }}
          />
          <button style={{marginLeft: '2rem'}}
            onClick = {() => {
              appendInput(input, dispatch)
              setInput('')
            }}
          >
            Add
          </button>
        </Footer>
      </TodoListWrapper>
      <TodoListWrapper>
        {/* <div style={{fontSize: '4rem'}}>17:39</div> */}
        <div>
          <Header>
          <h4>Home / App Development</h4>
          <button>show clock</button>
          </Header>
          <div style={{fontSize: '3rem', paddingLeft: '2rem', fontFamily: 'sans-serif'}}>17:39</div>
          {/* <ul>
            <li>Structure refactor</li>
            <li>Init task list</li>
            <li>Rethink storage</li>
            <li>Additional Functions</li>
          </ul> */}
          {taskState.map((node) => TreeNode({level: 0, node: node}))}
        </div>
      </TodoListWrapper>
    </PageWrapper>
  )
}

ReactDom.render(<TodoList />, document.getElementById('root'))



