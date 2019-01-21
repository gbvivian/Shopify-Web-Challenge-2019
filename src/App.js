import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Item from './components/Item';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredItems: [],
			favourites: []
		};
		this.getTorontoWasteData();
	}

	getTorontoWasteData = () => {
		return fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000').then((response) => {
			return response.json();
		});
	};

	handleSearch = (input) => {
		if (input === '') {
			return;
		}
		this.getTorontoWasteData().then((itemList) => {
			var filteredItemList = itemList.filter((item) => item.keywords.includes(input));
			filteredItemList = filteredItemList.map((item) => {
				return {
					...item,
					isFavourited: this.isFavourited(item)
				};
			});
			this.setState({ filteredItems: filteredItemList });
		});
	};

	isFavourited = (item) => {
		for (let favouritedItem of this.state.favourites) {
			if (item.title === favouritedItem.title) {
				return true;
			}
		}
		return false;
	};

	containsKeyword = (input, keywords) => {
		var splitKeywordsArr = keywords.split(', ');
		return splitKeywordsArr.includes(input);
	};

	handleFavourite = (checkedState, item) => {
		if (checkedState) {
			this.addToFavourites(item);
		} else {
			this.removeFromFavourites(item);
		}
	};

	addToFavourites = (item) => {
		var newItemList = this.state.filteredItems;
		for (let newItem of newItemList) {
			if (item.title === newItem.title) {
				newItem.isFavourited = true;
			}
		}
		this.setState({
			favourites: [ ...this.state.favourites, item ],
			filteredItemList: newItemList
		});
	};

	removeFromFavourites = (item) => {
		var newItemList = this.state.filteredItems;
		for (let newItem of newItemList) {
			if (item.title === newItem.title) {
				newItem.isFavourited = false;
			}
		}
		this.setState({
			favourites: this.state.favourites.filter((favouritedItem) => favouritedItem.title !== item.title),
			filteredItems: newItemList
		});
	};

	clearFilteredItems = () => {
		this.setState({ filteredItems: [] });
	};

	render() {
		var filteredSection = (
			<div className="mt-5 mx-3">
				{this.state.filteredItems.map((item, index) => {
					return (
						<Item
							key={index}
							isFavourited={item.isFavourited}
							itemName={item.title}
							itemDesc={item.body}
							handleFavourite={this.handleFavourite}
						/>
					);
				})}
			</div>
		);

		// Only render the favourites section if there are items in there.
		var favouritesSection = this.state.favourites.length > 0 && (
			<div className="mt-5 px-3 favourites-container">
				<h1 className="favourites-title">Favourites</h1>
				{this.state.favourites.map((item, index) => {
					return (
						<Item
							key={index}
							isFavourited={item.isFavourited}
							itemName={item.title}
							itemDesc={item.body}
							handleFavourite={this.handleFavourite}
						/>
					);
				})}
			</div>
		);

		return (
			<div>
				<header className="App-header">Toronto Waste Lookup</header>
				<div className="mt-3 mx-3">
					<SearchBar onSearch={this.handleSearch} onEmptyInput={this.clearFilteredItems} />
				</div>
				{filteredSection}
				{favouritesSection}
			</div>
		);
	}
}

export default App;
