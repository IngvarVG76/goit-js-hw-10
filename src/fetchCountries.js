import { refs } from './refs';
const BASE_URL = 'https://restcountries.com/v3.1';

export function fetchCountries(name) {
  console.log('https://restcountries.com/v3.1/name/${name}');
  return fetch('https://restcountries.com/v3.1/name/${name}').then(
    response => response.json()
  );
}

fetch('https://restcountries.com/v2/name/ukr').then((response) => response.json().then(console.log));