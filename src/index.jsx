import React, { useEffect, useReducer, useState } from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import { ListItem, TodoItem } from './Components/TodoItem'
import { databaseList, listReducer, todoList, todoReducer } from './reducer'


const TodoListWrapper = styled.div`
  padding: 0 3rem 0 3rem;
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


const TodoList = () => {

  const [sList, listDispatch] = useReducer(listReducer, databaseList)
  const [tList, todoDispatch] = useReducer(todoReducer, todoList)
  console.log(sList)
  return (
    <TodoListWrapper>
      <Header>
        <h2>Today</h2>
        <div>
          {/* <input type = "file"
            onChange = {(event) => {
              let file = event.target.files[0]
              let reader = new FileReader()
              reader.readAsText(file)
              reader.onloadend = (e) => {
                setList(JSON.parse(e.target.result))
              }
            }}
          ></input> */}
          <button>save</button>
        </div>
      </Header>
      <Main>
        <h4>Scheduled</h4>
        {sList.map((item, index) => (
          <>
            <ListItem item = {item} key = {index}></ListItem>
            <hr />
          </>
        ))}

        {/* 暂时不写 */}
        {/* <h4>Block View</h4>
        <BlockView l = {filteredList} /> */}

        <h4>Todo</h4>
        {tList.map((item, index) => (
          <TodoItem item = {item} key = {index}></TodoItem>
        ))}
      </Main>
      <Footer>
        <input type='text' style = {{flex: 1}}/>
        <button style={{marginLeft: '2rem'}}>Add</button>
      </Footer>
    </TodoListWrapper>
  )
}

ReactDom.render(<TodoList />, document.getElementById('root'))



