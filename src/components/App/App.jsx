import { useState } from 'react';

import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyles } from 'components/GlobalStyles';
import { AppContainer } from './App.styled';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AppContainer>
      <Searchbar handleSearch={setSearchQuery} />
      <ImageGallery searchQuery={searchQuery} />
      <ToastContainer />
      <GlobalStyles />
    </AppContainer>
  );
}

export default App;
