import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Divider } from '@material-ui/core';
import { withRouter } from 'react-router-dom'
import { questionAndAnswer, getQuesAns, postLike, getAllNotes, postRate } from '../services/userService';
import { EditorState, convertToRaw } from 'draft-js';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';
import Rating from 'material-ui-rating';
import StarRatingComponent from 'material-ui-rating';
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
            like: false,
            rate: false,
            notes: [],
            count: false

        }
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
        // console.log('000000000000000000', this.state.id);

        let data = {
            'message': this.state.msg,
            'notesId': this.state.id
        }
        console.log("data in handleask in editorComp ", data);
        questionAndAnswer(data)
            .then(async (res) => {
                console.log("response after hitting question and answer notes in editor ", res.data.data.details);

                console.log("log after hitting que ask and setstate", this.state.queArr);
                this.getNotes();


            })
            .catch(err => {
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
    clickStar = async (e) => {
         

 this.setState({
            rating: e
        })
        console.log('rating----',this.state.e)
        let data = {
            'id': localStorage.getItem('parentId'),
            'rate':this.state.rating
        }
       
        console.log('66666666', data.id);
        console.log('res in editor handle star----',data.rate)
        await postRate(data).then((res) => {
            console.log('res in editor handle star', res);
            this.getQA(this.state.id);
            // this.getNotes();
        }).catch((err) => {
            console.log('err in editor handle star', err);

        })
    }
    render() {
        console.log('gkliurgkrr==0=re0=r0=-r0eo=[t9=r', this.state.id);
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
                    <div>
                        <div className="editor-contents">

                            {/* <Divider /> */}
                            <div className="editor-assignment">
                                <div className="editor-questionasked">Question Asked</div>
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
                                                            {key.message}
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
                                 localStorage.setItem('parentId',data.id)
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
                                            {/* {!this.state.like ?
                                                <div onClick={()=>this.handleLike(data.id)}>  <ThumbUpIcon />like 0</div>
                                                :
                                                <div style={{ color: "blue" }} onClick={()=>this.handleLike(data.id)}> <ThumbUpIcon />like 1</div>
                                            } */}
                                            {console.log("9999999", data.like.length)}
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
                                                        console.log("val.id", data);
                                                        console.log("data.rate.len---", data.rate.length);
                                                        return (
                                                            <Rating
                                                                value={val.rate}
                                                                onClick={this.clickStar}
                                                            />
                                                        )
                                                    }) :
                                                    <Rating
                                                        name="simple-controlled"
                                                        value={this.state.rating}
                                                        onClick={this.clickStar}
                                                    />
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
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