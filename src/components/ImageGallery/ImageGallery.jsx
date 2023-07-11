import React, { useState, useEffect } from 'react';

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

function ImageGallery({ searchQuery }) {
  // const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [prevSearchQuery, setPrevSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery !== prevSearchQuery) {
      setPage(1);
      setPrevSearchQuery(searchQuery);
    }
    if (!searchQuery.length) {
      return;
    }
    setIsLoading(true);
    getImages(searchQuery, page)
      .then(response => {
        if (response.status === 200 && response.data.hits !== 0) {
          setImages(prevImages => {
            return page === 1
              ? response.data.hits
              : [...prevImages, ...response.data.hits];
          });
          setTotalPages(Math.floor(response.data.totalHits / 20));
        } else return Promise.reject;
        new Error(`Oops... there are no  images matching your search... `);
      })
      .catch(error => {
        setError(error.response.data);
        toast.error('Oops. Something has gone wrong', notifyOptions);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, prevSearchQuery, searchQuery]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

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
        <ButtonLoadMore onClick={handleLoadMore}>Load more...</ButtonLoadMore>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
export default ImageGallery;
