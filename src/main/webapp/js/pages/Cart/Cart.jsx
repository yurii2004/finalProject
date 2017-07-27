import React from 'react';
import Purchase from './Purchase/Purchase.jsx';

export default class Cart extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(event) {
        event.preventDefault();
        alert("submit continue");
        let self = this;
        let appLocal = localStorage.getItem('app');
        let str = JSON.parse(appLocal);
        console.log(str);
        let purchasesList = this.context.getCart().map(function (item, index) {
            let newItem = {};
            if (item.hotCost !== 0) {
                newItem.cost = item.hotCost;
            } else
                newItem.cost = item.cost;
            newItem.prodId = item.prodId;
            newItem.userId = str.userId;
            newItem.date = new Date().getTime();
            return newItem;

        });
        console.log(purchasesList);
        let data = purchasesList;

        fetch('http://localhost:8084/RestExample/rest/UserService/fixCart', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log(json.text);


        }).catch(function (ex) {
            console.log('parsing failed', ex);
        });
        this.context.clearCart();

    }
    render() {
        console.log("getCart.length " + Object.getOwnPropertyNames(this.context.getCart()).length === 0);
        let goodsCount = 0, totalSum = 0;
        let submitBtn;
        let purchasesList = "";

        if (Object.getOwnPropertyNames(this.context.getCart()).length !== 0) {
            totalSum = 0;
            purchasesList = this.context.getCart().map(function (item, index) {
                if (item.hotCost !== 0)
                    totalSum += item.hotCost;
                else
                    totalSum += item.cost;
                return (
                        <Purchase info={item}/>
                        );
            });
            goodsCount = purchasesList.length;
            console.log(purchasesList);
            
            if (goodsCount != 0)
                submitBtn = <input type='submit' value="Continue" className="cart-button"/>;
        }
        return (
                <form className="cart-container" onSubmit={this.onSubmit}>
                    <div className="cart">
                        <div className="cart-top">
                            <h2 className="cart-top-title">Shopping cart</h2>
                            <div className="cart-top-info">{goodsCount} items</div>
                        </div>
                
                        <ul>
                            {purchasesList}
                        </ul>
                        <div className="cart-bottom">
                            Total: ${totalSum}
                            {submitBtn}
                
                        </div>
                    </div>
                </form>
                );
    }
};

Cart.contextTypes = {
    pushToUserCart: React.PropTypes.func.isRequired,
    getCart: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    clearCart: React.PropTypes.func.isRequired
}