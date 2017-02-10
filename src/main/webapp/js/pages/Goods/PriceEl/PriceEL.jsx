import React from 'react';

export default class PriceEl extends React.Component {
  render() {
       let imageSrc = this.props.object.imageSrc,
          href = this.props.object.href,
          first= this.props.object.first;
      return (
        <div className={(first!=="")?"clear-top price-el": "price-el" }>
                <img src={imageSrc} alt=""/>
                <div className="price-text">
                  <p>READ MORE</p>
                  <a href={href}><i className="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
                </div>
            </div>
      );
    }
};

PriceEl.propTypes = {
      imageSrc: React.PropTypes.string,
      href: React.PropTypes.string,
      first: React.PropTypes.string
};