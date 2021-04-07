const getItemFromString = (s) => {
  const hasTime = s.substring(0, 4)
}



export const databaseList = [
	{
		"content": "Shower, brunch & laundry",
		"time": 202103241000,
    "status": "",
		"duration": 50,
		"task": "Everyday Struggle"
	},
	{
		"content": "Work",
		"time": 202103241300,
    "status": "",
		"duration": 240,
		"task": "Work"
	},
	{
		"content": "Todo App Development",
		"time": 202103242000,
    "status": "",
		"duration": 90,
		"task": "App Development/Structure refactor"
	},
	{
		"content": "Learn calculus",
		"time": 202103242200,
    "status": "",
		"duration": 50,
		"task": "Math"
	}
]

export const todoList = [
  {
		"content": "Chat with my friends",
    "status": "",
		"task": ""
	},
	{
		"content": "Watch a film of Homer",
    "status": "",
		"task": "Film"
	}
]

export const listReducer = (state, action) => {
  switch(action.type) {
    case 'append':
      return [...state, action.value].sort((a, b) => a.time - b.time)
    case 'remove':
      return [...state].splice(action.value, 1)
    case 'edit':
      return [...state].splice(action.value.idx, 1, action.value.item)
    default:
      return state
   }
}

export const todoReducer = (state, action) => {
  switch(action.type) {
    case 'append':
      return [...state, action.value]
    case 'remove':
      return [...state].splice(state.length-1, 1)
    default:
      return state
  }
}