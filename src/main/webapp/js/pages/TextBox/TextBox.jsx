import React from 'react';
import { browserHistory, Link } from 'react-router';

export default class TextBox extends  React.Component {
    constructor(props) {
        super(props);
    }
  render() {
        let classN = this.props.object.classN;
        return (
                <input className={classN} 
                name={this.props.name}
                type='text' 
                readOnly={this.props.object.readOnly}
                value={this.props.value}
                onChange={this.props.onChange}/>
                );
    }
};