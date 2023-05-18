// refs.js

export const refs = {
  searchBox: document.getElementById('search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

// index.js

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
  debounce(() => {
    const searchTerm = refs.searchBox.value.trim();
    if (searchTerm.length === 0) {
      cleanMarkup();
      Notiflix.Notify.warning(errorType.emptyField);
      return;
    }

    fetchCountries(searchTerm)
      .then(countries => {
        if (countries.length > 10) {
          cleanMarkup();
          throw new Error(errorType.toMany);
        }
        return countries;
      })
      .then(createCountriesMarkup)
      .then(countries => {
        if (countries.length === 1) {
          cleanMarkup();
          createCountryMarkup(countries[0]);
        }
        return countries;
      })
      .catch(error => {
        cleanMarkup();
        errorHandler(error);
        console.error(error);
      });
  }, DEBOUNCE_DELAY)
);

// fetchCountries.js

import Notiflix from 'notiflix';
import { errorType } from './errorService';

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(errorType.notFound);
    }
    return response.json();
  });
}

// markupService.js

import { refs } from '../js/refs';

export function cleanMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

export function createCountriesMarkup(countries) {
  const markup = countries.reduce((markup, { name, flags }) => {
    return (
      markup +
      `<li class="country-item"><img src="${flags.svg}" alt="${name}"><p>${name}</p></li>`
    );
  }, '');
  cleanMarkup();
  refs.countryList.innerHTML = markup;
  return countries;
}

export function createCountryMarkup({
  flags,
  name,
  capital,
  population,
  languages,
}) {
  const languageNames = languages.map(language => language.name);
  const languagesString = languageNames.join(', ');

  const html = `
    <div class="country-card" style="font-size: 20px;">
                <h2 style="display: flex; align-items: center; gap: 20px;"><img src="${flags.svg}" alt="${name} flag" style="width: 10%; height: 10%"><b>${name}</b></h2>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${languagesString}</p>
    </div>
    `;

  cleanMarkup();
  refs.countryInfo.innerHTML = html;
}

// errorService.js

import Notiflix from 'notiflix';

export const errorType = {
  toMany: 'Too many matches found. Please enter a more specific name',
  notFound: 'Oops, there is no country with that name',
  emptyField: 'Fill valid name',
};

export function errorHandler(error) {
  if (error.message === errorType.notFound) {
    Notiflix.Notify.failure(errorType.notFound);
  } else if (error.message === errorType.toMany) {
    Notiflix.Notify.info(errorType.toMany);
  }
}
