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
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchName === '') return; 
    
    async function fetchImages() {
      try {
        setLoading(true);
        setError('');

        const newImages = await getImages(searchName, page);

        if (!newImages.length) {
          return toast.error('No images found. Please enter another keyword');
        }

        setImages(prevImages => [...prevImages, ...newImages]);
      } catch (error) {
        setError(HTTP_ERROR_MSG);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [searchName, page]);

  const handleFormSubmit = searchNewName => {
    setsearchName(searchNewName);
    setPage(1);
    setImages([]);
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
      {images.length >= 12 && !loading && (
        <>
          <Button onClick={handleLoadMore} />
        </>
      )}
      <Toaster position="top-center" reverseOrder={true} />
      <GlobalStyle />
    </Loyout>
  );
};
