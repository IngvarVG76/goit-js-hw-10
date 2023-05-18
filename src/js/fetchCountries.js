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
