import Notiflix from "notiflix";

// import { refs } from './refs';
const BASE_URL = 'https://restcountries.com/v3.1';

export function fetchCountries(name) {
 return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      throw new Error('Country not found');
    }
    return response.json();
  }).then(data => {
    if (data.length > 9) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
        throw new Error('Too many matches found');
    }
    return data;
  });
}
