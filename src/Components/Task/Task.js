import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Container, DeleteButton, Icon, TaskContainer } from './TaskControls'

class Task extends React.Component {

  deleteTask = (event) => {
    const taskId = event.currentTarget.firstChild.getAttribute('taskId') || ''
    if (taskId) {
      this.props.handleDelete(taskId)
    } else {
      alert("Can't delete it")
    }
  }


  render() {
    const { columnTitle, task, index, handleDelete } = this.props
    const isDragDisabled = (columnTitle === 'Done')

    return (
      <Draggable
        draggableId={task.id}
        index={index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
            <TaskContainer>
              {this.props.task.content}
              {(columnTitle === 'Done') &&
                <DeleteButton taskid={task.id} key={task.id} onClick={this.deleteTask}>
                  <li taskid={task.id}>
                    <Icon className="material-icons" key={task.id}>&#xe872;</Icon>
                  </li>
                </DeleteButton >
              }
            </TaskContainer>
          </Container>

        )}
      </Draggable>
    );
  }
}


export default Task
