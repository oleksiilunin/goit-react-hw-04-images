import React, { Component } from 'react';

import PropTypes from 'prop-types';

import ButtonLoadMore from 'components/ButtonLoadMore/ButtonLoadMore';
import ErrorCard from 'components/ErrorCard/ErrorCard';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import NoResultCard from 'components/NoResultCard/NoResultCard';

import notifyOptions from 'helpers/toastNotifyOptions';
import { toast } from 'react-toastify';
import { getImages } from 'services/api';
import { ImageGalleryList } from './ImageGallery.styled';

class ImageGallery extends Component {
  state = {
    searchQuery: '',
    images: null,
    error: '',
    isLoading: false,
    page: 1,
    totalPages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchQuery !== this.props.searchQuery ||
      prevState.page !== this.state.page
    ) {
      if (prevProps.searchQuery !== this.props.searchQuery) {
        this.setState({ page: 1 });
      }
      if (this.props.searchQuery.length === 0) {
        return;
      }
      this.setState({ isLoading: true });
      getImages(this.props.searchQuery, this.state.page)
        .then(response => {
          if (response.status === 200 && response.data.hits !== 0) {
            this.setState(prevState => ({
              images:
                this.state.page === 1
                  ? response.data.hits
                  : [...prevState.images, ...response.data.hits],

              totalPages: Math.floor(response.data.totalHits / 20),
            }));
          } else return Promise.reject;
          new Error(`Oops... there are no  images matching your search... `);
        })
        .catch(error => {
          console.log(error.response.data);
          this.setState({ error: error.response.data });
          toast.error('Oops. Something has gone wrong', notifyOptions);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    console.log(this.state.page);
  };

  render() {
    const { images, isLoading, error, totalPages, page, searchQuery } =
      this.state;
    return (
      <>
        {isLoading && error && <ErrorCard>{error}</ErrorCard>}
        {searchQuery.length === 0 &&
          !isLoading &&
          images &&
          images.length === 0 && (
            <NoResultCard>Oops! There are no images found...</NoResultCard>
          )}
        <ImageGalleryList>
          {images &&
            images.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  id={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  tags={tags}
                />
              );
            })}
        </ImageGalleryList>
        {isLoading && <Loader />}
        {page < totalPages && !isLoading && (
          <ButtonLoadMore onClick={this.handleLoadMore}>
            Load more...
          </ButtonLoadMore>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
export default ImageGallery;
