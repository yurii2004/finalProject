import React from 'react';
import SearchInput from './SearchInput/SearchInput.jsx';

export default class ContentHeader extends  React.Component {
  render() {
      return (
         <div className="content header">
            <div className="header-info">
                <div className="logo">
                    <img className="logo" src="img/logo.png"/>
                </div>
                <div className="info-search-block">
                    <div className="top-info-block">
                        <img src="img/telephone.png"/>
                        <div className="top-info-text">
                            <p id="telephone-number">1(800) 234-5678</p>
                            <p id="work-hours">Hours: 8am-8pm PST M-Th; 8am-4pm PST Fri</p>
                        </div>
                        <img src="img/basket.png"/>
                    </div>
                    <SearchInput />
                </div>
            </div>
        </div>
      );
    }
};