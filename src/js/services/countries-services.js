const baseUrl = 'https://restcountries.eu/rest/v2/';

export default {
  query: '',

  fetchCountries() {
    const queryParams = `name/${this.query}`;
    return fetch(baseUrl + queryParams)
      .then(response => response.json())
      .then(parsedResponse => {
        console.log(parsedResponse);
        return parsedResponse;
      });
  },

  set searchQuery(value) {
    this.query = value;
  },
  get searchQuery() {
    return this.query;
  },
};
