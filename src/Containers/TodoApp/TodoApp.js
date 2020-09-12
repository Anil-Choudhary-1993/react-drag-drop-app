import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux'
import Column from '../Column';
import { Container } from './TodoAppControls'
import { updateColumn } from '../../Actions/TodoActions'
import { bindActionCreators } from 'redux'

class TodoApp extends React.Component {

    state = {
        sourceColumnIndex: '',
        tasks: {},
        columns: {},
        columnOrder: []
    }

    onDragStart = start => {
        const sourceColumnIndex = this.state.columnOrder.indexOf(start.source.droppableId);
        this.setState({
            sourceColumnIndex,
        });
    };

    onDragEnd = result => {

        const { columns } = this.state

        this.setState({
            sourceColumnIndex: null,
        });

        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const sourceColumn = columns[source.droppableId];
        const destinationColumn = columns[destination.droppableId];

        if (sourceColumn === destinationColumn) {
            const newTaskIds = Array.from(sourceColumn.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newHomeColumn = {
                ...sourceColumn,
                taskIds: newTaskIds,
            };

            const newState = {
                columns: {
                    ...columns,
                    [newHomeColumn.id]: newHomeColumn,
                },
            };

            this.props.updateColumn(newState)
            return;
        }

        // moving from one list to another
        const sourceColumnTaskIds = Array.from(sourceColumn.taskIds);
        sourceColumnTaskIds.splice(source.index, 1);
        const newHomeColumn = {
            ...sourceColumn,
            taskIds: sourceColumnTaskIds,
        };

        const destinationColumnTaskIds = Array.from(destinationColumn.taskIds);
        destinationColumnTaskIds.splice(destination.index, 0, draggableId);
        const newForeign = {
            ...destinationColumn,
            taskIds: destinationColumnTaskIds,
        };

        const newState = {
            columns: {
                ...columns,
                [newHomeColumn.id]: newHomeColumn,
                [newForeign.id]: newForeign,
            },
        };
        this.props.updateColumn(newState)
    };



    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.tasks === prevState.tasks && nextProps.columns === prevState.columns && nextProps.columnOrder === prevState.columnOrder) {
            return false
        } else {
            return {
                ...prevState,
                tasks: nextProps.tasks,
                columns: nextProps.columns,
                columnOrder: nextProps.columnOrder
            }
        }
    }

    render() {
        const { tasks, columnOrder, columns } = this.state

        if (!Object.keys(columnOrder).length) {
            return <div>No Columns To Display.</div>
        } else return (
            <DragDropContext
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
            >
                <Container>
                    {columnOrder.map((columnId, index) => {
                        const columnObj = columns[columnId];
                        const taskObj = columnObj.taskIds.map(
                            taskId => tasks[taskId],
                        );

                        return (
                            <Column
                                key={columnObj.id}
                                column={columnObj}
                                tasks={taskObj}
                            />
                        );
                    })}
                </Container>
            </DragDropContext>
        );
    }
}

const mapStateToProps = (state) => ({
    tasks: state.todoReducer.tasks,
    columns: state.todoReducer.columns,
    columnOrder: state.todoReducer.columnOrder
})


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateColumn }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)