import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props) {
		super();
		this.state = {
			userInput: 'rope'
		};
	}

	render() {
		return (
			<React.Fragment>
				<form onSubmit={this.handleSubmit}>
					<input
						className="Search-bar"
						type="text"
						placeholder="Search for something"
						value={this.state.userInput}
						onChange={this.handleChange}
					/>
					<input type="submit" />
				</form>
			</React.Fragment>
		);
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onSearch(this.state.userInput);
	};

	handleChange = (event) => {
		this.setState({
			userInput: event.target.value
		});
	};
}

export default SearchBar;
