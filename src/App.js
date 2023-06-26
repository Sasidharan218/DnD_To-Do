import { useState } from 'react'

import TodoList from './components/TodoList'

const App = () => {
  const [todos, setTodos] = useState([])
  const [state, setState] = useState(0) 
  const [task, setTask] = useState('')
 


  const remove = id => {
   
    const newTodos = [...todos]

    if (task !== -1) {
      newTodos.splice(task, 1)
    }

    setTodos(newTodos)
  }

  const add = (e) => {
    e.preventDefault()
      if (task.trim() !== '') {
        const newTodo = {
          _id: Date.now(),
          task: task.trim(),
          completed: false,
        }
        setTodos([...todos, newTodo])
        setState(1)
      }
      setTask('')
    
  }

  const handleOnDragEnd = result => {
    if (!result.destination) return

    const items = [...todos]
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setTodos(items)
  }


  return (
    <div className='container App'>
 
        <div>
          <h1>TODO</h1>
        </div>
        <div className='add'>
          <input className='form-control' type='text' value={task} onChange={e => setTask(e.target.value)} placeholder="Type Here..."/><br/>
          <button onClick={add} className='btn btn-primary'>ADD</button><br/>
          <button className='btn btn-danger' onClick={remove}>Delete</button>
        </div><br/>
        <div className='card'>
          <h4>TodoList</h4>
          <TodoList state={state} todos={todos} remove={remove} handleOnDragEnd={handleOnDragEnd}
          />
          </div>
    </div>
  )
}

export default App