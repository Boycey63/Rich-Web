import React from 'react';
import './css/List.css';

class List extends React.Component {
	
	render(){
		const keyVal = Object.keys(this.props.attributes)
		const dataValues = Object.values(this.props.attributes)

		return(
		<div  className="component-list">
			<table>
					<tr>
						<th>{keyVal[0]} :</th>
						<td>{dataValues[0]}</td>
					</tr>
					<tr>
						<th>{keyVal[2]} :</th>
						<td>{dataValues[2]}</td>
					</tr>
					<tr>
						<th>{keyVal[3]} :</th>
						<td>{dataValues[3]}</td>
					</tr>
					<tr>
						<th>{keyVal[4]} :</th>
						<td>{dataValues[4]}</td>
					</tr>
					<tr>
						<th>{keyVal[5]} :</th>
						<td>{dataValues[5]}</td>
					</tr>
					<tr>
						<th>{keyVal[6]} :</th>
						<td>{dataValues[6]}</td>
					</tr>
					<tr>
						<th>{keyVal[7]} :</th>
						<td>{dataValues[7]}</td>
					</tr>
					<tr>
						<th>{keyVal[8]} :</th>
						<td>{dataValues[8]}</td>
					</tr>
					<tr>
						<th>{keyVal[9]} :</th>
						<td>{dataValues[9]}</td>
					</tr>
					<tr>
						<th>{keyVal[10]} :</th>
						<td>{dataValues[10]}</td>
					</tr>
					
			</table>
		</div>
		)
	}
}



export default List
