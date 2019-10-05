import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tooltip, Button,createMuiTheme } from '@material-ui/core';
import { DateTimePicker } from 'material-ui-pickers';
import Popper from '@material-ui/core/Popper';
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import Paper from '@material-ui/core/Paper';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { ThemeProvider } from "@material-ui/styles";
import {addReminder} from '../services/userService'
const theme = createMuiTheme({
    overrides: {
        MuiPickersModal: {
            dialogRootWider: {
                minWidth: "360px",
                minHeight:"10px"
            }
        },MuiPickersToolbar:{
            toolbar :{
            backgroundColor:"yellowgreen"
            }
        },MuiPickersDay:{
            isSelected: {
            backgroundColor:"yellowgreen"
            }
        },MuiPickerDTTabs:{
            tabs:{
            backgroundColor:"yellowgreen"
            }
        },MuiPickersClockPointer:{
            pointer:{
            backgroundColor:"yellowgreen"
            },thumb:{
                border:"14px solid yellowgreen"
               } 
        },MuiPickersClock:{
            pin:{
            backgroundColor:"yellowgreen"
            }
        }
    }
})

class ReminderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPop: false,
            anchorEl: false,
            selectedDate: new Date(),
            // '2014-08-18T21:11:54'
        }
    }
    handleChangeDate = date => {
        this.setState({
            selectedDate: date
        })
    }
    handleOpen = () => {
        this.setState({
            openPop: !this.state.openPop
        })
    }
    handleOpenPopper(e) {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        })
    }

    handleReminderButton = () => {
        console.log("reminder-notesId----", this.props.notesId);
        let data = {
            "noteIdList": [this.props.notesId],
            "reminder":this.state.selectedDate
        }
        console.log("data in reminderCompo is ",data);  
        addReminder(data).then((res) => {
            console.log("response---- in reminder", res);
            this.props.reminderPropsToGetNotes(true)
        }).catch((err) => {
            console.log('err in  remindercomp', err);
        })
    }
    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <Tooltip title="Remind me">
                        <AddAlertOutlinedIcon onClick={(e) => this.handleOpenPopper(e)} />
                    </Tooltip>
                    <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} >
                        <Paper className="reminder-paper">
                            {/* Reminder:
                        <MenuItem>
                                Later today
                        </MenuItem>
                            <MenuItem>
                                Tomorrow
                        </MenuItem>
                            <MenuItem>
                                Next Week
                        </MenuItem> */}
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker value={this.state.selectedDate} onChange={this.handleChangeDate} />
                            </MuiPickersUtilsProvider>
                            <div>
                                <Button onClick={this.handleReminderButton}>Set Reminder</Button>
                            </div>
                        </Paper>
                    </Popper>
                </ThemeProvider>
            </div>
        )
    }
}
export default withRouter(ReminderComponent)