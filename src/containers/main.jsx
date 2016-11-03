/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from "../components/main";

class MainContainer extends Component {
  render() {
    return(<Main {...this.props} {...this} />)
  }
}

const mapStateToProps = (state) => {
  return state.container;
}

const mapDispatchToProps = (dispatch) => {
  return {
    // closeContextMenu: () => {
    //   dispatch(actions.closeContextMenu())
    // }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer);
