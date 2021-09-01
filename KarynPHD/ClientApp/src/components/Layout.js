import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavMenu from './Nav/NavMenu';

export class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
