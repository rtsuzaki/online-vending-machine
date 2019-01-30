import React from "react";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
    };
    this.addToBalance = this.addToBalance.bind(this);
  }

  addToBalance() {
    console.log('hit');
    this.setState({ balance: this.state.balance + 1 });
  }

  render() {
    return (
      <div>
        <button onClick={this.addToBalance}>
          Add money to account
        </button>
        <div>
        The user balance is:
        </div>
        <div>
          {this.state.balance}
        </div>
      </div>
    );
  }
}

export default App;
