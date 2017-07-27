import React from 'react';

export default class Purchase extends React.Component{
    constructor(props) {
        super(props);
    }    
    
    render () {
        console.log(this.props.info);
        return (
                 <li className="cart-item">
                        <span className="cart-item-pic">
                          <img src={this.props.info.imageSrc}/>
                        </span>
                        {this.props.info.title}
                        <span className="cart-item-desc">
                            {this.props.info.bottomText}
                            <Btn id={this.props.info.prodId} />
                        </span>
                        <span className="cart-item-price">{this.props.info.Cost}</span>
                 </li>
                );
    }
};

export class Btn extends  React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {prodId: this.props.id}
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        alert("clicked" + this.props.id);
        this.context.deleteFromCart(this.props.id);
    }
  render() {
        return (
                <input 
                type="submit" 
                className="delete-button" 
                name="btn" 
                value="Delete"
                onClick={this.onClick}
                    />
                );
    }
};

 Btn.propsTypes = {
        prodId: React.PropTypes.string
    }
    
 Btn.contextTypes = {
     deleteFromCart: React.PropTypes.func.isRequired
 }
