import React from 'react';
import { browserHistory, Link } from 'react-router';
import TextBox from '../TextBox/TextBox.jsx';

export default class Registration  extends  React.Component {
    constructor(props) {
        super(props);
        this.state = { form: { firstName: 'fdg', 
                lastName: 's', 
                adress: 'df', 
                telephoneNumber: '222', 
                loginField: "aks",
                emailPassword: 'dfds', 
                confirmPassword: 'sdf'},
            answer: {}
            };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        this.state.form[event.target.name] = event.target.value;
        this.setState({form: this.state.form});
    }
     onSubmit(event) {
            event.preventDefault();
            var self = this;
            var data = {
                firstName: this.state.form.firstName,
                lastName:this.state.form.lastName,
                adress: this.state.form.adress, 
                telephoneNumber: this.state.form.telephoneNumber, 
                login: this.state.form.loginField, 
                emailPassword: this.state.form.emailPassword
            };
            alert("df" + JSON.stringify(data));
            
            fetch('http://localhost:8084/RestExample/rest/UserService/registr', {
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
                if (self.context.getAuthFlag() === true);
                   browserHistory.push("/login");

              }).catch(function(ex) {
                console.log('parsing failed', ex)
              })
    }
    render() {
        let self = this;
        let item = {classN : "rfield"};
        return (
                <div className="reg-block">
                <p>New User Registration</p>
                <form onSubmit={this.onSubmit} name="registr-form">
                 <div className="reg-row">
                    <label htmlFor="firstName" className="reg-label">First Name*</label>
                    <TextBox name='firstName' 
                        value={this.state.form.firstName}
                        onChange={self.onChange}
                        object={item}/>
                  </div>
                   <div className="reg-row">
                    <label htmlFor="lastName" className="reg-label">Last Name*</label>
                    <TextBox name='lastName' 
                        value={this.state.form.lastName}
                        onChange={self.onChange}
                        object={item}/>
                  </div>
                  <div className="reg-row">
                    <label htmlFor="adress" className="reg-label">Adress*</label>
                    <TextBox name='adress' className="rfield"
                        value={this.state.form.adress}
                        onChange={self.onChange}
                        object={item}/>
                  </div>
                  <div className="reg-row">
                    <label htmlFor="telephoneNumber" className="reg-label">Telephone Number*</label>
                        <TextBox name='telephoneNumber' className="rfield"
                        value={this.state.form.telephoneNumber}
                        onChange={self.onChange}
                        object={item}/>
                  </div>
                  <div className="reg-row">
                    <label htmlFor="loginField" className="reg-label">Login*</label>
                        <TextBox name='loginField' className="rfield"
                        value={this.state.form.login}
                        onChange={self.onChange}
                        object={item}/>
                  </div>
                  <div className="reg-row">
                    <label htmlFor="emailPassword" className="reg-label">Email Password*</label>
                    <TextBox name='emailPassword'
                    value={this.state.form.emailPassword}
                    onChange={self.onChange}
                    object={item}/>
                  </div>
                  <div className="reg-row">
                    <label htmlFor="confirmPassword" className="reg-label">Confirm Password*</label>
                    <TextBox name='confirmPassword' className="rfield"
                    value={this.state.form.confirmPassword}
                    onChange={self.onChange}
                    object={item}/>
                  </div>
                  <div className="reg-row">
                    <input type='submit' value="REGISTRATION" name="reg-btn"/>
                  </div>
                </form>
            </div>
                );
    }
};

Registration.contextTypes = {
        getAuthFlag: React.PropTypes.func.isRequired
    }
