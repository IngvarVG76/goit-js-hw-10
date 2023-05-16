import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { refs } from './refs';
import { fetchCountries } from './fetchCountries';
import { createCountriesMarkup, createCountryMarkup } from './markupService';
// import { displayCountryList, displayCountryInfo } from './renderService';

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener(
  'input',
  debounce(() => {
    const searchTerm = refs.searchBox.value.trim();
    if (searchTerm.length === 0) {
      refs.countryList.innerHTML = '';
      Notiflix.Notify.warning('Fill valid name');
      return;
    }

    fetchCountries(searchTerm)
      .then(createCountriesMarkup)

      .then(countries => {
        if (countries.length === 1) {
          createCountryMarkup(countries[0]);
          //   return;
        }
        return countries;
      })
      .catch(error => console.error(error));
  }, DEBOUNCE_DELAY)
);
