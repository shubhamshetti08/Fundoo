
import React, { Component } from "react";
import userActions from "../Actions/UserActions";
import { connect } from "react-redux";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class QuestionAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeQuestionData: []
    };
  }
  componentDidMount() {
    this.props.getUnApprovedList(true);
    console.log("9999999", this.props.getCompleteQA);
  }
  componentWillReceiveProps() {
    this.setState({
      completeQuestionData: this.props.getCompleteQA
    });
    console.log("will receive props", this.state.completeQuestionData);
  }
  render() {
    console.log("11111", this.props.getCompleteQA);

    if (this.state.completeQuestionData.length > 0) {
      console.log("data in render", this.state.completeQuestionData);
    }
    return (
      <div className="d-flex align-items-center justify-content-center" style={{height:"100vh"}}>
        <div className="QA-table">
        <MDBTable  striped bordered >
        <MDBTableHead color="primary-color" textWhite>
            <tr>
              <th><b>Question List</b></th>
              <th><b>Action</b></th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {this.props.getCompleteQA.length > 0
              ? this.props.getCompleteQA.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td><div dangerouslySetInnerHTML={{ __html:data.message}}></div></td>
                      {/* <td>{data.message}</td> */}
                      <td>
                        <span>Approve /</span>
                        <span>  Reject</span>
                      </td>
                    </tr>
                  );
                })
              : null}
          </MDBTableBody>
        </MDBTable>
        </div>
      </div>
    );
  }
}
const actionCreators = {
  getUnApprovedList: userActions.getUnApprovedData
};
function mapState(state) {
  console.log("state", state);
  const getCompleteQA = state.questionAnswers.qa;
  console.log("completed qa", getCompleteQA);
  return { getCompleteQA };
}

export default connect(
  mapState,
  actionCreators
)(QuestionAnswers);
