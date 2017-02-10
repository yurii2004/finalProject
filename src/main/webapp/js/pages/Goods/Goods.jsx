import React from 'react';
import Good from './Good/Good.jsx';
import PriceEl from './PriceEl/PriceEl.jsx';
import  { Link } from 'react-router';

export default class Goods extends React.Component {

    constructor(props) {
        super(props);
        alert("in constructor");
        this.state = {answer: [], goods: [], specialGoods: [], categories: []};
        this.afterFetch = this.afterFetch.bind(this);
        this.productBuilder = this.productBuilder.bind(this);
        this.specialProductBuilder = this.specialProductBuilder.bind(this);
        this.createCategories = this.createCategories.bind(this);
        this.allGoodsFilter = this.allGoodsFilter.bind(this);
        
        fetch("http://localhost:8084/RestExample/rest/UserService/allGoods",
                {
                    method: 'get'
                }).then(function (response) {
            return response.json();
        }).then(this.afterFetch).catch(function (ex) {
            console.log('parsing failed', ex)
        });
    }

    afterFetch(parsedData) {

        console.log('parsed json', parsedData);
        localStorage.setItem('appGoods', JSON.stringify({
            list: parsedData
        }));
        let unicCateg = [];
        parsedData.map(function (v) {
            if (!unicCateg.includes(v.category))
                unicCateg.push(v.category);
            return v;
        });
        console.log(unicCateg);
        let categAns = [];
        for (let i = 0; i < unicCateg.length; i++) {
            let categSelection = parsedData.filter(function (v) {
                if (v.category == unicCateg[i])
                    return true;
            });
            let outObj = {categ: unicCateg[i], arr: categSelection};
            categAns.push(outObj);
        }
        console.log(categAns);

        this.setState({answer: parsedData, categories: categAns});
        //                if (self.context.getAuthFlag() === true);
        //                   self.context.router.push("/login");
        localStorage.setItem('goods', JSON.stringify(this.state));
        console.log("after fetch");
    }

    goodsFilter(data) {
        let arr = data.filter(function (v) {
            if (v.hotCost == 0)
                return true;
        });
        
        arr = arr.map(function (v) {
            delete v.hotCost;
            v.cost = "$" + v.cost;
            return v;
        });
        return arr;
    }

    specialGoodsFilter(data) {
        let arr = data.filter(function (v) {
            if (v.hotCost != 0 && typeof v.hotCost == 'number')
                return true;
        });
        arr = arr.map(function (v) {
            v.special = "special";
            v.hotCost = "$" + v.hotCost;
            v.cost = "$" + v.cost;
            return v;
        });
        return arr;
    }
    
    allGoodsFilter(data) {
        console.log("arr info");
    
        console.log(data);
        let arr = data.map(function (v) {
            console.log(v);
            console.log(v.hotCost);
            if (v.hotCost != 0) {
                v.special = "special";
                v.hotCost = "#" + v.hotCost;
            }
            else {
                console.log("in delete");
                delete v.hotCost;
            }
            
            v.cost = "$" + v.cost;
            return v;
        });
        console.log(arr);
        return arr;
    }

    productBuilder(products) {
        return (<div className="goods">
                <p className="goods-title">New Products</p>
                <div className="border"></div>
                {products}
                </div>
                );
    }
    
    specialProductBuilder(products) {
        return (<div className="goods">
                <p className="goods-title">Special Products</p>
                <div className="border"></div>
                {products}
                </div>
                );
    }
    
    selectGoods(data, filter) {
        let goodsTemplate;
        if (data.length > 0) {
            console.log("select goods data" + JSON.stringify(data));
            
            goodsTemplate = filter(data).map(function (item, index) {
                
                if (index < 4) {
                    if (index === 0) {
                        item.first = "first";
                        item.treangleSrc = "/RestExample/img/treang-gr.png";
                    } else {
                        item.first = "";
                        item.treangleSrc = "/RestExample/img/treang-bl.png";
                    }
                    return (
                            <Good object={item}/>
                            );
                }
            });
        } else {
            goodsTemplate = <p>К сожалению новостей нет</p>;
        }
        return goodsTemplate;
    }
    createPriceElements(data) {
        let goodsTemplate;

        if (data.length > 0) {
            goodsTemplate = data.map(function (item, index) {
                if (index === 0) {
                    item.first = "first";
                } else {
                    item.first = "";
                }
                return (
                        <PriceEl object={item}/>
                        );
            });
        } else {
            goodsTemplate = <p>К сожалению новостей нет</p>;
        }
        return (<div className="goods">
                <p className="goods-title">Special Products</p>
                <div className="border"></div>
                {goodsTemplate}
                </div>);
    }
    createCategories() {
        let self = this;
        let arr = this.state.categories.map(function (item) {
            let newGoods = self.selectGoods(item.arr, self.allGoodsFilter);
            console.log("newGoods");
            console.log(newGoods);
            return (   <div className="goods">
                       <Link to={ { pathname: '/categoryGoods', query: { title: item.categ }}} className="main-menu-el"> 
                       <p className="goods-title">{item.categ}</p>
                       </Link>
                        <div className="border"></div>
                        {newGoods}
                        </div>);
        });
        return arr;
    }
    render() {

        let newGoods = this.productBuilder(this.selectGoods(JSON.parse(JSON.stringify(this.state.answer))
, this.goodsFilter));
        let specialGoods = this.specialProductBuilder(this.selectGoods(JSON.parse(JSON.stringify(this.state.answer)), this.specialGoodsFilter));
        let categories = this.createCategories();
       
                           
        return (
                <div className="price-info">
                    
                        {categories}
                        {newGoods}
                        {specialGoods}
           
                    
                </div>
                );
    }
};