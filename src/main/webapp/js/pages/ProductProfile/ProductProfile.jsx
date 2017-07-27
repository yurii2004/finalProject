import React from 'react';
import  { browserHistory } from 'react-router';

export default class ProductProfile extends React.Component {
        
    constructor(props) {
        super(props);
        this.state = {product: {}}
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit() {
        event.preventDefault();
        if (this.context.name=="") {
            alert("U must log in");
            browserHistory.push("/login");
        } else {
            this.context.pushToUserCart(this.state.product);
            browserHistory.push("/goods");
        }
        
    }
    componentDidMount() {
        let arr = localStorage.getItem('appGoods');
        let id = this.props.location.query.title;
        console.log(id);
         let result = JSON.parse(arr).list.filter(function( obj ) {
             console.log(obj.prodId + " " + id);
             console.log(typeof obj.prodId + " " + typeof id);
             console.log(obj.prodId == id);
            return obj.prodId == id;
          });
        console.log(result[0]);
        this.setState({product: result[0]});
    }
    render() {
        let hotCost ="";
        let AddBtn = null;
        
        if (this.state.product.availability > 0) AddBtn = <input type="submit" name="btn" value="Add to Cart"/>;
                        else AddBtn = "";
                        
        if (this.state.product.hotCost != 0 && typeof this.state.product.hotCost == 'number') hotCost = <label htmlFor="first-name" id="cost-before">{this.state.product.hotCost}</label>;
        else hotCost = <label htmlFor="first-name">Product cost</label>;
        return (
                <form onSubmit={this.onSubmit} className="person-content">
                    <div className="person-view">
                      <p>Product {this.state.product.title}</p>
                      <img src={this.state.product.imageSrc} alt=""/>
                      <div className="mini-photos">
                      </div>
                    </div>
                    <div className="person-info">
                      <div className="account">
                        <p>Details</p>
                        <div className="row">
                          <label htmlFor="first-name">Manufacturer</label>
                          <input name = "first-name" type="text" readOnly value={this.state.product.manufacturer} placeholder="Manufacturer 5"/>
                        </div>
                        <div className="row">
                          <label htmlFor="first-name">In stock</label>
                          <input name = "first-name" type="text" readOnly value={this.state.product.availability} placeholder="In stock 20item(s)"/>
                        </div>
                        <div className="row">
                          <label htmlFor="first-name">Category</label>
                          <input name = "first-name" type="text" readOnlyvalue =  {this.state.product.category} placeholder="Mobile phones"/>
                        </div>
                        <div className="row">
                          {hotCost}
                          <input name = "first-name" type="text" readOnly value={this.state.product.cost} id="cost-after"/>
                        </div>
                        <div className="row">
                          {AddBtn}
                        </div>;
                      </div>
                    </div>
              </form>
                );
    }
};

ProductProfile.contextTypes = {
        pushToUserCart: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired,
        userId: React.PropTypes.string.isRequired
    }