import styled from 'styled-components'
import ReactDom from 'react-dom'
import React, {useState} from 'react'

import TabToday from './components/TabToday'
import TabTask from './components/TabTask'
import TabCalendar from './components/TabCalendar'
import TabAnalysis from './components/TabAnalysis'
import TabEpiphany from './components/TabEpiphany'

// Application Frame Render Spcifications
const root = document.getElementById('root')
const MainFrame = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;

  // web only
  border: 1px solid black;
`

// Navigation Menu & Content Wrapper
const Navigation = styled.div`
  background: whitesmoke;
  height: 100vh;
  width: 200px;
  padding: 20px 0px 0px 0px;
  
  display: flex;
  flex-direction: column;
`
const NavButtons = styled.div`
  font-size: 18px;
  margin: 2px 0px 2px 0px;
  padding: 5px 0px 5px 30px;

  background: ${props => 
    props.active === true 
      ? "gainsboro" 
      : "whitesmoke"};
  &:hover{
    background: gainsboro;
    cursor: pointer;
  }
`
const Content = styled.div`
  padding: 0px;
  height: 100vh;
  flex: 1;
`


const App = () => {

  const [activeTab, setActiveTab] = useState('dp')

  const buttons = [
    { key: 'dp', val: 'Your Day'},
    { key: 'td', val: 'Tasks'},
    { key: 'gt', val: 'Calendar'},
    { key: 'an', val: 'Analysis'},
    { key: 'ht', val: 'Epiphany'},
  ]

  const contents = {
    'dp': <TabToday />,
    'td': <TabTask />,
    'gt': <TabCalendar />,
    'an': <TabAnalysis />,
    'ht': <TabEpiphany />
  }

  return (
    <React.Fragment>
      <Navigation>
        <h2 style = {{paddingLeft: 25, marginTop: 0, color: 'lightcoral'}}>Eunomia</h2>
        {buttons.map((item) => <NavButtons onClick={()=>{setActiveTab(item.key)}} active={item.key === activeTab}>{item.val}</NavButtons>)}
      </Navigation>
      <Content>
        {contents[activeTab]}
      </Content>
    </React.Fragment>
  )
}


ReactDom.render(<MainFrame><App /></MainFrame>, root)