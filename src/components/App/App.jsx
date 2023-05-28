import React, { useState, useEffect } from 'react';
import { Loyout } from './App.styled';
import { GlobalStyle } from '../GlobalStyles';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { getImages } from 'services/api';
import { HTTP_ERROR_MSG } from 'services/constants';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export const App = () => {
  const [searchName, setsearchName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showBegin, setShowBegin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    if (!searchName) return;
    
    async function fetchImages() {
      setLoading(true);

      try {
        const { totalHits, hits } = await getImages(searchName, page, {
          signal: controller.signal,
        });

        if (!hits.length) {
          setShowBegin(false);
          return toast.error('No images found. Please enter another keyword');
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setShowBegin(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(HTTP_ERROR_MSG);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();

    return () => {
      controller.abort();
    };
  }, [searchName, page]);

  const handleFormSubmit = searchNewName => {
    setsearchName(searchNewName);
    setPage(1);
    setImages([]);
    setError('');
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Loyout>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <div>{error}</div>}
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {showBegin && <Button onClick={handleLoadMore} />}
      <Toaster position="top-center" reverseOrder={true} />
      <GlobalStyle />
    </Loyout>
  );
};
