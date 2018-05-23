import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import os from 'os';
import util from 'os-utils';
import si from 'systeminformation';
import ProgressProperties, { LineProperties, BarProperties } from '../../data/ProgresProperties';


class Square extends React.Component {
	constructor(props) {
    super(props);
	}

	componentDidMount() {
	}
	componentWillUnmount() {
	}


	render() {
		return(
			<div className="cpuCoreDisplay">
        <span className="indicator"></span>
        <code className="indicatorData">{this.props.text}</code>
        <br/>
			</div>
		);
	}
}

export default Square;