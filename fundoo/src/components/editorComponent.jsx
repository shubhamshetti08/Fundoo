import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Divider, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import { questionAndAnswer, getQuesAns, postLike, getAllNotes, postRate, questionAndAnswerReply } from '../services/userService';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';
import Rating from 'material-ui-rating';
const theme = createMuiTheme({
    overrides: {
        rdw: {
            editor: {
                toolbar: {
                    backgroundColor: "blue",
                    width: "59%",
                    border: "2px solid grey",
                }
            },
        }
    }
})

// .rdw-editor-toolbar {
//     padding: 6px 5px 0;
//     border-radius: 2px;
//     border: 1px solid #F1F1F1;
//     display: -ms-flexbox;
//     display: flex;
//     -ms-flex-pack: start;
//     justify-content: flex-start;
//     background: bottom;
//     -ms-flex-wrap: wrap;
//     flex-wrap: wrap;
//     font-size: 15px;
//     margin-bottom: 5px;
//     -webkit-user-select: none;
//     -moz-user-select: none;
//     -ms-user-select: none;
//     user-select: none;
// }
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
            like: false,
            rate: false,
            notes: [],
            count: false,
            reply: false,
            textValue:""

        }
        this.clickStar = this.clickStar.bind(this);
    }

    componentDidMount() {
        this.getNotes()

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

    getNotes = () => {
        getAllNotes().then((res) => {
            console.log('response after getnote', res);
            this.setState({
                notes: res.data.data.data
            })
        })
    }
    handleLike = async (id) => {


        let data = {
            'id': id,
            'like': !this.state.like
        }
        this.setState({
            like: !this.state.like
        })
        // console.log('66666666', data.id);
        // console.log('res in editor handle like----', this.state.like)
        await postLike(data).then((res) => {
            console.log('res in editor handle like', res);
            this.getQA(this.state.id);
            // this.getNotes();
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
        console.log("log data after que ask", ques);


        await this.setState({
            msg: ques,
            // id: this.state.id,
            id: this.props.location.state[0],
            dis: !this.state.dis
            // editorState=EditorState.createEmpty()
        })
        console.log('000000000000000000', this.state.msg)

        let data = {
            'message': this.state.textValue,
            'notesId': this.state.id
        }
        console.log("data in handleask in editorComp ", data);
        questionAndAnswer(data)
            .then(async (res) => {
                console.log("response after hitting question and answer notes in editor ", res.data.data.details);

                console.log("log after hitting que ask and setstate", this.state.queArr);
                this.getNotes();
                this.getQA(this.state.id);


            })
            .catch(err => {
                console.log("err in hitting question and answer note api ", err);
            })
    }

    onEditorStateChange = async(editorState) => {
        this.setState({
            editorState,
        })
        console.log("editor state--------", draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
        await this.setState({
            textValue:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
            })
    }
    handleClose = () => {
        this.props.history.push('/dashboard')
    }
    clickStar = async (e) => {


        await this.setState({
            rating: e
        })
        console.log('rating----', this.state.rating)
        let data = {
            'rate': this.state.rating
        }
        console.log('res in editor handle star----', data)
        console.log('parent id----', localStorage.getItem('parentId'))
        postRate(data, localStorage.getItem('parentId')).then((res) => {
            console.log('res in editor handle star', res);
            this.getQA(this.state.id);
            this.getNotes();
        }).catch((err) => {
            console.log('err in editor handle star', err);

        })
    }
    handleReply = () => {
        this.setState({
            reply: !this.state.reply
        })

        let data = {
            'id': localStorage.getItem('parentId'),
            'message': this.state.msg,
        }

        // console.log('66666666', data.id);
        // console.log('res in editor handle like----', this.state.like)
        questionAndAnswerReply(data)
            .then(async (res) => {
                console.log("response after hitting question and answer reply notes in editor ", data.message);

                console.log("log after hitting que ans reply and setstate", this.state.queArr);
                this.getNotes();
                this.getQA(this.state.id);


            })
            .catch(err => {
                console.log("err in hitting question and answer reply note api ", err);
            })
    }
    render() {
        console.log('gkliurgkrr==0=re0=r0=-r0eo=[t9=r', this.state.id);
        return (
            <div className="editor-page">
                <MuiThemeProvider theme={theme}>
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
                                <div style={{ width: "auto", margin: "10px" }} className="editor-comp">
                                    <div>
                                            <Editor
                                                editorStyle={{ border:"1px solid black" }}
                                                toolbarStyle={{border:"1px solid black", backgroundColor: 'gray'}}
                                                placeholder="Type something...."
                                                onEditorStateChange={this.onEditorStateChange} />
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                            <Button style={{ margin: "10px" }} color="primary" variant="outlined" onClick={this.handleAsk}>Ask</Button>
                        </div>
                        :
                        <div>
                            <div className="editor-contents">

                                {/* <Divider /> */}
                                <div className="editor-assignment">
                                    <div className="editor-questionasked">Questions Asked</div>
                                    {this.state.notes.map((data, index) => {
                                        //  console.log("9999999", data)
                                        // console.log("0000000",this.state.id)
                                        return (
                                            <div>
                                                {
                                                    (data.questionAndAnswerNotes.length > 0 && data.id === this.state.id) &&

                                                    data.questionAndAnswerNotes.map(key => {
                                                        console.log('2222222', data.questionAndAnswerNotes);
                                                        // console.log('2222222',key.message);

                                                        return (
                                                            <div className="editor-asked-msg">
                                                                {/* {key.message} */}
                                                                <div dangerouslySetInnerHTML={{ __html: key.message }}></div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })}
                                </div>

                            </div>

                            {/* </div> */}
                            <Divider />
                            <div className="editor-assignment">
                                {this.state.msgArr.map((data, index) => {
                                    localStorage.setItem('parentId', data.id)
                                    return (
                                        <div className="editor-like-date">
                                            <div style={{ fontSize: "12px" }}>
                                                <div key={index}>{localStorage.getItem('FirstName')}</div>
                                                <div>  {localStorage.getItem('LastName')}</div>
                                                <div> {data.createdDate}</div>


                                                <p style={{ fontSize: "20px" }}><div dangerouslySetInnerHTML={{ __html: data.message }}></div></p>
                                            </div>
                                            <div className="editor-thumb">
                                                <ReplyIcon onClick={() => this.handleReply(data)} />
                                                {/* {!this.state.like ?
                                                <div onClick={()=>this.handleLike(data.id)}>  <ThumbUpIcon />like 0</div>
                                                :
                                                <div style={{ color: "blue" }} onClick={()=>this.handleLike(data.id)}> <ThumbUpIcon />like 1</div>
                                            } */}

                                                {console.log("9999999", data.like.length)}
                                                <div>
                                                    {data.like.length > 0 ?

                                                        data.like.map(val => {
                                                            return (

                                                                val.like ?
                                                                    <div className="editor-thumbsUp">
                                                                        <ThumbUpIcon
                                                                            onClick={() => this.handleLike(data.id)}
                                                                            style={{ color: val.like ? '#0000FF' : '' }}
                                                                        />
                                                                        {data.like.length} like
            </div>
                                                                    :
                                                                    <div className="editor-thumbsUp">
                                                                        <ThumbUpIcon
                                                                            onClick={() => this.handleLike(data.id)}
                                                                            style={{
                                                                                color: !this.state.count ? '' :
                                                                                    '#0000FF'
                                                                            }}
                                                                        />
                                                                        {!this.state.count ? '0 likes' : '1 like'}
                                                                    </div>
                                                            )
                                                        }) :

                                                        <div className="editor-thumbsUp">
                                                            <ThumbUpIcon
                                                                onClick={() => this.handleLike(data.id)}
                                                                style={{ color: !this.state.count ? '' : '#0000FF' }}
                                                            />
                                                            {!this.state.count ? '0 likes' : '1 like'}
                                                        </div>
                                                    }
                                                    {
                                                        data.rate.length > 0 ?
                                                            data.rate.map((val) => {
                                                                console.log("val.rate", val.rate);
                                                                // console.log("data.rate.len---", data.rate.length);
                                                                // console.log("data.QA.len---",data.questionAndAnswerNotes[data.questionAndAnswerNotes.length - 1].id);
                                                                return (
                                                                    <Rating
                                                                        style={{ display: "flex" }}
                                                                        value={val.rate}
                                                                        onChange={this.clickStar}
                                                                    />
                                                                )
                                                            }) :
                                                            <Rating
                                                                style={{ display: "flex" }}
                                                                name="simple-controlled"
                                                                value={this.state.rating}
                                                                onChange={this.clickStar}
                                                            // onChange={()=>this.clickStar(data.questionAndAnswerNotes[data.questionAndAnswerNotes.length - 1].id )}
                                                            />

                                                    }
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })}
                            </div>
                            {this.state.reply ?
                                <div>
                                    <div style={{ background: "gray" }}>
                                        <Editor
                                            placeholder="Type something...."
                                            onEditorStateChange={this.onEditorStateChange} />
                                    </div>
                                    <Button color="primary" variant="outlined" onClick={this.handleReply}>Reply</Button>
                                </div>
                                : null
                            }

                        </div>


                    }
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(EditorComponent)
{/* <div className="editor-data">
{data.message}
<ReplyIcon onClick={() => this.handleReply(data)} />
{data.like.length > 0 ?
    data.like.map(val => {
        return (
            val.like ?
                <div className="editor-thumbsUp">
                    <ThumbUpIcon
                        onClick={() => this.handleLike(data.id)}
                        style={{ color: val.like ? '#0000FF' : '' }}
                    />
                    {data.like.length} like
            </div>
                :
                <div className="editor-thumbsUp">
                    <ThumbUpIcon
                        onClick={() => this.handleLike(data.id)}
                        style={{
                            color: !this.state.count ? '' :
                                '#0000FF'
                        }}
                    />
                    {!this.state.count ? '0 likes' : '1 like'}
                </div>
        )
    }) :
    <div className="editor-thumbsUp">
        <ThumbUpIcon
            onClick={() => this.handleLike(data.id)}
            style={{ color: !this.state.count ? '' : '#0000FF' }}
        />
        {!this.state.count ? '0 likes' : '1 like'}
    </div>
}
{
    data.rate.length > 0 ?
        data.rate.map((val) => {
            console.log("val.id", data.id);
            return (
                <StarRatingComponent
                    starCount={5}
                    value={val.rate}
                    onStarClick={this.starClick}
                />
            )
        })
        : <StarRatingComponent
            starCount={5}
            value={this.state.rating}
            onStarClick={this.starClick}
        />
}
</div>
</div> */}

// starClick = async (e) => {
//     console.log('local storage parentiD', localStorage.getItem('parentId'))
//     await this.setState({
//         rating: e
//     })
//     console.log("Rating e", this.state.rating);

//     let data = {
//         'id': localStorage.getItem('parentId'),
//         'rate': this.state.rating,
//     }
//     rate(data).then(res => {
//         this.getQandA(this.state.id)
//         console.log("res after hitting rate api is ", res);
//     }).catch(err => {
//         console.log("err after hitting rate api ", err);
//     })
// }