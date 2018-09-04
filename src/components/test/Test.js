import React, { Component } from 'react';

class Test extends Component {
  state = {
    title: '',
    body: ''
  };

  componentDidMount() {
    console.log('component did mount');
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(data =>
        this.setState({
          title: data.title,
          body: data.body
        })
      );
  }
  // }
  // componentWillMount() {
  //   console.log('component will mount');
  // }
  // componentDidUpdate() {
  //   console.log('component did update');
  // }
  // componentWillUpdate() {
  //   console.log('component will update');
  // }
  // componentWillReceiveProps(nextProps, nextState) {
  //   console.log('component will receive props');
  // }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return null;
  // }
  // odpala sie przed dodaniem wirtualnego DOM.
  // getSnapshopBeforeUpdate(prevProps, prevState) {}

  render() {
    const { title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  }
}

export default Test;
