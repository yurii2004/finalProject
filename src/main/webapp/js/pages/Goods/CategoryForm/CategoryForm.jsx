import React from 'react';
import Good from '../Good/Good.jsx';
import  { Link } from 'react-router';

export default class CategoryForm extends React.Component {
    constructor(props) {
        super(props);
        let goods = JSON.parse(localStorage.getItem('goods'));
        this.createCategories = this.createCategories.bind(this);
        this.selectGoods = this.selectGoods.bind(this);
        this.state = {categories: goods.categories}
        alert("constr categ form");
    }
    createCategories() {
        let categoryName = this.props.location.query.title;
        let self = this;
        let arr = this.state.categories.filter(function(v) {
            if (v.categ == categoryName )
                return true;
        }).map(function (item) {
            
            let newGoods = self.selectGoods(item.arr, self.allGoodsFilter);
            console.log("newGoods");
            console.log(newGoods);
            return (<div className="goods">
                <p className="goods-title">{item.categ}</p>
                <div className="border"></div>
                {newGoods}
            </div>);
                });
                return arr;
            }
            allGoodsFilter(data) {
                data = JSON.parse(JSON.stringify(data));
                let arr = data.map(function (v) {
                    console.log(v.hotCost != "$0");
                    if (v.hotCost != "$0") {
                        v.special = "special";
                    } else {
                        delete v.hotCost;
                    }
                    return v;
                });
                return arr;
            }
            selectGoods(data, filter) {
                let goodsTemplate;
                
                if (data.length > 0) {
                    
                    goodsTemplate = filter(data).map(function (item, index) {
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
                    });
                } else {
                    goodsTemplate = <p>К сожалению новостей нет</p>;
                }
                return goodsTemplate;
            }
            render() {
                let categories = this.createCategories();


                return (
                        <div className="price-info">
                            {categories}
                        </div>
                        );
            }
        };