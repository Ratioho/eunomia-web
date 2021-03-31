import React, { useEffect, useReducer, useState } from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components'
import ListItem from './Components/TodoItem'

const tempInitList = [
	{
		"content": "Shower, brunch & laundry",
		"schedule": 202103241000,
		"duration": 50,
		"task": "Everyday Struggle"
	},
	{
		"content": "Work",
		"schedule": 202103241300,
		"duration": 240,
		"task": "Work"
	},
	{
		"content": "Todo App Development",
		"schedule": 202103242000,
		"duration": 90,
		"task": "App Development/Structure refactor"
	},
	{
		"content": "Learn calculus",
		"schedule": 202103242200,
		"duration": 50,
		"task": "Math"
	},
	{
		"content": "Watch a film of Homer",
		"schedule": 202103250100,
		"duration": 90,
		"task": "Film"
	}
]








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

  const [list, setList] = useState(tempInitList)

  return (
    <TodoListWrapper>
      <Header>
        <h2>Today</h2>
        <div>
          <input type = "file"
            onChange = {(event) => {
              let file = event.target.files[0]
              let reader = new FileReader()
              reader.readAsText(file)
              reader.onloadend = (e) => {
                setList(JSON.parse(e.target.result))
              }
            }}
          ></input>
          <button>save</button>
        </div>
      </Header>
      <Main>
        {list.map((item, index) => (
          <ListItem item = {item} key = {index}></ListItem>
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



