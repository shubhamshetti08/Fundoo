import React, { Component } from 'react'
import { getAllNotes} from '../services/userService'
import { Card, InputBase,Tooltip } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import ColorPaletteComponent from './colorPaletteComponent';
// const themes = createMuiTheme({
//     overrides: {
//         MuiInputBase: {
//             multiline: {
//                 padding: "1px 20px 22px"
//             }
//         }, MuiPaper: {
//             rounded: {
//                 borderRadius: "10px"
//             }
//         }
//     }
// })
const themes = createMuiTheme({
    overrides: {
MuiSvgIcon:{
    root:{
    fontSize:"1.2rem"
}
}
    }
})
 class GetAllNoteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }
    componentDidMount() {
        this.getNotes();
    }
    getNotes=()=>{
        getAllNotes().then((res) => {
            console.log('response is', res);
            this.setState({
                notes: res.data.data.data
            })
        })
    }
//     handleColor=(col,noteid)=>{
//         var data = {
//             noteIdList: [noteid],
//             color: col
//         }
//           console.log('data in get', data);

//     colorChange(data)
//     .then((res) => {
//         console.log(res);
//         this.getNotes();
//     }).catch((err) => {
//         console.log(err);
//     })
// }

    render() {
        const allNotes = this.state.notes.map((key) => {
            return (
                <div className="get-contents">
                    {/* <MuiThemeProvider theme={themes}> */}
                    {/* backgroundColor: key.color, */}
                        <Card className="get-card1"  style={{  boxShadow:" 5px 5px 5px gray"}}
                        onClick={this.handleNoteClick}>
                            <div className="input1">
                                <InputBase className="get-in2"
                                    multiline
                                    placeholder="Title"
                                    id="title"
                                    value={key.title}
                                />
                            </div>
                            <div className="input2" >
                                <InputBase className="get-in1"
                                    multiline
                                    placeholder="Take a note ...."
                                    id="description"
                                    value={key.description}
                                />
                            </div>
                            <MuiThemeProvider theme={themes}>
                            <div className="gellAllNotes-icons" id="gellAllNote-icons" >
                                <Tooltip title="Remind me">
                                    < AddAlertOutlinedIcon  />
                                </Tooltip>
                                <Tooltip title="Collaborator">
                                    <PersonAddOutlinedIcon />
                                </Tooltip>
                                <Tooltip title="Change color">
                                    <ColorPaletteComponent
                                    // paletteProps={this.handleColor}
                                    // notesId={key.id} 
                                    />
                                </Tooltip>
                                <Tooltip title="add image">
                                    <ImageOutlinedIcon />
                                </Tooltip>
                                <Tooltip title="Archive">
                                    <ArchiveOutlinedIcon />
                                </Tooltip>
                                <Tooltip title="More">
                                    <MoreVertOutlinedIcon />
                                </Tooltip>
                            </div>
                            </MuiThemeProvider>
                        </Card>
                    {/* </MuiThemeProvider> */}
                </div>
            )
        })
        return (
            <div className="get-container">
                {allNotes}
            </div>
        )
    }
}
export default GetAllNoteComponent