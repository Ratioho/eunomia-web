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

const getTime = (t) => {
  let s = t.toString().substring(8)
  return s.substring(0, 2) + ':' + s.substring(2, 4)
}

export const BlockView = ({l}) => {

  const tMin = l[0].schedule.toString().substring(8, 10)
  const tMax = l[l.length-1].schedule.toString().substring(8, 10)
  const f = []
  let k = 0
  for (let i = parseInt(tMin); i <= parseInt(tMax); i++) {
    const t = i.toString() + ':00'
    if (k < l.length && t === getTime(l[k].schedule)) {
      f.push({
        time: t,
        content: l[k].content
      })
      k = k + 1
    }
    else {
      f.push({
        time: t,
        content: ""
      })
    }
  }
  return (
    <div>
      <table  style={{borderCollapse: 'collapse'}}>
        {f.map((item) => 
          <tr >
            <td style={{border: '1px solid grey'}}>  {item.time}  </td>
            <td style={{border: '1px solid grey', width: '100%'}}>{item.content}</td>
          </tr>)}
      </table>
    </div>
  )
}