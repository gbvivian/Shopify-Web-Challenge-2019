import React, { Component } from 'react';
import Star from './Star';

class Item extends Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	setFavouriteState = (favState) => {
		this.props.handleFavourite(favState, {
			isFavourited: favState,
			title: this.props.itemName,
			body: this.props.itemDesc
		});
	};

	decodeHTML = (html) => {
		var doc = new DOMParser().parseFromString(html, 'text/html');
		return doc.body.innerText;
	};

	render() {
		return (
			<div className="Item">
				<Star isFavourited={this.props.isFavourited} onClickHandler={this.setFavouriteState} />
				{/* TODO: CAN PROBABLY DELETE LINE BELOW */}
				{/* <input type="checkbox" onChange={this.props.handleChange} /> */}

				<div className="item1">{this.props.itemName}</div>
				<div className="desc" dangerouslySetInnerHTML={{ __html: this.decodeHTML(this.props.itemDesc) }} />
			</div>
		);
	}
}

export default Item;
