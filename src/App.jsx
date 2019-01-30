import React from "react";
import ItemList from './ItemList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      items: [],
    };

    this.addToBalance = this.addToBalance.bind(this);
  }

  componentDidMount() {
    fetch('/items', { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response failed');
      })
      .then(data => this.setState({ items: data }))
      .catch((error) => {
        console.log('Error fetching', error.message);
      });
  }


  addToBalance() {
    this.setState((prevState) => {
      return { balance: prevState.balance + 1 }
    });
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.addToBalance}>
          Add money to account
        </button>
        <div>
        The user balance is:
        </div>
        <div>
          {this.state.balance}
        </div>

        <ItemList items={this.state.items}/>

      </div>
    );
  }
}

export default App;
