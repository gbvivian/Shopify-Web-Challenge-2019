import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Item from './components/Item';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			// filteredItems: [{ [title: ___, desc: ____, keywords: ___, isFavourited: ____]
			filteredItems: [],
			// favourites: [{[title: ___, desc: ____, isFavourited: ____]}],
			favourites: []
		};

		this.getData();
	}

	getData = () => {
		return fetch('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000').then((response) => {
			return response.json();
		});
	};

	handleSearch = (input) => {
		this.getData().then((itemList) => {
			var filteredItemList = itemList.filter((item) => item.keywords.includes(input));

			filteredItemList = filteredItemList.map((item) => {
				return {
					...item,
					isFavourited: this.isFavourited(item)
				};
			});
			this.setState({ filteredItems: filteredItemList });

			// for every item, initialize title, body, keywords, and initialize isFavourited to be the appropriate state
			// check if item is in Favourites list, if it is, set isFavourited to true. otherwise, false.

			// FOR TESTING
			// console.log('input is ' + input);
			// console.log('itemList[0] keywords are: ' + itemList[0].keywords);
			// console.log(this.containsKeyword(input, itemList[0].keywords));
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

	// NEW CONTAINS KEYWORD
	// split the keywords string into an array of keywords
	// if, within the item's keywords, we find the INPUT, we say yes!
	containsKeyword = (input, keywords) => {
		var splitKeywordsArr = keywords.split(', ');
		// console.log(splitKeywordsArr.includes(input));
		return splitKeywordsArr.includes(input);
		/*
		for (let keyword of splitKeywordsArr) {
			if (input === keyword) {
				return true;
			}
		}
		return false;
		*/
	};

	// TODO: Fix this function
	handleFavourite = (checkedState, item) => {
		console.log('handleFavourite called');
		console.log(checkedState);
		console.log(item);
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

	// given an item, remove it from the favourites list
	// it will be guaranteed that it is on the favourite list
	// (ok to assume that the checked state is checked)
	removeFromFavourites = (item) => {
		var newItemList = this.state.filteredItems;
		for (let newItem of newItemList) {
			if (item.title === newItem.title) {
				newItem.isFavourited = false;
			}
		}
		this.setState({
			favourites: this.state.favourites.filter((favouritedItem) => favouritedItem.title !== item.title),
			filteredItemList: newItemList
		});
	};

	// TO ADD

	render() {
		return (
			<div className="App">
				<header className="App-header">Toronto Waste Lookup</header>

				<SearchBar onSearch={this.handleSearch} />
				{/* THIS SECTION WORKS */}
				{/* <input type="checkbox" id="c1" name="cc" />
				<label for="c1">
					<span>Check Box 1</span>
				</label> */}

				{/* EXPERIMENTAL SECTION */}
				{/* <input type="checkbox" id="c1" name="cc" />
				<label for="c1">
					<span>Check Box 1</span>
				</label> */}

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
					// return <Item key={index} itemName={item.title} itemDesc={this.htmlParser(item.body)} />;
				})}
				<div>Favourites</div>
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
	}
}

// TODO: uncomment
// function Item(props) {
// 	return (
// 		<div className="Item">
// 			<Star onChange={this.props.handleChange} />
// 			{/* <input type="checkbox" onChange={props.handleChange} /> */}

// 			<div className="item1">{props.itemName}</div>
// 			<div className="desc">{props.itemDesc}</div>
// 		</div>
// 	);
// }

// https://stackoverflow.com/questions/3700326/decode-amp-back-to-in-javascript
// https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518

// STUFF
// your ugly string
// var html =
// 	'&lt;ul&gt; \n &lt;li&gt;Place item in the &lt;strong&gt;Garbage Bin.&lt;/strong&gt;&lt;/li&gt; \n&lt;/ul&gt;';

// // put your ugly string but then not sure what 'text/html' does
// var doc = new DOMParser().parseFromString(html, 'text/html');
// // LOL ya copy pasta this?
// document.getElementById('c').innerHTML = doc.body.innerText;

export default App;
