import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { withRouter } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import { Card, IconButton, InputBase, Button, MenuItem } from '@material-ui/core';
// const theme = createMuiTheme({
//     overrides: {
//         MuiDrawer: {
//             paperAnchorLeft: {
//                 width: 250,
//                 top: 65,
//                 background: 'white'
//             },
//             paperAnchorDockedLeft: {
//                 borderColor: "white"
//             }
//         }
//     }
// })
class CreateLabelComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            title: ''
        }
    }
    handleRemove = () => {
        this.setState({
            open: false
        })
    }
    handleUpdateTitle = (e) => {
        var title = e.target.value;
        this.setState({
            title: title
        })
    }
    handleEdit = () => {
        this.setState({
            dialogOpen: !this.state.dialogOpen
        })
    }
    handleClear = () => {
        this.setState({
            title: ''
        })
    }
    handleDone = () => {

    }
    handleClose = () => {
        this.setState({
            dialogOpen: false

        })
    }

    render() {
        console.log('menu open dialog', this.props.menuDialogOpen);
        return (
            <div>
                <MenuItem id="note" onClick={this.handleEdit} >
                    <EditIcon style={{ paddingRight: "15%" }} />
                    EditLabels
            </MenuItem>
                <div>
                    {/* <MuiThemeProvider theme={theme}> */}
                        <Dialog position="static"
                            open={this.state.dialogOpen}
                            onClose={this.handleClose}
                        >
                            <Card className="get-card2">
                                <DialogTitle>
                                    Edit labels
                            </DialogTitle>
                                <DialogContent>
                                    <div className="edit-input">
                                        <IconButton
                                            onClick={this.handleDone}>
                                            <DoneOutlinedIcon onClick={this.handleDone} />
                                        </IconButton>
                                        <InputBase className="get-in2"
                                            placeholder="Create new label"
                                            id="title"
                                            value={this.state.title}
                                            onChange={this.handleUpdateTitle}
                                        />
                                        <IconButton
                                            onClick={this.handleDone}>
                                            <ClearOutlinedIcon onClick={this.handleClear} />
                                        </IconButton>
                                    </div>
                                    <Divider />
                                    <div id="edit-button">
                                        <Button>Done</Button>
                                    </div>
                                </DialogContent>
                            </Card>
                        </Dialog>
                    {/* </MuiThemeProvider> */}
                </div>
            </div>
        )
    }
}
export default withRouter (CreateLabelComponent)