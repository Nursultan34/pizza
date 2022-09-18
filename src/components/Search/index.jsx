import debounce from 'lodash.debounce';
import React from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';

function Search() {
  const [value,setValue] = React.useState('')
  const {setSearchValue } = React.useContext(SearchContext)
  const inputRef = React.useRef()

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
      <div className={styles.root}>
          
          <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="50" height="50"
viewBox="0 0 50 50"
><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
</svg>
    <input 
    ref={inputRef}
    value={value} 
    className={styles.input} 
    placeholder='Поиск пиццы....' 
    onChange={onChangeInput}/>
    {value && ( <svg onClick={onClickClear} className={styles.iconclose} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="48" height="48"
viewBox="0 0 48 48"
><path d="M 39.486328 6.9785156 A 1.50015 1.50015 0 0 0 38.439453 7.4394531 L 24 21.878906 L 9.5605469 7.4394531 A 1.50015 1.50015 0 0 0 8.484375 6.984375 A 1.50015 1.50015 0 0 0 7.4394531 9.5605469 L 21.878906 24 L 7.4394531 38.439453 A 1.50015 1.50015 0 1 0 9.5605469 40.560547 L 24 26.121094 L 38.439453 40.560547 A 1.50015 1.50015 0 1 0 40.560547 38.439453 L 26.121094 24 L 40.560547 9.5605469 A 1.50015 1.50015 0 0 0 39.486328 6.9785156 z"></path></svg>
)}
    </div>
  )
}

export default Search