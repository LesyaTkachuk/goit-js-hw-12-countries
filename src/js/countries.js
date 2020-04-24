import countriesServices from './services/countries-services';
import countriesListTemplate from '../templates/countries-list.hbs';
import countryTemplate from '../templates/one-country.hbs';
import notifMethods from './pnotif';

const debounce = require('lodash.debounce');

const refs = {
  searchInput: document.querySelector('#js-search-input'),
  searchOutput: document.querySelector('#js-container'),
};

refs.searchInput.addEventListener('input', debounce(searchInputHandler, 1000));

function searchInputHandler(e) {
  countriesServices.searchQuery = e.target.value;
  countriesServices
    .fetchCountries()
    .then(data => {
      if (data.length > 1 && data.length <= 10) {
        renderCountriesList(data);
        return;
      }
      if (data.length === 1) {
        renderOneCountry(data);
        return;
      }
      if (data.length > 10) {
        clearSearchOutput();
        notifMethods.showNotifToMany();
        return;
      }
      if (data.message === 'Not Found') {
        clearSearchOutput();
        notifMethods.showNotifNoFound();
        return;
      }
    })
    .catch(error => {
      console.warn(error);
      clearSearchOutput();
    });
}

function renderCountriesList(countriesArray) {
  clearSearchOutput();
  const markup = `<ul class="search-output">${countriesListTemplate(
    countriesArray,
  )}</ul>`;
  refs.searchOutput.insertAdjacentHTML('beforeend', markup);
}

function renderOneCountry(countryData) {
  clearSearchOutput();
  const markup = countryTemplate(countryData);
  refs.searchOutput.insertAdjacentHTML('beforeend', markup);
}

function clearSearchOutput() {
  refs.searchOutput.innerHTML = '';
}
