import PropTypes from 'prop-types';
import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import {
  ButtonSubmit,
  Input,
  SearchForm,
  SearchbarHeader,
} from './Searchbar.styled';

export const Searchbar = ({onSubmit}) => {
const [searchName, setSearchName] = useState('');

const handleSearchNameChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

const handleSubmit = event => {
    event.preventDefault();

    if (searchName.trim() === '') {
      return toast.error('Please, enter search name!');
    }

    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <SearchbarHeader className="searchbar">
      <SearchForm onSubmit={handleSubmit} className="form">
        <ButtonSubmit type="submit" className="button">
          <HiOutlineSearch />
        </ButtonSubmit>

        <Input
          className="input"
          type="text"
          name="searchName"
          value={searchName}
          onChange={handleSearchNameChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
