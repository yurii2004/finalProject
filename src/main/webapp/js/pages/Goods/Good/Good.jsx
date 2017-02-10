import React from 'react';
import  { Link } from 'react-router';

export default class Good extends React.Component {
  constructor(props) {
    super(props);   
  }
  render() {
      const children = this.props.children;
      let title = this.props.object.title,
          cost = this.props.object.cost,
          bottomText = this.props.object.bottomText,
          imageSrc = this.props.object.imageSrc,
          treangleSrc = this.props.object.treangleSrc,
          hotCost= this.props.object.hotCost,
          first= this.props.object.first,
          special= this.props.object.special,
          prodId = this.props.object.prodId;
  
          
      let hot;
      if ({hotCost}!=="") {
          hot = <p name='hot-cost'>{hotCost}</p>;
          } else hot="";    
          
      return (
        <div className="good" name={first}>
        <div className="good-title">
        <Link to={ { pathname: 'prprof', query: { title: prodId }}}><p>{this.props.object.title}</p></Link>
        </div>
        <img src={imageSrc} alt="" name="prod"/>
        <img name="tr" src={treangleSrc} alt=""/>
        <div className="cost-block" name={special}>
          {hot}        
          <p>{cost}</p>
        </div>
        <div className="bottom-border"></div>
        <p name="good-bottom-text">{bottomText}</p>
        <div className="bottom-icons">
          <i className="fa fa-shopping-cart" aria-hidden="true"></i>
          <i className="fa fa-info-circle" aria-hidden="true"></i>
          <i className="fa fa-star-o" aria-hidden="true"></i>
          <i className="fa fa-exchange" aria-hidden="true"></i>
        </div>
        </div>
      );
    }
};

Good.propTypes = {
          title: React.PropTypes.string,
          cost: React.PropTypes.string,
          bottomText: React.PropTypes.string,
          imageSrc: React.PropTypes.string,
          treangleSrc: React.PropTypes.string,
          first: React.PropTypes.string,
          special: React.PropTypes.string,
          prodId: React.PropTypes.number
};