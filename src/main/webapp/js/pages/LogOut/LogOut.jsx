import React from 'react';
import { browserHistory, Link } from 'react-router';

export default class LogOut extends  React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
      event.preventDefault();
      this.context.outFunction();
      alert("logout");
      
      browserHistory.push("/RestExample/");
    }
  render() {
        return (
                <p className="menu-el"><Link  to="/RestExample/" onClick={this.onClick}>LogOut</Link></p>
                );
    }
};

 LogOut.contextTypes = {
        outFunction: React.PropTypes.func.isRequired,
        router: React.PropTypes.object.isRequired
    }