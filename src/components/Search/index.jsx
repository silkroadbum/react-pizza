import { useContext, useRef, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import { AppContext } from '../../App';

import searchIcon from '../../assets/img/search-icon.svg';
import clearIcon from '../../assets/img/clear-icon.svg';

import styles from './Search.module.scss';

const Search = () => {
  const [value, setValue] = useState('');
  const { setSearchValue } = useContext(AppContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((str) => setSearchValue(str), 300),
    [],
  );

  const onChangeInput = (evt) => {
    setValue(evt.target.value);
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
        value={value}
      />
      {value && (
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
