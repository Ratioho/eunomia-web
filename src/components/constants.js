export const todoList = [
  {
    time: '11.30',
    content: 'get up',
    type: 'default',
    value: 'default',
  },
  {
    time: '12.00',
    content: 'go to work',
    type: 'default',
    value: 'default',
  },
  {
    time: '12.30',
    content: 'lunch',
    type: 'default',
    value: 'default',
  },
  {
    time: '13.00',
    content: '@Work',
    type: 'category',
    value: 'Work',
  },
  {
    time: '19.00',
    content: '#App Development',
    type: 'task',
    value: 'App Development',
  },
]

export const category = {
  Work: {
    routine: [
      {
        frequency: 'everyday',
        content: 'check in & order dinner',
      },
      {
        frequency: 'everyday',
        content: 'check out & daily report',
      },
    ]
  },
  Fit: {
    routine: [
      {
        frequency: 'every Monday',
        content: 'swim and go to gym',
      }
    ]
  },
}

export const tasks = {
  'App Development': {
    subtask: [
      'Basic UI', 'To do List', 'Task View', 'Calendar Implementation'
    ]
  }
}