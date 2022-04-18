import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
  state = {lat: null, error: ''}; //this is a abbreviation of building same thing in constructor method, and babel is doing the heavy work behind the scene.

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({lat: position.coords.latitude}) //in this case, setState function only refactors value of "lat", not deleting and not touching anything about "error"
      },
      (err) => this.setState({error: err.message})
    )
  };

  renderContent = () => {
    if (this.state.lat && !this.state.error) {
      return (
        <SeasonDisplay lat={this.state.lat} />
      )
    }

    if (this.state.error && !this.state.lat) {
      return (
        <div>Error: {this.state.error}</div>
      )
    }

    return (
      <Spinner message="Please accept location request"/>
    )
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)