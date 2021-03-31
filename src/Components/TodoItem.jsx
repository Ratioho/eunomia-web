import styled from 'styled-components'

const CheckBox = styled.input.attrs({ 
  type: 'checkbox',
})`
  width:0.71rem;
  height:0.71rem;
`
const TimeBlock = styled.span`
  padding: 0 1rem 0 1rem;
`


const Time = ({t}) => {
  const s = t.substring(0, 2) + ':' + t.substring(2, 4)
  return (
    <TimeBlock>
      {s}
    </TimeBlock>
  )
}


export const ListItem = ({item}) => {
  
  return (
    <div>

      <CheckBox />

      <Time t = {item['schedule'].toString().substring(8)} />

      <span>{item.content}</span>

    </div>
  )
}

export const Item = ({item}) => {
  return (
    <div>

      <CheckBox />

      <TimeBlock>{item.content}</TimeBlock>

    </div>
  )
}

export const BlockView = ({l}) => {

  const tMin = l[0].schedule.toString().substring(8, 10)
  const tMax = l[l.length-1].schedule.toString().substring(8, 10)
  const f = []
  for (let i = parseInt(tMin); i <= parseInt(tMax); i++) {
    f.push(i.toString() + ':00')
  }
  return (
    <div>
      <table style = {{border: "1px solid black"}}>
        {f.map((item) => <tr>{item}</tr>)}
      </table>
    </div>
  )
}