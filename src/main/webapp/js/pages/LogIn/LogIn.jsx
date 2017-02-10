import React from 'react';

export default class LogIn extends React.Component {
   constructor(props, context) {
    super(props,context);
    this.state = {
        form: { login: 'fdg', 
                    password: 's'
            },
        answer: {}
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  getAuth() {
      return this.state.isAuth;
  }
  logOut() {
      this.setState({
                    isAuth: false, login: "", authError : ""
       }); 
  }
  
    onChange(event) {
        this.state.form[event.target.name] = event.target.value;

        this.setState({form: this.state.form});
    }
     onSubmit(event) {
            event.preventDefault();
            this.context.changeAuth(this.state.form.login, this.state.form.password);
     }
    render() {
        const {changeAuth} = this.context;
        return (
           <div id="login-form">
            <h1>Авторизация на сайте</h1>

            <fieldset>
                <form onSubmit={this.onSubmit}>
                    <input type="login" name="login" value={this.state.form.login} onChange={this.onChange} required/>
                    <input type="password" name="password" required value={this.state.form.password} onChange={this.onChange}/>
                    <input type="submit" value="ВОЙТИ" name="LogSubmit"/>
                    <footer className="clearfix">
                        <p><span className="info">?</span><a href="#">{this.context.authError}</a></p>
                    </footer>
                </form>
            </fieldset>

        </div>
        );
    }
};

LogIn.contextTypes = {
  changeAuth: React.PropTypes.func.isRequired,
  authError: React.PropTypes.string.isRequired
};