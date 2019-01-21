import React, { Component } from 'react';

class Star extends Component {
	constructor(props) {
		super(props);
	}
	//TODO: double check if event even fits LOL
	handleClick = (event) => {
		console.log('this is the event:', event.target);
		this.props.onClickHandler(!this.props.isFavourited);
	};

	render() {
		return (
			<React.Fragment>
				<input
					type="checkbox"
					id="c1"
					name="cc"
					checked={this.props.isFavourited}
					onChange={this.handleClick}
				/>
				<label for="c1">
					<span className="star-five" />
				</label>

				{/* THIS WORKS */}
				{/*
				<input type="checkbox" id="c1" name="cc" />
				<label for="c1">
					<span>Check Box 1</span>
				</label> */}
			</React.Fragment>
		);
	}
}

export default Star;
