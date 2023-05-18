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
