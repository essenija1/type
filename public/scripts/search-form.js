import { renderBlock } from './lib.js';
export function searchFormData(id) {
    const form = document.querySelector('#form');
    const inputElement = form.querySelector(id);
    if (inputElement != null) {
        return inputElement.value;
    }
}
export let dataFromForm = {};
export function transferData() {
    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        dataFromForm = {
            city: searchFormData('#city'),
            checkInDate: searchFormData('#check-in-date'),
            checkOutDate: searchFormData('#check-out-date'),
            maxPrice: parseInt(searchFormData('#max-price'))
        };
        form.reset();
        search(dataFromForm, callbackForSearch);
    });
}

function callbackForSearch(res) {
    console.log(res);
}
export function search(object, callback) {
    console.log(object);
    const arr = [{}, {}];
    setTimeout(() => {
        callback(Math.random() < 0.5 ? 'Error' : arr);
    }, 1000);
}
export function renderSearchFormBlock(dateCheckIn, dateCheckout) {
    const TWO_DAYS = 2;
    const ONE_MONTH = 1;
    const TWO_MONTHS = 2;
    const today = new Date;
    const min = `${today.getFullYear()}-${('0' + (today.getMonth() + ONE_MONTH)).slice(-2)}-${today.getDate()}`;
    function findMax(objDate) {
        const lastDayOfNextMonth = new Date(objDate.getFullYear(), objDate.getMonth() + TWO_MONTHS, 0);
        return `${lastDayOfNextMonth.getFullYear()}-${('0' + (lastDayOfNextMonth.getMonth() + ONE_MONTH)).slice(-2)}-${lastDayOfNextMonth.getDate()}`;
    }
    const defaultDCI = new Date(today.setDate(today.getDate() + 1));
    const transformedDefaultDCI = `${defaultDCI.getFullYear()}-${('0' + (defaultDCI.getMonth() + ONE_MONTH)).slice(-2)}-${defaultDCI.getDate()}`;
    function defaultCheckout(objDate) {
        const defaultDCO = new Date(objDate.setDate(objDate.getDate() + TWO_DAYS));
        return `${defaultDCO.getFullYear()}-${('0' + (defaultDCO.getMonth() + ONE_MONTH)).slice(-2)}-${('0' + defaultDCO.getDate()).slice(-2)}`;
    }
    let checkIn;
    let checkOut;
    let maxCheckOut;
    let maxDefault;
    let minCheckout;
    if (dateCheckIn === '') {
        checkIn = transformedDefaultDCI;
        checkOut = (dateCheckout === '') ? defaultCheckout(defaultDCI) : dateCheckout;
        maxDefault = findMax(defaultDCI);
        maxCheckOut = findMax(defaultDCI);
        minCheckout = transformedDefaultDCI;
    }
    else {
        const dciInToObj = new Date(dateCheckIn);
        console.log(dciInToObj);
        const dci = `${dciInToObj.getFullYear()}-${('0' + (dciInToObj.getMonth() + ONE_MONTH)).slice(-2)}-${('0' + dciInToObj.getDate()).slice(-2)}`;
        checkIn = dci;
        checkOut = (dateCheckout === '') ? defaultCheckout(dciInToObj) : dateCheckout;
        maxDefault = findMax(dciInToObj);
        minCheckout = dci;
        maxCheckOut = findMax(dciInToObj);
    }
    renderBlock('search-form-block', `
    <form id="form">
      <fieldset class="search-filedset">
      <form>
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text"  value="" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${checkIn}" 
            min="${min}" max="${maxDefault}" name="checkin" />
  </div>
  <div>
  <label for="check-out-date"> Дата выезда </label>
    <input id="check-out-date" type ="date" value="${checkOut}" min="${minCheckout}" max="${maxCheckOut}" name="checkout"/>
      </div>
      <div>
      <label for="max-price"> Макс.цена суток </label>
        <input id="max-price" type="text" value="" name="price" class="max-price"/>
          </div>
          <div>
          <div><button type="submit">Найти </button></div>
          </div>
          </div>
          </form>
          </fieldset>
          </form>
            `);
}
