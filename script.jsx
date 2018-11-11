class List extends React.Component {
	constructor() {
		super()
		this.changeHandler = this.changeHandler.bind(this);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);

		this.toggleTrue = () => {
			this.setState({ toggle: true });
		}

		this.toggleFalse = () => {
			this.setState({ toggle: false });
		}
	}

	state = {
		list: [{name: '', items: []}],
		word: "",
		warning: "",
		toggle: true,
		group: 0
	}

	changeHandler(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	addItem(event) {
		event.preventDefault();

		if (this.state.word.length < 3) {
			this.setState({
				warning: "New item must be at 3 characters long."
			})
		} else {
			if (this.state.toggle) {
				this.state.list[this.state.group].items.push({ text: this.state.word, datetime: Date.now() });
			} else {
				this.state.list.push({ name: this.state.word, items: [] });
			}
			this.setState({
				list: this.state.list,
				word: '',
				warning: ''
			})
		}
	}

	removeItem(groupIndex, itemIndex) {
		this.state.list[groupIndex].items.splice(itemIndex, 1);
		this.setState({
			list: this.state.list
		})
	}

	render() {

		var groupSelect = this.state.list.map ((item, index) => {
			return (
				<option key={index} value={index}>{item.name}</option>
			)
		})

		if (this.state.toggle) {
			var itemForm =
				<form className="input-group my-4" onSubmit={this.addItem}>
					<input name="word" onChange={this.changeHandler} value={this.state.word} className="form-control" placeholder="New Item" autoComplete="off" />
					<div className="input-group-append">
						<button type="submit" className="btn btn-danger">Add Item</button>
					</div>
					<div className="input-group my-3">
						<div className="input-group-prepend">
							<label className="input-group-text">Group</label>
						</div>
						<select name="group" onChange={this.changeHandler} className="custom-select" defaultValue="0">
						{groupSelect}
						</select>
					</div>
				</form>
		} else {
			var itemForm =
				<form className="input-group my-4" onSubmit={this.addItem}>
					<input name="word" onChange={this.changeHandler} value={this.state.word} className="form-control" placeholder="New Group" autoComplete="off" />
					<div className="input-group-append">
						<button type="submit" className="btn btn-danger">Add Group</button>
					</div>
				</form>
		}


		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div className="card p-3 my-2 shadow-sm">
							<div className="btn-group">
								<button className="btn btn-outline-secondary" onClick={this.toggleTrue}>Add Item</button>
								<button className="btn btn-outline-secondary" onClick={this.toggleFalse}>Add Group</button>
							</div>
							<Alert alert={this.state.warning} />
							{itemForm}
						</div>
					</div>
				</div>
				<ListGroups list={this.state.list} removeItem={this.removeItem} />
			</div>
		);
	}
}

class ListGroups extends React.Component {
	constructor() {
		super ()
		
		this.removeItem = this.removeItem.bind(this);
	}

	removeItem(index) {
		this.props.removeItem(index);
	}
	render() {

		let list = this.props.list.map((group, index) => {
			return (
				<div key={group.name} className="col-12">
					<div className="card p-3 my-2 shadow-sm">
						<h5>{group.name}</h5>
						<ListItems index={index} list={group.items} removeItem={this.props.removeItem} /> 
					</div>
				</div>
			)
		})

		return <div className="row">{list}</div>
	}
}


class Alert extends React.Component {
	render() {

		if (this.props.alert) {
			return <div className="alert alert-danger my-2">{this.props.alert}</div>
		} else {
			return <template />
		}
	}
}

class ListItems extends React.Component {
	constructor() {
		super()
		
		this.removeItem = this.removeItem.bind(this);
	}

	removeItem(groupIndex, itemIndex) {
		this.props.removeItem(groupIndex, itemIndex);
	}
	render() {


		let list = this.props.list.map((item, index) => {
			
			return (
				<li key={item.text}>
					{item.text}<br />
					{moment(item.datetime).format("h:mma ddd Do MMMM YYYY")}
					<button className="btn btn-danger btn-sm" onClick={() => { this.removeItem(this.props.index, index) }}>X</button>
				</li>
			)
		})

		return (
			<ul>
				{list}
			</ul>
		)
	}
}

ReactDOM.render(
	<List />,
	document.getElementById('root')
);

