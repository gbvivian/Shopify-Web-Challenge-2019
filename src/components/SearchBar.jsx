import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userInput: ''
		};
	}

	render() {
		return (
			<React.Fragment>
				<form className="d-flex bd-highlight" onSubmit={this.handleSubmit}>
					<input
						className="Search-bar mr-3 from-control"
						type="text"
						placeholder="Search proper disposal"
						value={this.state.userInput}
						onChange={this.handleChange}
					/>
					<span className="input-group-append">
						<button className="btn btn-success" type="submit">
							<i className="fa fa-search fa-flip-horizontal" />
						</button>
					</span>
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
		if (event.target.value === '') {
			this.props.onEmptyInput();
		}
	};
}

export default SearchBar;
