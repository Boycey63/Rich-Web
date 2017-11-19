import React from 'react';
import './css/Title.css';


class Title extends React.Component {
	
	render(){
		let title = this.props.title;
		return(
		<div className="component-title">
			<h1>{title}</h1>
		</div>
		)
	}
}



export default Title
