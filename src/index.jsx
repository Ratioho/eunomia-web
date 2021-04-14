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
    let timeString =
      dateObj.getFullYear() * 100000000 +
      dateObj.getMonth() * 1000000 +
      1000000 +
      dateObj.getDate() * 10000 +
      h * 100 +
      m
    let newItem = {
      content: s.substring(4).trim(),
      time: timeString,
      check: false,
      duration: 5,
      task: '',
    }
    dispatch({ type: 'listAppend', value: newItem })
  } else {
    let newItem = {
      content: s,
      check: false,
      task: '',
    }
    dispatch({ type: 'todoAppend', value: newItem })
  }
}

const taskState = [
  {
    title: 'App Development',
    desc: 'a todo app with my thinking',
    time: 240,
    isOpen: true,
    children: [
      {
        title: 'structure refactor',
        desc: '',
        time: 60,
        isOpen: true,
        children: [],
      },
      {
        title: 'task list',
        desc: '',
        time: 40,
        isOpen: true,
        children: [],
      },
      {
        title: 'rethink storage',
        desc: '',
        time: 40,
        isOpen: true,
        children: [],
      },
      {
        title: 'additional utilities',
        desc: 'duration view, calendar, etc',
        time: 0,
        isOpen: true,
        children: [],
      },
    ],
  },
  {
    title: 'Math',
    desc: '',
    time: 300,
    isOpen: true,
    children: [
      {
        title: 'Calculus',
        desc: '',
        time: 180,
        isOpen: true,
        children: [
          {
            title: 'Single variable',
            desc: '',
            time: 0,
            isOpen: true,
            children: [],
          },
          {
            title: 'Multivariable',
            desc: '',
            time: 0,
            isOpen: true,
            children: [],
          },
        ],
      },
      {
        title: 'Linear Algebra',
        desc: '',
        time: 0,
        isOpen: true,
        children: [],
      },
    ],
  },
]

const initFolderState = (state, path) => {
  let f = {}
  for (let item of state) {
    let name = path + ' / ' + item.title
    f[name] = item.children.length > 0
    // if (path === 'Home') {
    //   f[name] = false
    // }
    if (item.children.length > 0) {
      let kids = initFolderState(item.children, name)
      f = { ...f, ...kids }
    }
  }
  return f
}

const folderState = initFolderState(taskState, 'Home')

const TreeNodeWrapper = styled.div`
  padding-left: ${(props) => props.level / 2}rem;
`
const TreeNode = ({ level, node, path, expand, setExpand }) => {
  const currentPath = path + ' / ' + node.title
  return (
    <TreeNodeWrapper level={level}>
      <span
        onClick={() => {
          if (node.children.length > 0) {
            setExpand((prev) => {
              return { ...prev, [currentPath]: !prev[currentPath] }
            })
          }
        }}
      >
        {expand[currentPath] ? '+ ' : '- '}
      </span>
      <span>{node.title}</span>
      {!expand[currentPath] && node.children.length > 0
        ? node.children.map((item, index) => (
            <TreeNode
              level={level + 1}
              node={item}
              path={currentPath}
              expand={expand}
              setExpand={setExpand}
              key={index}
            />
          ))
        : null}
    </TreeNodeWrapper>
  )
}

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, initState)
  const [input, setInput] = useState('')
  const [expand, setExpand] = useState(folderState)

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
                item={item}
                key={index}
                idx={index}
                dispatch={dispatch}
              />
              <hr />
            </>
          ))}
          <h4>Todo</h4>
          {state.tList.map((item, index) => (
            <TodoItem item={item} key={index} idx={index} dispatch={dispatch} />
          ))}
        </Main>
        <Footer>
          <input
            type="text"
            style={{ flex: 1 }}
            value={input}
            onChange={(event) => {
              setInput(event.target.value)
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                appendInput(input, dispatch)
                setInput('')
              }
            }}
          />
          <button
            style={{ marginLeft: '2rem' }}
            onClick={() => {
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
          <div
            style={{
              fontSize: '3rem',
              paddingLeft: '2rem',
              fontFamily: 'sans-serif',
            }}
          >
            17:39
          </div>
          {taskState.map((node) => (
            <TreeNode
              level={0}
              node={node}
              path="Home"
              expand={expand}
              setExpand={setExpand}
            />
          ))}
        </div>
      </TodoListWrapper>
    </PageWrapper>
  )
}

ReactDom.render(<TodoList />, document.getElementById('root'))
