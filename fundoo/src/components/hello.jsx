// import React, { Component } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { Button, Divider } from '@material-ui/core';
// import { withRouter } from 'react-router-dom'
// import { questionAndAnswer, getQuesAns, postLike, getAllNotes } from '../services/userService';
// import { EditorState, convertToRaw } from 'draft-js';
// import ThumbUpIcon from '@material-ui/icons/ThumbUp';
// import ReplyIcon from '@material-ui/icons/Reply';
// import Rating from 'material-ui-rating'

// // const theme = createMuiTheme({
// //     overrides: {
// //         rdw: {
// //             editor: {
// //                 toolbar: {
// //                     background: "gray",
// //                     width: "59%"
// //                 }
// //             }
// //         }
// //     }
// // })
// class EditorComponent extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             open: false,
//             msg: '',
//             title: '',
//             desc: '',
//             id: '',
//             dis: false,
//             msgArr: [],
//             rating: 0,
//             editor: false,
//             editorState: EditorState.createEmpty(),
//             like: false,
//             notes: []

//         }
//     }

//     componentDidMount() {
//         this.getNotes()

//         if (this.props.location !== undefined) {
//             console.log("props in editors=====", this.props);
//             if (this.props.location.state.length === 3) {
//                 this.setState({
//                     id: this.props.location.state[0],
//                     title: this.props.location.state[1],
//                     desc: this.props.location.state[2],
//                 })
//             }
//             else if (this.props.location.state[5]) {

//                 console.log("props in editor------.", this.props);
//                 this.getQA(this.props.location.state[0]);
//                 this.setState({
//                     id: this.props.location.state[0],
//                     title: this.props.location.state[1],
//                     desc: this.props.location.state[2],
//                     dis: !this.state.dis
//                 })
//                 this.getQA(this.state.id);
//             }
//         }
//     }

//     getNotes = () => {
//         getAllNotes().then((res) => {
//             console.log('response after getnote', res);
//             this.setState({
//                 notes: res.data.data.data
//             })
//         })
//     }
//     handleLike = () => {
//         this.setState({
//             like: !this.state.like
//         })
//         postLike(this.state.like).then((res) => {
//             console.log('res in editor handle like', res)
//         }).catch((err) => {
//             console.log('err in editor handle like', err);

//         })
//     }
//     handleEditor = () => {
//         this.setState({
//             open: !this.state.open
//         });

//     }
//     getQA = (id) => {
//         getQuesAns(id).then(res => {
//             console.log("res in qa", res.data[0].createdDate);
//             const msg = res.data.map((key, index) => {
//                 return key.message
//             })
//             console.log("msg i s", msg);

//             this.setState({
//                 msgArr: res.data
//             })
//         })
//         console.log('111111111', this.state.msgArr);

//     }
//     handleAsk = async () => {
//         let ques = convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text;
//         console.log("log data after que ask", ques);

//         await this.setState({
//             msg: ques,
//             // id: this.state.id,
//             id: this.props.location.state[0],
//             dis: !this.state.dis
//             // editorState=EditorState.createEmpty()
//         })
//         // console.log('000000000000000000', this.state.id);

//         let data = {
//             'message': this.state.msg,
//             'notesId': this.state.id
//         }
//         console.log("data in handleask in editorComp ", data);
//         questionAndAnswer(data)
//             .then(async (res) => {
//                 console.log("response after hitting question and answer notes in editor ", res.data.data.details);

//                 console.log("log after hitting que ask and setstate", this.state.queArr);


//             })
//             .catch(err => {
//                 console.log("err in hitting question and answer note api ", err);
//             })
//     }

//     onEditorStateChange = (editorState) => {
//         this.setState({
//             editorState,
//         })
//     }
//     handleClose = () => {
//         this.props.history.push('/dashboard')
//     }

//     render() {
//         console.log('gkliurgkrr==0=re0=r0=-r0eo=[t9=r', this.state.id);
//         return (
//             <div className="editor-page">
//                 {/* <div> */}
//                 <div className="editor-close-title">
//                     <div className="editor-title" >{this.props.location.state[1]}</div>
//                     <div><Button color="primary" variant="outlined" onClick={this.handleClose}>Close</Button></div>
//                 </div>
//                 <div className="editor-description" >{this.props.location.state[2]}</div>
//                 <Divider />
//                 {!this.state.dis ?
//                     <div>
//                         <div>
//                             <div className="editor-description" >Ask Question</div>
//                             {/* <div className="editor-page"> */}
//                             <div style={{ width: "60%" }} className="editor-comp">
//                                 <div style={{ background: "gray" }}>
//                                     <Editor
//                                         placeholder="Type something...."
//                                         onEditorStateChange={this.onEditorStateChange} />
//                                 </div>
//                             </div>
//                             {/* </div> */}
//                         </div>
//                         <Button color="primary" variant="outlined" onClick={this.handleAsk}>Ask</Button>
//                     </div>
//                     :
//                     <div className="editor-contents">

//                         {/* <Divider /> */}
//                         <div className="editor-assignment">
//                             <div className="editor-questionasked">Question Asked</div>
//                             {this.state.notes.map((data, index) => {
//                                  console.log("9999999", data)
//                                 console.log("0000000",this.state.id)
//                                 return (
//                                     <div>
//                                         {
//                                              (data.questionAndAnswerNotes.length>0 && data.id===this.state.id)&&
//                                             data.questionAndAnswerNotes.map(key=>{
//                                                 return(
//                                                     <div>
//                                                         {key.message}
//                                                     </div>
//                                                 )
//                                             })
//                                         }
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 }
//                 {/* </div> */}
//                 <Divider />
//                 <div className="editor-assignment">
//                     {this.state.msgArr.map((data, index) => {
//                         return (
//                             <div className="editor-like-date">
//                                 <div style={{ fontSize: "12px" }}>
//                                     <div key={index}>{localStorage.getItem('FirstName')}</div>
//                                     <div>  {localStorage.getItem('LastName')}</div>
//                                     <div> {data.createdDate}</div>


//                                     <p style={{ fontSize: "20px" }}>{data.message}</p>
//                                 </div>
//                                 <div className="editor-thumb">
//                                     <ReplyIcon onClick={() => this.handleReply(data)} />
//                                     {!this.state.like ?
//                                         <div onClick={this.handleLike}>  <ThumbUpIcon />like 0</div>
//                                         :
//                                         <div style={{ color: "blue" }} onClick={this.handleLike}>  <ThumbUpIcon />like 1</div>
//                                     }
//                                     <Rating
//                                         name="simple-controlled"
//                                     // value={value}
//                                     // onChange={(event, newValue) => {
//                                     //     setValue(newValue);
//                                     // }}
//                                     />
//                                 </div>
//                             </div>
//                         )
//                     })}
//                 </div>
//             </div>
//         )
//     }
// }
// export default withRouter(EditorComponent)





//mine
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Divider } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import { questionAndAnswer, getQuesAns, postLike } from '../services/userService';
import { EditorState, convertToRaw } from 'draft-js';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';
import Rating from 'material-ui-rating'

// const theme = createMuiTheme({
//     overrides: {
//         rdw: {
//             editor: {
//                 toolbar: {
//                     background: "gray",
//                     width: "59%"
//                 }
//             }
//         }
//     }
// })
class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            msg: '',
            title: '',
            desc: '',
            id: '',
            dis: false,
            msgArr: [],
            rating: 0,
            editor: false,
            editorState: EditorState.createEmpty(),
            like: false
        }
    }

    componentWillMount() {
        if (this.props.location !== undefined) {
            console.log("props in editors=====", this.props);
            if (this.props.location.state.length === 3) {
                this.setState({
                    id: this.props.location.state[0],
                    title: this.props.location.state[1],
                    desc: this.props.location.state[2],
                })
            }
            else if (this.props.location.state[5]) {

                console.log("props in editor------.", this.props);
                this.getQA(this.props.location.state[0]);
                this.setState({
                    id: this.props.location.state[0],
                    title: this.props.location.state[1],
                    desc: this.props.location.state[2],
                    dis: !this.state.dis
                })
                this.getQA(this.state.id);
            }
        }
    }
    handleLike = () => {
        this.setState({
            like: !this.state.like
        })
        postLike(this.state.like).then((res) => {
            console.log('res in editor handle like', res)
        }).catch((err) => {
            console.log('err in editor handle like', err);

        })
    }
    handleEditor = () => {
        this.setState({
            open: !this.state.open
        });

    }
    getQA = (id) => {
        getQuesAns(id).then(res => {
            console.log("res in qa", res.data[0].createdDate);
            const msg = res.data.map((key, index) => {
                return key.message
            })
            console.log("msg i s", msg);

            this.setState({
                msgArr: res.data
            })
        })
        console.log('111111111', this.state.msgArr);

    }
    handleAsk = async () => {
        let ques = convertToRaw(this.state.editorState.getCurrentContent()).blocks[0].text;
        await this.setState({
            msg: ques,
            // id: this.state.id,
            id: this.props.location.state[0],
            dis: !this.state.dis
            // editorState=EditorState.createEmpty()
        })
        // console.log('000000000000000000', this.state.id);

        let data = {
            'message': this.state.msg,
            'notesId': this.state.id
        }
        console.log("data in handleask in editorComp ", data);
        questionAndAnswer(data).then((res) => {
            console.log("response after hitting question and answer notes in editor ", res);
            console.log('90900088907808', this.state.id);

            // this.getQA(this.state.id)
        }).catch(err => {
            console.log("err in hitting question and answer note api ", err);
        })
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    }
    handleClose = () => {
        this.props.history.push('/dashboard')
    }

    render() {
        console.log('gkliurgkrr==0=re0=r0=-r0eo=[t9=r', this.props);
        return (
            <div className="editor-page">
                {/* <div> */}
                <div className="editor-close-title">
                    <div className="editor-title" >{this.props.location.state[1]}</div>
                    <div><Button color="primary" variant="outlined" onClick={this.handleClose}>Close</Button></div>
                </div>
                <div className="editor-description" >{this.props.location.state[2]}</div>
                <Divider />
                {!this.state.dis ?
                    <div>
                        <div>
                            <div className="editor-description" >Ask Question</div>
                            {/* <div className="editor-page"> */}
                            <div style={{ width: "60%" }} className="editor-comp">
                                <div style={{ background: "gray" }}>
                                    <Editor
                                        placeholder="Type something...."
                                        onEditorStateChange={this.onEditorStateChange} />
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                        <Button color="primary" variant="outlined" onClick={this.handleAsk}>Ask</Button>
                    </div>
                    :
                    <div className="editor-contents">

                        {/* <Divider /> */}
                        <div className="editor-assignment">
                            <div className="editor-questionasked">Question Asked</div>


                            {this.state.msgArr.map((data, index) => {
                                 console.log("9999999", this.state.msgArr)
                                console.log("0000000", data.message)
                                return (
                                    <p key={index}>{data.message}</p>
                                )
                            })}
                        </div>
                    </div>
                }
                {/* </div> */}
                <Divider />
                <div className="editor-assignment">
                    {this.state.msgArr.map((data, index) => {
                        return (
                            <div className="editor-like-date">
                                <div style={{ fontSize: "12px" }}>
                                    <div key={index}>{localStorage.getItem('FirstName')}</div>
                                    <div>  {localStorage.getItem('LastName')}</div>
                                    <div> {data.createdDate}</div>


                                    <p style={{ fontSize: "20px" }}>{data.message}</p>
                                </div>
                                <div className="editor-thumb">
                                    <ReplyIcon onClick={() => this.handleReply(data)} />
                                    {!this.state.like ?
                                        <div onClick={this.handleLike}>  <ThumbUpIcon />like 0</div>
                                        :
                                        <div style={{ color: "blue" }} onClick={this.handleLike}>  <ThumbUpIcon />like 1</div>
                                    }
                                    <Rating
                                        name="simple-controlled"
                                    // value={value}
                                    // onChange={(event, newValue) => {
                                    //     setValue(newValue);
                                    // }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default withRouter(EditorComponent)