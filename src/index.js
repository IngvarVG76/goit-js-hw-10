import './css/styles.css';
import debounce from 'lodash.debounce';
import { refs } from './refs';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener(
  'input',
  debounce(() => {
    const searchTerm = refs.searchBox.value.trim();
    console.log(searchTerm);
    fetchCountries(searchTerm)
      .then((countries) => {
        console.log(countries);
      })
      .catch(error => console.error(error));
  }, DEBOUNCE_DELAY)
);
