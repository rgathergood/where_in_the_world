let countries = [];

document.addEventListener('DOMContentLoaded', () => {
  const url ='https://restcountries.eu/rest/v2/all';
  makeRequest(url, requestComplete);

  const option = document.querySelector('#country-list');
  option.addEventListener('change', handleCountrySelection);

});

const makeRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback);
}
const requestComplete = function () {
  if (this.status !== 200) return;
  const jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  populateList(countries);
}
const populateList = function (countries) {
  const select = document.querySelector('#country-list');
  countries.forEach((country, index) => {
    const option = document.createElement('option');
    option.textContent = country.name;
    const value = index;
    option.value = value;
    select.appendChild(option);
  });
}

const handleCountrySelection = function(event){
  const country = countries[this.value]
  displayCountryInformation(country);
}

const displayCountryInformation = function(country){
  const countryInformation = document.querySelector('#country-info')
  countryInformation.innerHTML = ''

  const nameH1 = document.createElement('h1');
  const populationH3 = document.createElement('h3');
  const capitalH3 = document.createElement('h3');
  const borderCountriesH3 = document.createElement('h3');
  const flagImg = document.createElement('img');
  const map = document.createElement('div');

  nameH1.textContent = country.name;
  populationH3.textContent = `Population: ${country.population.toLocaleString()}`;
  capitalH3.textContent = `Capital: ${country.capital}`;
  borderCountriesH3.textContent = `Bordering Countries: ${country.borders}`;
  flagImg.src = country.flag;
  map.id = 'main-map'

  const coords = {lat: country.latlng[0], lng:country.latlng[1]};
  const mainMap = new MapWrapper(map, coords, 5);
  const infoWindow = `<p>Welcome to <h3>${country.name}!</h3></p>` +
  `<p>In the region of ${country.region}</p>` +
  `<p>In the subregion of ${country.subregion}</p>`;
  mainMap.addMarker(coords, infoWindow);

  countryInformation.appendChild(nameH1);
  countryInformation.appendChild(populationH3);
  countryInformation.appendChild(capitalH3);
  countryInformation.appendChild(borderCountriesH3);
  countryInformation.appendChild(flagImg);
  countryInformation.appendChild(map);
}
