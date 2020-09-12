import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../../Components/Task';
import AddTodoDialog from '../../Components/AddTodoDialog'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AddTodoTask, deleteTask } from '../../Actions/TodoActions'

import { Container, Title, Button, TaskList } from './ColumnControls'

class Column extends React.Component {

  state = { open: false }

  handleAddClick = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false });
  };


  handleAddTodoTask = (todoTask) => {
    this.props.AddTodoTask(todoTask)
    this.handleClose()
  }

  handleDelete = (taskId) => {
    this.props.deleteTask(taskId)
  }

  render() {
    const { column } = this.props

    return (
      <Container>
        <Title>
          {this.props.column.title === 'To do' && <Button type="button">
            <i className="material-icons" onClick={this.handleAddClick}>&#xe145;</i>
          </Button>}
          {this.props.column.title}
        </Title>

        <Droppable
          droppableId={this.props.column.id}
        >
          {(provided, snapshot) => (
            <TaskList
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  columnTitle={column.title}
                  handleDelete={this.handleDelete} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
        {this.props.column.title === 'To do' &&
          <AddTodoDialog
            open={this.state.open}
            handleAddTodoTask={this.handleAddTodoTask}
            handleClose={this.handleClose} />
        }
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ AddTodoTask, deleteTask }, dispatch)
}

export default connect(null, mapDispatchToProps)(Column)