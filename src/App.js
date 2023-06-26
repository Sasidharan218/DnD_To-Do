import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";


function App() {
  const [text, setText] = useState("")
  const [state, setState] = useState({
    "todo": {
      title: "TodoList",
      items: []
    },
    "in-progress": {
      title: "Completed",
      items: []
    },
   
  })

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    
    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      prev[source.droppableId].items.splice(source.index, 1)
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }

   const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "TodoList",
          items: [
            {
              id: v4(),
              name: text
            },
            ...prev.todo.items
          ]
        }
      }
    })

    setText("")
  }
 

  return (
    <div className="container App">
       <div className='heading'>
          <h1>TODO</h1>
        </div>
      <div>
        <input className='form-control' type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type Here..."/><br/>
        <button onClick={addItem} className='btn btn-primary'>Add</button>
        
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return(
           <div>
             <div key={key} className="card">
             <div className='title'>
             {data.title}
             </div>
              <Droppable droppableId={key}>
                {(provided,  snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      
                    >
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              return(
                                <div
                                className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
           </div>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
