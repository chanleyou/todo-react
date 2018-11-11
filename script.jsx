class List extends React.Component {
	constructor() {
		super()
		this.changeHandler = this.changeHandler.bind(this);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}

	state = {
		list: [],
		word: "",
		warning: ""
	}

	changeHandler(event) {
		this.setState({ word: event.target.value });
	}

	addItem(event) { 
		if (this.state.word.length > 2) {
			event.preventDefault();
			this.state.list.push(this.state.word);
			this.setState({
				list: this.state.list,
				word: '',
				warning: ''
			})
		} else {
			event.preventDefault();
			this.setState({
				warning: "List item must be at 3 characters long."
			})
		}
	}

	removeItem(index) {
		this.state.list.splice(index, 1);
		this.setState({
			list: this.state.list
		})
	}

	render() {

		return (
			<div className="container">
				<div className="row">
					<div className="col">
						<Alert alert={this.state.warning} />
						<form className="input-group my-4" onSubmit={this.addItem}>
							<input onChange={this.changeHandler} value={this.state.word} className="form-control" placeholder="New list item" autoComplete="off" />
							<div className="input-group-append">
								<button type="submit" className="btn btn-danger">Add</button>
							</div>
						</form>
						<ListItems list={this.state.list} removeItem={this.removeItem} />
					</div>
				</div>
			</div>
		);
	}
}

class Alert extends React.Component {
	render () {

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

	removeItem(index) {
		this.props.removeItem(index);
	}
	render() {

		let list = this.props.list.map((item, index) => {
			return (
				<li key={item}>
					{item}<br />
					<button className="btn btn-danger btn-sm" onClick={() => {this.removeItem(index)}}>X</button>
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

