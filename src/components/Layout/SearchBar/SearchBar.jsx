import React from 'react';
import styles from "../Homepage/Homepage.module.css";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { useTranslation } from 'react-i18next';

const SearchBar = (props) => {
  const { t } = useTranslation();

  return (
    <form className={styles.topSearch}>
      <div className={styles.one}>
        <div className={styles.iconInput}>
          <SearchIcon />
        </div>
        <input 
          placeholder={t("searchbar.search_placeholder")} 
          aria-label={t("searchbar.search_label")}
          value={props.searchedTermForNearby}
          onChange={(e) => {
            props.setSearchedTermForNearby(e.target.value);
          }}
        />
      </div>

      <div className={styles.two}>
        <div className={styles.iconInput}>
          <FilterAltIcon />
        </div>
        <input 
          placeholder={t("searchbar.filter_placeholder")} 
          aria-label={t("searchbar.filter_label")}
        />
      </div>

      <div className={styles.three}>
        <div className={styles.iconInput}>
          <SortIcon />
        </div>
        <input 
          placeholder={t("searchbar.sort_placeholder")} 
          aria-label={t("searchbar.sort_label")}
        />
      </div>
    </form>
  );
};

export default SearchBar;
