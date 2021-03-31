const ListItem = ({item}) => {
  
  return (
    <div>

      <input type = 'checkbox'/>

      <span>{item['schedule'].toString().substring(8)}</span>

      <span>{item.content}</span>

    </div>
  )
}

export default ListItem