import React from 'react';
import LogOut from '../LogOut/LogOut.jsx';
import { Link } from 'react-router';

export default class TopMenu  extends  React.Component {
  render() {
      let topMenuItems;
      if (this.context.getAuthFlag() === false) { 
        topMenuItems = (
                <div className="vertical">
                    <p className="menu-el"><Link to="/login" >Login</Link></p>
                    <p className="menu-el"><Link to="/registr" >Registration</Link></p>
                </div>
                );    
    } else {
        topMenuItems = (
                <div className="vertical">
                    <p className="menu-el">Hello {this.context.name}</p>
                    <LogOut />
                </div>
                )
    }   
      return (
         <div className="content top-menu">
            <div className="top-menu-right-block">
               {topMenuItems}
            </div>
        </div> 
      );
    }
};

TopMenu.contextTypes = {
    name: React.PropTypes.string.isRequired,
    getAuthFlag: React.PropTypes.func.isRequired
    }