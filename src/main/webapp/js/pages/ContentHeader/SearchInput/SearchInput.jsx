import React from 'react';
import  { browserHistory } from 'react-router';
import TextBox from '../../TextBox/TextBox.jsx';

export default class SearchInput extends  React.Component {
    constructor(props) {
        super(props);   
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {searchRes: [], form: { search: ''}};
        
    }   
    onSubmit(event) {
        event.preventDefault();
        alert("submit");
        let goods = JSON.parse(localStorage.getItem('goods'));
        let answer = goods.answer;
        let search = "good";
        let self = this;
        let out = answer.filter(function(item) {
            
            console.log(self.state.form.search);
            if (item.title.indexOf(self.state.form.search) != -1) return true;
        });
        console.log("out");
        console.log(out);
        this.setState({searchRes: out});
        localStorage.setItem('searchResults',JSON.stringify({searchRes: out}) );
        browserHistory.push("searchResults");
        
    }
    onChange(event) {
        localStorage.setItem('searchResults',JSON.stringify({searchRes: {}}) );
        console.log(event.target.value);
        this.state.form[event.target.name] = event.target.value;
        this.setState({form: this.state.form});
    }
    render() {
               
        return (
               <form className="bottom-info-block" onSubmit={this.onSubmit}>
                         <TextBox name='search'
                            value={this.state.form.search}
                            onChange={this.onChange}
                         object={{}}/>
                        <input type="submit" name="search-btn" value="Search"/>
                </form>
                );
    }
};
