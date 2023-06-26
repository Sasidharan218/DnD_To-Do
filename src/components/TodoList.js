import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const TodoList = ({todos,handleOnDragEnd}) => {
  const createLi = (todo, i) => {
    return (
      <Draggable key={todo._id} draggableId={todo._id.toString()} index={i}>
        {provided => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>{todo.task}</div>
          </li>
        )}
      </Draggable>
    )
  }

  const list = todos.map((todo, i) => {
    let li = null
    li = createLi(todo, i)
     return li
  })

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='todos-list'>
        {provided => (
          <ol 
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            
            {list}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
      
      
    </DragDropContext>
  )
}

export default TodoList