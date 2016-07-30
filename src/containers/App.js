import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export const App = React.createClass({
  render() {
    return <div>Hello World</div>;
  }
});

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);