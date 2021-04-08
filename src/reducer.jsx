export const databaseList = [
	{
		"content": "Shower, brunch & laundry",
		"time": 202104081000,
    "check": false,
		"duration": 50,
		"task": "Everyday Struggle"
	},
	{
		"content": "Work",
		"time": 202104081300,
    "check": false,
		"duration": 240,
		"task": "Work"
	},
	{
		"content": "",
		"time": 202104082000,
    "check": false,
		"duration": 90,
		"task": "App Development/Structure refactor"
	},
	{
		"content": "",
		"time": 202104082200,
    "check": false,
		"duration": 50,
		"task": "Math/Calculus"
	}
]

export const todoList = [
  {
		"content": "Chat with my friends",
    "check": false,
		"task": ""
	},
	{
		"content": "Watch a film of Homer",
    "check": false,
		"task": "Film"
	}
]

export const initState = {
  sList: databaseList,
  tList: todoList
}

export const reducer = (state, action) => {
  switch(action.type) {
    case 'listAppend':
      return {
        sList: [...state.sList, action.value].sort((a, b) => a.time - b.time),
        tList: state.tList
      }
    case 'listCheck':
      let newItem = {
        ...state.sList[action.value],
        "check": !state.sList[action.value].check
      }
      let newList = [...state.sList]
      newList.splice(action.value, 1, newItem)
      return {
        sList: newList,
        tList: state.tList
      }
    case 'editTime':
      let newEditList = [...state.sList]
      newEditList[action.value.id].time = action.value.time
      newEditList.sort((a, b) => a.time - b.time)
      return {
        sList: newEditList,
        tList: state.tList
      }
    case 'todoAppend':
      return {
        sList: state.sList,
        tList: [...state.tList, action.value]
      }
    case 'todoCheck':
      let dateObj = new Date()
      let timeString = dateObj.getFullYear() * 100000000 
        + dateObj.getMonth() * 1000000 + 1000000
        + dateObj.getDate() * 10000
        + dateObj.getHours() * 100 
        + dateObj.getMinutes()
      let newItemCheck = {
        ...state.tList[action.value],
        time: timeString,
        duration: 5,
        check: true
      }
      let newListCheck = [...state.tList]
      newListCheck.splice(action.value, 1)
      return {
        sList: [...state.sList, newItemCheck].sort((a, b) => a.time - b.time),
        tList: newListCheck
      }
    default:
      return state
  }
}