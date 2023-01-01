import searchIcon from '../../assets/img/search-icon.svg';
import clearIcon from '../../assets/img/clear-icon.svg';

import styles from './Search.module.scss';

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles.root}>
      <img src={searchIcon} alt="Иконка поиска." className={styles.icon} />
      <input
        onChange={(evt) => setSearchValue(evt.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы ..."
        value={searchValue}
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue('')}
          src={clearIcon}
          alt="Крестик для очистки поля поиска."
          className={styles.button}
        />
      )}
    </div>
  );
};

export default Search;
