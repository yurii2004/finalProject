import React from 'react';
import Good from '../Good/Good.jsx';
import  { Link } from 'react-router';

export default class SearchResultsForm extends  React.Component {
    constructor(props) {
        super(props);
       
        this.createCategories = this.createCategories.bind(this);
        this.selectGoods = this.selectGoods.bind(this);
        this.allGoodsFilter = this.allGoodsFilter.bind(this);
        alert("constr categ form");
    }
    createCategories(data) {
        let self = this;
 
            
            let newGoods = self.selectGoods(data, self.allGoodsFilter);
            console.log("newGoodslslsl");
            console.log(newGoods);
            return (<div className="goods">
                <p className="goods-title">Results</p>
                <div className="border"></div>
                {newGoods}
            </div>);
            }
    allGoodsFilter(data) {
        alert("filter");
                data = JSON.parse(JSON.stringify(data));
                console.log("search res " + JSON.stringify(data));
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
                alert("select");
                console.log(data);
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
        let searchResultsData = JSON.parse(localStorage.getItem('searchResults'));
        console.log(searchResultsData);
        let categories = this.createCategories(searchResultsData.searchRes);


        return (
                <div className="price-info">
                    {categories}
                </div>
                );
    }
};
