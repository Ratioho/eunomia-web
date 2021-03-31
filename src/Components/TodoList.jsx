import React, { useState } from 'react'
import styled from 'styled-components'
import TodoItem from './TodoItem'

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ListMain = styled.div`
`
const ListInput = styled.div`
`

const TodoList = ({state, dispatch}) => {

	const [inputValue, setInputValue] = useState('')
  const [currentState, setCurrentState] = useState('')

  React.useEffect(() => {

  })

  return (
    <ListWrapper>
      <ListHeader>
        <h2>Today</h2>
        <div>
        <input type="file" onChange = {(event) => {
          
          let file = event.target.files[0]
          console.log(file)

          let reader = new FileReader()
          reader.readAsText(file)
          reader.onloadend = (e) => {
            // console.log(e.target.result)
            setCurrentState(e.target.result)
          }
          
        }} />
        <button>Save</button>
        </div>
      </ListHeader>
      <ListMain>
        <div>contents</div>
        <div>{currentState}</div>
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