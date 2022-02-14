import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import  NavMenu  from './NavMenu';
import {
  BrowserRouter as Router,
} from "react-router-dom";
export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Router>
         <NavMenu />
        <Container>
          {this.props.children}
        </Container>
        </Router>
      </div>
    );
  }
}
