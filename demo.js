
const dropdownButton = document.getElementById('dropdown-button'),
  dropdownInput = document.getElementById('dropdown-input');
  dropdownItems = document.querySelectorAll('div[class="dropdown-item"]'),
  favCountriesBlock = document.getElementById('fav-countries'),
  dropdownList = document.getElementById('dropdown-list'),
  dropdownArrow = document.getElementById('dropdown-icon');

let favCountriesDefault = [
  document.querySelector('div[data-code="CN"]'),
  document.querySelector('div[data-code="DE"]'),
  document.querySelector('div[data-code="FR"]'),
  document.querySelector('div[data-code="GB"]'),
  document.querySelector('div[data-code="US"]'),
  document.querySelector('div[data-code="RU"]')
],
  favCountries = [];

dropdownInput.oninput = () => dropdownSearch();
dropdownInput.onfocus = () => dropdownOpen();

dropdownButton.onclick = () => dropdownToggle();

dropdownItems.forEach((element) => {
  element.onclick = (e) => countriesSelect(e.target);
})

favCountriesDefault.forEach((val) => favCountriesAdd(val));

function dropdownSearch() {
  let inputValue = dropdownInput.value.toLowerCase();
  dropdownItems.forEach(val => val.classList.remove('none'));
  if (inputValue !== '') {
    favCountriesBlock.classList.add('none');
    let wrongArr = Array.from(dropdownItems).filter((element) => element.innerText.toLowerCase().search(inputValue.toLowerCase()) === -1);
    wrongArr.forEach(val => val.classList.add('none'));
  } else {
    favCountriesBlock.classList.remove('none');
  }
}

function countriesSelect(country) {
  dropdownInput.value = country.innerText;
  dropdownClose();
  favCountriesAdd(country);
  dropdownList.scroll(0, 0)
  dropdownItems.forEach(val => val.classList.remove('none'));
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

function dropdownToggle() { 
  if (dropdownList.classList.contains('dropdown-list--toggled')) {
    dropdownClose();
  } else {
    dropdownOpen();
  }
}

function dropdownOpen() {
  dropdownInput.value = "";
  dropdownInput.focus();
  dropdownList.classList.add('dropdown-list--toggled');
  dropdownArrow.classList.add('dropdown-icon--toggled');
}

function dropdownClose() {
  dropdownList.classList.remove('dropdown-list--toggled');
  dropdownArrow.classList.remove('dropdown-icon--toggled');
}

