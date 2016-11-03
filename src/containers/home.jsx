/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from "../components/home";

class HomeContainer extends Component {
  render() {
    return (<Home {...this.props} {...this} />)
  }
}

const mapStateToProps = (state) => {
  return {
    component: state.component
  }
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
)(HomeContainer);
