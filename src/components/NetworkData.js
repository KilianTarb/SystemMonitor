import '../assets/css/App.css';
import React, { Component } from 'react';

class NetworkData extends React.Component {
  render() {
    return (
      <div>
        <div className="data">
          <h3>Downstream/Upstream</h3>
          <span>Down Speed: </span><br/>
          <span>Up Speed: </span>
        </div>
      </div>
    );
  }
}

export default NetworkData;
