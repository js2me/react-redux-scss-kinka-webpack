import React, { Component } from 'react';

class Feed extends Component {
  state = {
    foo: 'bar'
  };

  render() {
    const { foo } = this.state;
    return <div>{foo}</div>;
  }
}

export default Feed;
