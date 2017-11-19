import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';
import Title from './Title';
import axios from 'axios';
import './css/Main.css';

class App extends React.Component {	
	
	constructor() {
		super(); 
		this.state = {
			selectValue:'people',
			title:'',
			inputValue: '',
			items: [],
		};
		
		this.DropDownChange = this.DropDownChange.bind(this);
		this.InputChange = this.InputChange.bind(this);
		this.UpdateInfo = this.UpdateInfo.bind(this);
	}
	
	DropDownChange(e){
        this.setState({selectValue:e.target.value});
    }
	
	InputChange(e){
		this.setState({inputValue: e.target.value});
	}
	
	UpdateInfo(e){
		this.state.title = this.state.selectValue;
		axios({
			method:'get',
			baseURL:'https://swapi.co/api/',
			url:this.state.selectValue + '/?search=' +this.state.inputValue
		})
		
		.then(response => {
			const items = response.data.results.map(obj => obj);
            this.setState({ items });
		});
	}
	
	render(){
		let items = this.state.items
		return (
			<div>
				<div className="component-main">
						<select className="flex-item" value={this.state.selectValue} onChange={this.DropDownChange} >
							<option value="people">Person</option>
							<option value="films">Film</option>
							<option value="starships">Starship</option>
							<option value="species">Specie</option>
							<option value="planets">Planet</option>
							<option value="vehicles">Vehicle</option>
						</select>
					<input className="flex-item" type="text" value={this.state.value} onChange={this.InputChange} />
					<button className="flex-item" onClick={this.UpdateInfo}>Search</button>
				</div>
				<Title title = {this.state.title}/>
				{this.state.items.map(item =>
					<List key = {item.name} attributes = {item}/> 
				)}
			</div>
		)
	}
}



export default App