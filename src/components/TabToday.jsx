import React, { useState } from 'react'
import styled from 'styled-components'

const DivToday = styled.div`display: flex;`

const DivTodayLeft = styled.div`
  flex: 1;
  border-right: 1px solid grey;
  height: 100vh;
  padding: 15px 0px 0px 15px;
`

const DivTodayRight = styled.div`
  flex: 1;
  height: 100vh;  
  padding: 15px 0px 0px 15px;
`

const InputLine = styled.div`
  display: flex;
  margin: 5px 20px 0px 0px;
`
const InputArea = styled.input`
  flex : 1;
  margin-right: 5px;
`

const InputButton = styled.div`
  background: whitesmoke;
  padding: 5px;
  border-radius: 5px;
  &:hover{
    background: gainsboro;
    cursor: pointer;
  }
`

const ListBox = styled.div`
  padding: 10px 0px 10px 5px;
`

const TodoItem = ({data}) => {
  return (
    <div>{data}</div>
  )
}



// Digital Clock
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div style={{background: 'black'}}>
        <span style={{fontSize: 48, color: 'white'}}>{this.state.date.toLocaleTimeString()}</span>
      </div>
    );
  }
}





const TabToday = () => {

  const [todoItems, setTodoItems] = useState([])
  const [inputValue, setInputValue] = useState('')

  return (
    <DivToday>
      <DivTodayLeft>
        {/* Header */}
          <div style={{fontSize: 28}}>Today</div>
        {/* Content */}
          <ListBox>
            {todoItems.map((info) => <TodoItem data={info} />)}
          </ListBox>
          
          <InputLine>
            <InputArea type='text' value={inputValue}
              onChange={(event)=>{setInputValue(event.target.value)}}
              onKeyPress={(event)=>{
                if (event.key === 'Enter') {
                  setTodoItems([...todoItems, inputValue])
                  setInputValue('')
                }
              }} 
            />
            <InputButton 
              onClick={()=>{
                setTodoItems([...todoItems, inputValue])
                setInputValue('')}}>
              Add
            </InputButton>
          </InputLine>
      </DivTodayLeft>
      <DivTodayRight>
        {/* Clock */}
        <Clock />
      </DivTodayRight>
    </DivToday>
  )
}

export default TabToday