import React, { Component } from 'react';
import Star from './Star';

class Item extends Component {
	constructor(props) {
		super(props);
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
			<div className="d-flex flex-row bd-highlight">
				<div className="p-2 bd-highlight">
					<Star isFavourited={this.props.isFavourited} onClickHandler={this.setFavouriteState} />
				</div>
				<div className="item-title p-2 bd-highlight">{this.props.itemName}</div>
				<div
					className="item-desc p-2 bd-highlight"
					dangerouslySetInnerHTML={{ __html: this.decodeHTML(this.props.itemDesc) }}
				/>
			</div>
		);
	}
}

export default Item;
