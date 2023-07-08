import { Component } from 'react';

import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyles } from 'components/GlobalStyles';
import { AppContainer } from './App.styled';

class App extends Component {
  state = {
    searchQuery: '',
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <AppContainer>
        <Searchbar handleSearch={this.handleSearch} />
        <ImageGallery searchQuery={this.state.searchQuery} />
        <ToastContainer />
        <GlobalStyles />
      </AppContainer>
    );
  }
}

export default App;
