// DOM elements used here
const countryPickerButton = document.getElementById('country_picker-button'),
  countryPickerInput = document.getElementById('country_picker-input');
  countryPickerItems = document.querySelectorAll('div[class="country_picker-item"]'),
  favCountriesBlock = document.getElementById('fav-countries'),
  countryPickerList = document.getElementById('country_picker-list'),
  countryPickerArrow = document.getElementById('country_picker-icon');

let favCountriesDefault = [ //default settled countries
  document.querySelector('div[data-code="CN"]'),
  document.querySelector('div[data-code="DE"]'),
  document.querySelector('div[data-code="FR"]'),
  document.querySelector('div[data-code="GB"]'),
  document.querySelector('div[data-code="US"]'),
  document.querySelector('div[data-code="RU"]')
],
  favCountries = []; // Array-cache with recently clicked countries

// Search
countryPickerInput.oninput = () => countryPickerSearch();

// Menu opened when user want to write something in input
countryPickerInput.onfocus = () => countryPickerOpen();

// Menu toggle by button click
countryPickerButton.onclick = () => countryPickerToggle();

// Country selecting event
countryPickerItems.forEach((element) => {
  element.onclick = (e) => countriesSelect(e.target);
})

// Filling favCountyes cache by countries settled by default
favCountriesDefault.forEach((val) => favCountriesAdd(val));

// Menu closing when user clicked outside it
document.onclick = (e) => {
  const targetClass = e.target.className;
  if (targetClass.slice(0, 14) !== 'country_picker') countryPickerClose();
}

function countryPickerSearch() {
  let inputValue = countryPickerInput.value.toLowerCase();
  countryPickerItems.forEach(val => val.classList.remove('none'));
  if (inputValue !== '') {
    favCountriesBlock.classList.add('none');
    let wrongArr = Array.from(countryPickerItems).filter((element) => element.innerText.toLowerCase().search(inputValue.toLowerCase()) === -1);
    wrongArr.forEach(val => val.classList.add('none'));
  } else {
    favCountriesBlock.classList.remove('none');
  }
}

function countriesSelect(country) {
  countryPickerInput.value = country.innerText;
  countryPickerClose();
  favCountriesAdd(country);
  countryPickerList.scroll(0, 0)
  countryPickerItems.forEach(val => val.classList.remove('none'));
}

function favCountriesAdd(country) {
  let i = favCountriesIndexOf(country),
    newCountry = country.cloneNode(true);

  newCountry.onclick = (e) => countriesSelect(e.target);
  if (i > -1) favCountries.splice(i, 1);
  favCountries.unshift(newCountry);
  if (favCountries.length > 6) favCountries.pop();
  favCountriesRender();
}

function favCountriesIndexOf(item) {
  const countryArr = favCountries.map((val) => val.dataset.code);
  return countryArr.indexOf(item.dataset.code);
}

function favCountriesRender() {
  favCountriesBlock.textContent = '';
  favCountries.forEach((element) => {
    favCountriesBlock.append(element);
  })
}

function countryPickerToggle() { 
  if (countryPickerList.classList.contains('country_picker-list--toggled')) {
    countryPickerClose();
  } else {
    countryPickerOpen();
  }
}

function countryPickerOpen() {
  countryPickerInput.value = "";
  countryPickerInput.focus();
  countryPickerList.classList.add('country_picker-list--toggled');
  countryPickerArrow.classList.add('country_picker-icon--toggled');
}

function countryPickerClose() {
  countryPickerList.classList.remove('country_picker-list--toggled');
  countryPickerArrow.classList.remove('country_picker-icon--toggled');
}

