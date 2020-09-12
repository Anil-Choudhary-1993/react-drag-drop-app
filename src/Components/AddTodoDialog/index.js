import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class AddTodoDialog extends React.Component {
    state = {
        task: ''
    };

    handleChangeValue = (event) => {
        this.setState({ task: event.target.value })
    }

    handleAdd = () => {
        const { task } = this.state
        if (task) {
            this.props.handleAddTodoTask(task)
            this.setState({ task: '' })
        }
    }


    render() {
        const { open } = this.props
        const { task } = this.state
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add New Task.
            </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="task"
                            type="email"
                            value={task}
                            fullWidth={true}
                            onChange={this.handleChangeValue}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={this.handleAdd} color="primary">
                            Add
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}