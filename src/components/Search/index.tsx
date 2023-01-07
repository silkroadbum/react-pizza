import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';

import { setInputValue, setSearchValue, selectFilter } from '../../redux/slices/filterSlice';

import searchIcon from '../../assets/img/search-icon.svg';
import clearIcon from '../../assets/img/clear-icon.svg';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const { inputValue } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    dispatch(setInputValue(''));
    inputRef.current?.focus();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = React.useCallback(
    debounce((str: string) => dispatch(setSearchValue(str)), 300),
    [],
  );

  const onChangeInput = (evt: any) => {
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
