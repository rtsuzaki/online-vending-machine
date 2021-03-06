import React from "react";
import ItemList from './ItemList.jsx';
import AddToBalanceButton from './AddToBalanceButton.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      items: [],
    };

    this.addToBalance = this.addToBalance.bind(this);
    this.buyItemHandler = this.buyItemHandler.bind(this);
    this.requestBalanceUpdate = this.requestBalanceUpdate.bind(this);
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


  addToBalance(addedVal) {
    const updatedBalance = this.state.balance + addedVal;
    this.requestBalanceUpdate(updatedBalance);
  }

  //Separated this function so it is more flexible and can be used within other functions 
  requestBalanceUpdate(updatedBalance) {
    return fetch('/balance', {
      method: 'put',
      body: JSON.stringify({ updatedBalance }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ balance: response.updatedBalance })
      })
  }

  buyItemHandler(item) {
    const updatedBalance = this.state.balance - item.price;

    if (this.state.balance >= item.price && item.quantity > 0) {
      this.requestBalanceUpdate(updatedBalance)
        .then(fetch(`/items/${item.id}`, {
          method: 'put',
          body: JSON.stringify({ updatedQuantity: item.quantity - 1 }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(response => {
            const itemsCopy = this.state.items.slice(0);
            for (let i = 0; i < itemsCopy.length; i += 1) {
              if (itemsCopy[i].id === item.id) {
                itemsCopy[i].quantity = response.updatedQuantity;
              }
            }
            this.setState({ items: itemsCopy });
          }));
    } else if (item.quantity <= 0) {
      window.alert(`Sorry, ${item.name} is out of stock`);
    } else {
      window.alert("Insufficent balance. Please add more to your balance in order to purchase this item.");
    }
  }

  render() {
    return (
      <div>

        <div id="balance-header">
          The user balance is:
        </div>

        <div id="balance">
          ${this.state.balance}
        </div>

        <div>
          {[1, 5, 10, 20].map((addedVal) => {
            return <AddToBalanceButton key={addedVal} addToBalance={this.addToBalance} addedVal={addedVal} />;
          })}
        </div>

        <ItemList items={this.state.items} buyItem={this.buyItemHandler} />

      </div>
    );
  }
}

export default App;
