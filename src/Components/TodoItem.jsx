import styled from 'styled-components'


const ItemWrapper = styled.div`
  display: flex;
`


const ListItem = ({content, index, dispatch}) => {
  
  return (
    <ItemWrapper>

      {content.isStashed ? <span>Stashed</span> : null}

      <input type = 'checkbox'
        checked = {content.isChecked}
        onChange = {() => {dispatch({type: 'check', value: index})}}
      />

      <div>{content.content}</div>

    </ItemWrapper>
  )
}

export default ListItem