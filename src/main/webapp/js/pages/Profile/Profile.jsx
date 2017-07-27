import React from 'react';
import TextBox from '../TextBox/TextBox.jsx';

export default class Profile extends  React.Component {
    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.postData = this.postData.bind(this);
        this.state = { answer: {}, modifyMode: false};
        
        let data = {param: this.context.userId};
        let url = 'http://localhost:8084/RestExample/rest/UserService/getProfile';
        console.log(JSON.stringify(data));
        localStorage.setItem('cart', JSON.stringify({products: []}));
        this.postData(url, data);
        

    }
    postData(url,data) {
        console.log('fetch to ' + url + JSON.stringify(data));
        let self = this;
        fetch(url, {
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
              }).then(function(response) {
                return response.json()
              }).then(function(json) {
                console.log('parsed json', json)
                self.setState({answer: json});
//                if (self.context.getAuthFlag() === true);
//                   self.context.router.push("/login");

              }).catch(function(ex) {
                console.log('parsing failed', ex)
        });
    }
    onChange(event) {
        console.log(event.target.value + " " + event.target.name);
        this.state.answer[event.target.name] = event.target.value;
        this.setState({answer: this.state.answer} );
    }
    onSubmit(event) {
            event.preventDefault();
            alert("Modifyed");
            let data = this.state.answer;
            let url = 'http://localhost:8084/RestExample/rest/UserService/setProfile';
            
            this.setState({modifyMode: !this.state.modifyMode} );
            console.log("after !" + this.state.modifyMode);
            if (this.state.modifyMode) this.postData(url,data);

     }
  render() {
      let readonlyPr = (this.state.modifyMode) ? ""  : "readonly";
      let submitText = (this.state.modifyMode) ? "Save11 changes" : "Modify";
      let item = {classN : "field", readOnly: readonlyPr};
      return (
          <div className="person-content">
    <div className="person-view">
      <p>Persons Profile</p>
      <img src="/RestExample/img/user.png" alt=""/>
    </div>
    <div className="person-info">
    <form onSubmit={this.onSubmit} className="account">
        <p>Account</p>
        <div className="row">
            <label htmlFor="firstName">First Name*</label>
            <TextBox name='firstName' 
                value={this.state.answer.firstName}
                onChange={this.onChange}
                object={item}/>
        </div>
        <div className="row">
            <label htmlFor="lastName">Last Name*</label>
            <TextBox name='lastName' 
                value={this.state.answer.lastName}
                onChange={this.onChange}
                object={item}/>
        </div>
        <div className="row">
            <label htmlFor="adress">Adress*</label>
            <TextBox name='adress' 
                value={this.state.answer.adress}
                onChange={this.onChange}
                object={item}/>
        </div>
        <div className="row">
           <label htmlFor="telephoneNumber">Telephone Number*</label>
            <TextBox name='telephoneNumber' 
                value={this.state.answer.telephoneNumber}
                onChange={this.onChange}
                object={item}/>
        </div>
        <div className="row">
           <label htmlFor="emailPassword">Password*</label>
            <TextBox name='emailPassword' 
                value={this.state.answer.emailPassword}
                onChange={this.onChange}
                object={item}/>
        </div>
        <div className="reg-row">
            <input type='submit' value={submitText} name="reg-btn"/>
        </div>
     </form>
    </div>
    </div>
      );
    }
};

Profile.contextTypes = {
        name: React.PropTypes.string.isRequired,
        getAuthFlag: React.PropTypes.func.isRequired,
        userId: React.PropTypes.string.isRequired
    }