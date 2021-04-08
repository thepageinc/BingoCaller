import { Component, Fragment } from 'react';

import Footer       from './components/Footer';
import Header       from './components/Header';
import BingoCaller  from './components/BingoCaller';

import './App.css';
import "./components/containers.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <BingoCaller />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
