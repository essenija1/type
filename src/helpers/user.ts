import { IPlaces, IUser } from './interfaces.js'
import { renderBlock } from './lib.js'

export function renderUserBlock() {
  const userData = getUserData()
  const favoritesAmount = getFavoritesAmount()

  const favoritesCaption = favoritesAmount ? favoritesAmount : 'ничего нет'
  const hasFavoriteItems = favoritesAmount ? true : false

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${userData.avatarUrl}" alt="Wade Warren" />
      <div class="info">
          <p class="name">${userData.username}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}

export function getUserData(): IUser {   
  const user:unknown = JSON.parse(localStorage.getItem('username'))

  const emptyUser = {
    username: '',
    avatarUrl: '/img/avatar.png'
  }
  
  const result = {
    username: null,
    avatarUrl: null
  }

  if (typeof user !== 'object' || !user) {
    return emptyUser
  } 
  
  Object.hasOwn(user, 'username') && user['username'] ? result.username = user['username'] : result.username = emptyUser.username
  Object.hasOwn(user, 'avatarUrl') && user['avatarUrl'] ? result.avatarUrl = user['avatarUrl'] : result.avatarUrl = emptyUser.avatarUrl

  return result
}

export function getFavoritesAmount(): number { 
  const favoriteItems = getFavorites()

  return favoriteItems.length
}

function getFavorites(): Pick<IPlaces, 'id' | 'image' | 'name'>[] { 
  const favoriteItems: unknown = JSON.parse(localStorage.getItem('favoriteItems'))

  if (!Array.isArray(favoriteItems) || favoriteItems.length === 0) {
    return []
  } 

  return favoriteItems
}

export function toggleFavorites(favPlace: Pick<IPlaces, 'id' | 'image' | 'name'>): void { 
  const favoriteItems = getFavorites()

  const filtredFavorites = favoriteItems.filter((fav: Pick<IPlaces, 'id' | 'image' | 'name'>) => fav.id !== favPlace.id)

  filtredFavorites.length === favoriteItems.length ? 
    localStorage.setItem('favoriteItems', JSON.stringify([...favoriteItems, favPlace])) : 
    localStorage.setItem('favoriteItems', JSON.stringify(filtredFavorites))
}


export function isFavorite(placeId: string): boolean { 
  const favoriteItems = getFavorites()

  return favoriteItems.find((fav: Pick<IPlaces, 'id' | 'image' | 'name'>) => fav.id === placeId) ? true : false
}





export function getFavoritesAmount(key: string): unknown {
  const value: unknown = localStorage.getItem(key);
  const numValue = Number(value);
  if (isNaN(numValue)) {
    return 0;
  } if (typeof (numValue) == 'number') {
    return numValue;
  }
}


export function searchFormData(key: string): Person {
  const value: unknown = JSON.parse(localStorage.getItem(value));
  if (typeof value === 'object') {
    if ('username' in value && 'avatarUrl' in value) {
      return value as Person;
    }
  } else {
    return null
  }
}



export function renderUserBlock(userName: string, avatarLink: string, favoriteItemsAmount?: number) {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
  const hasFavoriteItems = favoriteItemsAmount ? true : false;

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${avatarLink} alt="Wade Warren" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
function UserData(UserData: any): string {
  throw new Error('Function not implemented.')
}




// import { renderBlock } from './lib.js'

// export class Person {
//   username: string
//   avatarUrl: string


//   constructor(username: string, avatarUrl: string) {
//     this.username = username
//     this.avatarUrl = avatarUrl
//   }
// }

// const person1 = new Person('Ann Smith', './img/avatar.png');
// const favourites = 'd333';
// localStorage.setItem('user', JSON.stringify(person1));
// localStorage.setItem('favoritesAmount', favourites.toString());


// export function getFavoritesAmount(key: string): unknown {
//   const resp: unknown = localStorage.getItem(key);
//   const numResp = Number(resp);
//   if (isNaN(numResp)) {
//     return 0;
//   } if (typeof (numResp) == 'number') {
//     return numResp;
//   }
// }

// export function getUserData(key: string): Person {
//   const resp: unknown = JSON.parse(localStorage.getItem(key));
//   if (typeof resp === 'object') {
//     if ('username' in resp && 'avatarUrl' in resp) {
//       return resp as Person;
//     }
//   } else {
//     return null
//   }
// }

// export function renderUserBlock(userName: string, avatarLink: string, favoriteItemsAmount?: number) {
//   const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет'
//   const hasFavoriteItems = favoriteItemsAmount ? true : false;

//   renderBlock(
//     'user-block',
//     `
//     <div class="header-container">
//       <img class="avatar" src=${avatarLink} alt="Wade Warren" />
//       <div class="info">
//           <p class="name">${userName}</p>
//           <p class="fav">
//             <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
//           </p>
//       </div>
//     </div>
//     `
//   )
// }
// function UserData(UserData: any): string {
//   throw new Error('Function not implemented.')
// }
