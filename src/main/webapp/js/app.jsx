import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import  { browserHistory, Router, Route, IndexRoute, Link, IndexLink } from 'react-router';
import Home from './pages/Home/Home.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Goods from './pages/Goods/Goods.jsx';
import LogIn from './pages/LogIn/LogIn.jsx';
import TopMenu from './pages/TopMenu/TopMenu.jsx';
import ContentHeader from './pages/ContentHeader/ContentHeader.jsx';
import Registration from './pages/Registration/Registration.jsx';
import ProductProfile from './pages/ProductProfile/ProductProfile.jsx';
import CategoryForm from './pages/Goods/CategoryForm/CategoryForm.jsx';
import SearchResultsForm from './pages/Goods/SearchResultsForm/SearchResultsForm.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        console.log(localStorage);
        let appLocal = localStorage.getItem('app');
        console.log(appLocal );
        if (appLocal !== 'undefined' && appLocal != null) {
            console.log("str");
             let str = JSON.parse(appLocal);
             this.state = str;
        } else {
            console.log("set state");
            this.state = {isAuth: false,
                            login: "", 
                            authError : "Enter login/password", 
                            userId : "",
                            userCart : []};
        }
        
        //sessionStorage.setItem("val", 5);

        this.getAuth = this.getAuth.bind(this);
        this.logOut = this.logOut.bind(this);
        this.authentication = this.authentication.bind(this);
        this.pushGoodToCart = this.pushGoodToCart.bind(this);
        this.getUserCart = this.getUserCart.bind(this);
        this.findGoodByProdId = this.findGoodByProdId.bind(this);
        this.deleteGoodFromCart = this.deleteGoodFromCart.bind(this);
        this.clearCart = this.clearCart.bind(this);
    }
    getChildContext() {
        return {
            name: this.state.login,
            changeAuth: this.authentication,
            getAuthFlag: this.getAuth,
            outFunction: this.logOut,
            authError: this.state.authError,
            userId: this.state.userId,
            pushToUserCart: this.pushGoodToCart,
            getCart: this.getUserCart,
            deleteFromCart: this.deleteGoodFromCart,
            clearCart: this.clearCart
        };
    }
    getAuth() {
      return this.state.isAuth;
    }
    logOut() {
        this.setState({
                      isAuth: false, login: "", authError : "", userId : "",  userCart : []
         });
         localStorage.setItem('app', JSON.stringify({
                      isAuth: false, login: "", authError : "", userId : "",  userCart : []
         }));
         console.log(localStorage);
    }
    authentication(userLogin, userPassword) {
      console.log("i'm here");
      let data={
          param: userLogin
      }
      let self = this;
      fetch('http://localhost:8084/RestExample/rest/UserService/authorize', {
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
              }).then(function(response) {
                return response.json();
              }).then(function(json) {
                var answer = (json.password === userPassword);
                
                console.log("saved answer" + JSON.stringify(json));
                if (answer === true) {
                   self.setState({
                    isAuth: answer, login: userLogin, authError : "", userId : json.id,  userCart : self.state.userCart
                }); 
                console.log(localStorage);
                localStorage.setItem('app', JSON.stringify(self.state));
                 browserHistory.push("profile");
                }else {
                   self.setState({
                    isAuth: answer, login: "", authError: "bad login/password", userId : "",  userCart : []
                }); 
                }
                

              }).catch(function(ex) {
                console.log('parsing failed', ex);
              });
      
    }
    pushGoodToCart(good) {
        let lastCartState = this.state.userCart;
        lastCartState.push(good);
        let data = good;
        fetch('http://localhost:8084/RestExample/rest/UserService/addGoodToCart', {
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
              }).then(function(response) {
                return response.json();
              }).then(function(json) {
                  console.log(json.text);
              }).catch(function(ex) {
                console.log('parsing failed', ex);
              });
        this.setState({userCart: lastCartState});
        browserHistory.push("goods");
        localStorage.setItem('app', JSON.stringify(this.state));
    }
    getUserCart() {
        if (this.state.userCart != null)
        return this.state.userCart;
        else return [];
    }
    findGoodByProdId(id) {
        let arr = this.state.userCart;
        for(let i =0; i<arr.length; i++ ) {
            if (arr[i].prodId == id) return i;
        }
    }
    clearCart() {
        this.setState({userCart: {}});
        browserHistory.push("goods");
        localStorage.setItem('app', JSON.stringify(this.state));
    }
    
    deleteGoodFromCart(id) {
        
        let index = this.findGoodByProdId(id);
        console.log("index " + index);
        let arr = this.state.userCart;
        arr.splice(index,1);
        console.log("after splice");
        console.log(arr);
        let data = {param: id};
        fetch('http://localhost:8084/RestExample/rest/UserService/deleteGoodFromCart', {
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
              }).then(function(response) {
                return response.json();
              }).then(function(json) {
                  console.log(json.text);
              }).catch(function(ex) {
                console.log('parsing failed', ex);
              });
        this.setState({userCart: arr});
        localStorage.setItem('app', JSON.stringify(this.state));
    }
    render(){
        let authLinks;
        console.log("getauth " + this.getAuth());
        if (this.getAuth() === true) { 
            console.log("true auth");
            authLinks = (
                    <div className="content main-menu">
                    <IndexLink to="RestExample/" className="main-menu-el"><p>Home</p></IndexLink>
                    <Link to="/profile" className="main-menu-el"><p>Profile</p></Link>
                    <Link to="/cart" className="main-menu-el"> <p>My Cart</p></Link>
                    <Link to="/goods" className="main-menu-el"> <p>Goods</p></Link>
                    </div>
                    );    
        } else {
            console.log("false auth");
            authLinks = (
                    <div className="content main-menu">
                    <IndexLink to="/RestExample/" className="main-menu-el"><p>Home</p></IndexLink>
                    <Link to="/login" className="main-menu-el"> <p>LogIn</p></Link>
                    <Link to="/registr" className="main-menu-el"> <p>Registration</p></Link>
                    <Link to="/goods" className="main-menu-el"> <p>Goods</p></Link>
                    </div>
                    )
        }                        
        return (
                <div>
                <TopMenu />
                <ContentHeader />
                <div className="menu-block">
                    {authLinks}
                </div>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
App.childContextTypes = {
    outFunction: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    changeAuth: React.PropTypes.func.isRequired,
    getAuthFlag: React.PropTypes.func.isRequired,
    authError: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    pushToUserCart: React.PropTypes.func.isRequired,
    getCart: React.PropTypes.func.isRequired,
    deleteFromCart: React.PropTypes.func.isRequired,
    clearCart: React.PropTypes.func.isRequired
};

ReactDOM.render(
        <Router history={browserHistory}>
            <Route path='/RestExample/' component={App}>
              <IndexRoute component={Home} />
              <Route ute path="/cart" component={Cart} />
              <Route path="/profile" component={Profile} />
              <Route path="/goods" component={Goods} > </Route>
              <Route path="/prprof(/:userID)" component={ProductProfile} />
              <Route path="/categoryGoods(/:categoryName)" component={CategoryForm} />
              <Route path="/login" component={LogIn} />
              <Route path="/registr" component={Registration}/>
               <Route path="/searchResults" component={SearchResultsForm}/>
            </Route>
           </Router>,
        document.getElementById('container')
);
