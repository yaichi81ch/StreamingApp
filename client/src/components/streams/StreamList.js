import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if(stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link className="ui button primary" to={`/streams/edit/${stream.id}`}>EDIT</Link>
          <Link className="ui button negative" to={`/streams/delete/${stream.id}`}>DELETE</Link>
        </div>
      );
    };
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          <i className="large middle icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
          {this.renderAdmin(stream)}
        </div>
      );
    });
  }

  renderCreate() {
    if(this.props.isSignedIn) {
      return (
        <div className="content">
          <Link className="ui button right floated" to="/streams/new">CREATE STREAM</Link>
        </div>
      );
    };
  }

  render() {
    console.log(this.props.streams);
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streamReducer),
    currentUserId: state.authReducer.userId,
    isSignedIn: state.authReducer.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
