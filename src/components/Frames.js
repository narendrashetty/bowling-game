import React from 'react';

export const Frames = React.createClass({
  renderHeader() {
    return (
      <thead>
        <tr>
          <th rowSpan="2">Player</th>
          <th colSpan="10">Frames</th>
        </tr>
        <tr>
          {this.props.frames.map((frame, index) => {
            return <th>{++index}</th>;
          })}
        </tr>
      </thead>
    );
  },

  renderFrames(playerIndex) {
    return this.props.frames.map((frame) => {
      return (
        <td style={{'border': '1px solid'}}>
          {frame.getIn([playerIndex, 'frameStatus'])}
          {frame.getIn([playerIndex, 'rolls']).map((roll) => {
            return <div>{roll}</div>;
          })}
        </td>
      );
    });
  },

  render() {
    return (
      <table width={800} style={{
      }}>
        {this.renderHeader()}
        <tbody>
          {this.props.players.map((player, index) => {
            return (
              <tr key={player}>
                <td>{player}</td>
                {this.renderFrames(index)}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
});

export default Frames;