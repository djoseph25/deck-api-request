import React, { Component } from 'react';
import './card.css';

class Card extends Component {
	constructor(props) {
		super(props);
		//tranform: translate(10px, 20px) rotate(20deg)
		let angle = Math.random() * 90 - 45;
		let xPos = Math.random() * 40 - 20;
		let yPos = Math.random() * 40 - 20;
		// select a random angle for me
		this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
		// console.log(transform);
		//Pass tranform in as a style
	}

	render() {
		return (
			<img
				style={{ transform: this._transform }}
				className="Card"
				src={this.props.image}
				alt={this.props.name}
			/>
		);
	}
}

export default Card;
