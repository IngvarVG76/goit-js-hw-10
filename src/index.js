import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { refs } from './js/refs';
import { fetchCountries } from './js/fetchCountries';
import {
  createCountriesMarkup,
  createCountryMarkup,
  cleanMarkup,
} from './js/markupService';
import { errorType, errorHandler } from './js/errorService';

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener(
  'input',
  debounce(countyInputHandler, DEBOUNCE_DELAY)
);

function countyInputHandler() {
  const searchTerm = refs.searchBox.value.trim();
  if (searchTerm.length === 0) {
    cleanMarkup();
    Notiflix.Notify.warning(errorType.emptyField);
    return;
  }

  fetchCountries(searchTerm)
    .then(createCountriesMarkup)
    .then(countries => {
      if (countries.length > 10) {
        cleanMarkup();
        Notiflix.Notify.info(errorType.toMany);
      }
      return countries;
    })
    .then(countries => {
      if (countries.length === 1) {
        cleanMarkup();
        createCountryMarkup(countries[0]);
      }
      return countries;
    })
    .catch(error => {
      cleanMarkup();
      errorHandler(error); // помилка 404 перевіряється та обробляеться errorHandler в errorService.js
      console.log(error);
    });
}
