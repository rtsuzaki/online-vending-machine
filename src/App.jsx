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
    this.buyItemHandler = this.buyItemHandler.bind(this);
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

    fetch('/balance', { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response failed');
      })
      .then(latestBalance => this.setState({ balance: latestBalance.main_user_balance }))
      .catch((error) => {
        console.log('Error fetching', error.message);
      });
  }


  addToBalance() {
    this.setState((prevState) => {
      return { balance: prevState.balance + 1 };
    });
  }

  buyItemHandler(item) {
    console.log(item)
    console.log('state balance', this.state.balance)
    const updatedBalance = this.state.balance - item.price;

    if (this.state.balance >= item.price) {
      fetch(`/balance/${updatedBalance}`, { method: 'put' })
        .then(response => response.json())
        .then(response => {
          console.log('HERE')
          this.setState({ balance: parseFloat(response) })
        });
    }
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

        <ItemList items={this.state.items} buyItem={this.buyItemHandler} />

      </div>
    );
  }
}

export default App;
