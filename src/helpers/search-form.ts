import { renderBlock } from './lib.js';
import { todayDMY, defaultDateOff, defaultDateIn, lastDayNextMonth } from './dates.js'
import { searchHandler } from './helpers/search-handler.js'
import { baseUrl } from './API/index.js'
import { renderSearchResultsBlock } from './search-results.js';


// interface FormObject {
//   city?: string
//   checkInDate?: string
//   checkOutDate?: string
//   maxPrice?: number
// }
// interface Place {
//   place: string
// }

// export function searchFormData(id: string) {
//   const form = document.querySelector('#form');
//   const inputElement: HTMLInputElement = form.querySelector(id)
//   if (inputElement != null) {
//     return inputElement.value
//   }
// }
// export let dataFromForm: FormObject = {};
// export function transferData() {
//   const form: HTMLFormElement = document.querySelector('#form');
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     dataFromForm = {
//       city: searchFormData('#city'),
//       checkInDate: searchFormData('#check-in-date'),
//       checkOutDate: searchFormData('#check-out-date'),
//       maxPrice: parseInt(searchFormData('#max-price'))
//     };
//     form.reset();
//     search(dataFromForm, callbackForSearch);
//   })
// }

// // export function search(object: FormObject): void {
// //   console.log(object)
// // }
// function callbackForSearch(res: string | Array<Place>) {
//   console.log(res);
// }

// export function search(object: FormObject, callback: (res: string | Array<Place>) => void): void {
//   console.log(object);
//   const arr = [{} as Place, {} as Place];
//   setTimeout(() => {
//     callback(Math.random() < 0.5 ? 'Error' : arr)
//   }, 1000);
// }


// export function renderSearchFormBlock(dateCheckIn: string, dateCheckout: string) {
//   const TWO_DAYS = 2;
//   const ONE_MONTH = 1;
//   const TWO_MONTHS = 2;


//   const today: Date = new Date;
//   // минимально возможная дата заселения и выселения
//   const min = `${today.getFullYear()}-${('0' + (today.getMonth() + ONE_MONTH)).slice(-2)}-${today.getDate()}`;

//   // максимально возможная дата заселения выселения
//   function findMax(objDate: Date): string {
//     const lastDayOfNextMonth: Date = new Date(objDate.getFullYear(), objDate.getMonth() + TWO_MONTHS, 0);
//     return `${lastDayOfNextMonth.getFullYear()}-${('0' + (lastDayOfNextMonth.getMonth() + ONE_MONTH)).slice(-2)}-${lastDayOfNextMonth.getDate()}`;
//   }

//   //переведенная в нужный формат дата заезда по умолчанию

//   const defaultDCI: Date = new Date(today.setDate(today.getDate() + 1));
//   const transformedDefaultDCI = `${defaultDCI.getFullYear()}-${('0' + (defaultDCI.getMonth() + ONE_MONTH)).slice(-2)}-${defaultDCI.getDate()}`

//   //функция возвращает выезд по умолчанию для даты заезда по умолчанию и для введенной даты заезда
//   function defaultCheckout(objDate: Date): string {
//     const defaultDCO: Date = new Date(objDate.setDate(objDate.getDate() + TWO_DAYS));
//     return `${defaultDCO.getFullYear()}-${('0' + (defaultDCO.getMonth() + ONE_MONTH)).slice(-2)}-${('0' + defaultDCO.getDate()).slice(-2)}`;
//   }
//   let checkIn: string;
//   let checkOut: string;
//   let maxCheckOut: string;
//   let maxDefault: string;
//   let minCheckout: string;

//   if (dateCheckIn === '') {

//     checkIn = transformedDefaultDCI;
//     checkOut = (dateCheckout === '') ? defaultCheckout(defaultDCI) : dateCheckout;
//     maxDefault = findMax(defaultDCI);
//     maxCheckOut = findMax(defaultDCI);
//     minCheckout = transformedDefaultDCI
//   } else {
//     const dciInToObj = new Date(dateCheckIn);
//     console.log(dciInToObj);
//     const dci = `${dciInToObj.getFullYear()}-${('0' + (dciInToObj.getMonth() + ONE_MONTH)).slice(-2)}-${('0' + dciInToObj.getDate()).slice(-2)}`
//     checkIn = dci;
//     checkOut = (dateCheckout === '') ? defaultCheckout(dciInToObj) : dateCheckout;
//     maxDefault = findMax(dciInToObj)
//     minCheckout = dci;
//     maxCheckOut = findMax(dciInToObj);
//   }



  renderBlock(
    'search-form-block',
    `
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
            `
  )
   const btnSearch = document.getElementById("btn-search")
   btnSearch.addEventListener<"click">("click", (event: MouseEvent) => {
    event.preventDefault()
    searchHandler()
    fetchPlaces()
   })

   function fetchPlace() {
    const coordinates = '59.9386,30.3141'
    const checkInDate = new Date(checkIn).getTime() || new Date(dafaultDateIn).getTime()
    const checkOutDate = new Date(checkOut).getTime() || new Date(dafaultDateOff).getTime()

    fetch(baseUrl + `/places?coordinates=${coordinates}&checkInDate=${checkInDate}&chackoutDate=${checkOutDate}&maxPrice=5000`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      //console.log(data)
      renderSearchResultsBlock(data)
    })
   }
}
