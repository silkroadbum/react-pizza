import { useContext, useRef } from 'react';

import { AppContext } from '../../App';

import searchIcon from '../../assets/img/search-icon.svg';
import clearIcon from '../../assets/img/clear-icon.svg';

import styles from './Search.module.scss';

const Search = () => {
  const { searchValue, setSearchValue } = useContext(AppContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <img src={searchIcon} alt="Иконка поиска." className={styles.icon} />
      <input
        ref={inputRef}
        onChange={(evt) => setSearchValue(evt.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы ..."
        value={searchValue}
      />
      {searchValue && (
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
