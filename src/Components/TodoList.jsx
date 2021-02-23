import React, { useState } from 'react'
import styled from 'styled-components'
import TodoItem from './TodoItem'

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const ListHeader = styled.div`
`
const ListMain = styled.div`
`
const ListInput = styled.div`
`

const TodoList = ({state, dispatch}) => {

	const [inputValue, setInputValue] = useState('')


  return (
    <ListWrapper>
      <ListHeader>
        <h2>Today</h2>
      </ListHeader>
      <ListMain>
        <div>contents</div>
        {state.map((item, index) => (
          <TodoItem content = {item}
						index = {index}
						dispatch = {dispatch}
					/>
        ))}
      </ListMain>
      <ListInput>
        <input type = 'textarea' value = {inputValue}
					onChange = {(event) => {setInputValue(event.target.value)}}
				/>
				<button>Add</button>
      </ListInput>
    </ListWrapper>
  )
}

export default TodoList