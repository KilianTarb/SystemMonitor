import '../assets/css/App.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import InterfaceData from './NetworkData/InterfaceData';
import PingData from './NetworkData/PingData';

const paperStyle = {
  padding: "10px",
  margin: "10px",
  background: "#272822",
  width: "100%"
};

class NetworkData extends React.Component {
  constructor(props) {
    super(props);  
  }

  render() {
    return (
      <div>
        <InterfaceData/>
        <PingData/>
      </div>
    );
  }
}

export default NetworkData;
