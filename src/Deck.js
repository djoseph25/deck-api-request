import React, { Component } from 'react';
import axios from 'axios';
import Card from './card';
import './Deck.css';
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

class DeckApi extends Component {
	constructor(props) {
		super(props);
		this.state = { deck: null, drawn: [] };
		this.getCard = this.getCard.bind(this);
	}
	// with asyn you don't have to write arrow function or .then
	async componentDidMount() {
		let Deck = await axios.get(`${API_BASE_URL}/new/shuffle`);
		this.setState({ deck: Deck.data });
	}
	async getCard() {
		let id = this.state.deck.deck_id;
		try {
			let cardURl = `${API_BASE_URL}/${id}/draw/`;
			let cardRes = await axios.get(cardURl);
			if (!cardRes.data.success) {
				throw new Error('No Card Remaining Please Refresh');
			}

			let card = cardRes.data.cards[0];
			this.setState((state) => ({
				drawn: [
					...state.drawn,
					{
						id: card.code,
						image: card.image,
						name: `${card.value} of ${card.name}`,
					},
				],
			}));
		} catch (err) {
			alert(err);
		}
	}

	render() {
		const cards = this.state.drawn.map((c) => <Card key={c.id} name={c.name} image={c.image} />);
		return (
			<div className="Deck">
				<h1 className="Deck-title">♣ Card Dealer ♠</h1>
				<h3 className="Deck-title-subtitle">A Random deck made with React and Axios</h3>
				<button className="button" onClick={this.getCard}>
					get Card
				</button>
				{cards}
			</div>
		);
	}
}

export default DeckApi;
