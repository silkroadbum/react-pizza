import { useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';

import { setInputValue, setSearchValue } from '../../redux/slices/filterSlice';

import searchIcon from '../../assets/img/search-icon.svg';
import clearIcon from '../../assets/img/clear-icon.svg';

import styles from './Search.module.scss';

const Search = () => {
  const inputValue = useSelector((state) => state.filter.inputValue);
  const dispatch = useDispatch();

  const inputRef = useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    dispatch(setInputValue(''));
    inputRef.current.focus();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((str) => dispatch(setSearchValue(str)), 300),
    [],
  );

  const onChangeInput = (evt) => {
    dispatch(setInputValue(evt.target.value));
    updateSearchValue(evt.target.value);
  };

  return (
    <div className={styles.root}>
      <img src={searchIcon} alt="Иконка поиска." className={styles.icon} />
      <input
        ref={inputRef}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы ..."
        value={inputValue}
      />
      {inputValue && (
        <img
          onClick={onClickClear}
          src={clearIcon}
          alt="Крестик для очистки поля поиска."
          className={styles.button}
        />
      )}
    </div>
  );
};

export default Search;
