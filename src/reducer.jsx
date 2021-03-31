const getItemFromString = (s) => {
  const hasTime = s.substring(0, 4)
}

export const reducer = (state, action) => {
  const ret = [...state]
  switch(action.type) {
    case 'append':
      const item = getItemFromString(action.value)
      ret.push(item)
      ret.sort((a, b) => a.schedule - b.schedule)
      return ret
  }
}

export const todoReducer = (state, action) => {
  const ret = [...state]
  switch(action.type) {
    case 'check':
      ret[action.value].isChecked = !ret[action.value].isChecked
      return ret
    case 'stash':
      ret[action.value].isStashed = !ret[action.value].isStashed
      return ret
    case 'append':
      const item = {
        key: ret.length.toString(),
        ...action.value
      }
      ret.push(item)
      ret.sort((a, b) => a.time[0].localeCompare(b.time[0]))
      return ret
    case 'timeChange':
      ret[action.value].time[action.extra[0]] = action.extra[1]
      ret.sort((a, b) => a.time[0].localeCompare(b.time[0]))
      return ret
    default:
      return ret
  }
}


export const taskInitState = {
  category: {
    'work': {},
    'fit': {},
  },
  tasks: {
    'app development': {
      content: 'to develop a time management application for mac and windows'
    },
    'calculus tutorial': {
      content: 'to create a calculus tutorial based on Stewart Calculus'
    },
  }
}

export const taskReducer = (state, action) => state