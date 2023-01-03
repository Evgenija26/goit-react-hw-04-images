import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import css from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleChange = e => setSearchName(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(searchName);
    // onSubmit(e.target.elements.searchName.value);
    e.target.reset();
  };

  return (
    <header className={css.SearchBar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <input
          className={css.SearchFormInput}
          name="searchName"
          type="text"
          id="search"
          onChange={handleChange}
        />
        <button className={css.SearchFormButton}>
          <BiSearchAlt />
        </button>
      </form>
    </header>
  );
};
