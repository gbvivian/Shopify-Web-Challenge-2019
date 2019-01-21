import React, { Component } from 'react';

function guidGenerator() {
	var S4 = function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}

class Star extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: guidGenerator()
		};
	}

	handleClick = (event) => {
		this.props.onClickHandler(!this.props.isFavourited);
	};

	render() {
		return (
			<React.Fragment>
				<input
					type="checkbox"
					id={this.state.id}
					name="cc"
					checked={this.props.isFavourited}
					onChange={this.handleClick}
				/>
				<label htmlFor={this.state.id}>
					<span className="star-five" />
				</label>
			</React.Fragment>
		);
	}
}

export default Star;
