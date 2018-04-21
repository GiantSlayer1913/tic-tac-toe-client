const config = require('./config')
const store = require('./store')
const ui = require('./ui')

// Message timeout function
// const onSetTimeout = (event) => {
//   event.preventDefault()
//   document.getElementById('#message').innerHTML = ''
// }

// Sign-up
const signUp = function (data) {
  console.log('api.sign-up is working')
  return $.ajax({
    url: config.apiUrl + `/sign-up`,
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data
  })
}

// Sign-in
const signIn = function (data) {
  console.log('api.sign-in is working')
  return $.ajax({
    url: config.apiUrl + `/sign-in`,
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data
  })
}

// Change Password
const changePassword = function (data) {
  console.log('api.change-Password is working')
  return $.ajax({
    url: config.apiUrl + `/change-password/` + store.user.id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

// Sign-out
const signOut = function () {
  console.log('api.sign-out is working')
  return $.ajax({
    url: config.apiUrl + `/sign-out/:id` + store.user.id,
    method: 'DELETE',
    headers: {
      contentType: 'application/json'
    }
  })
}

// Game Controls -->
// New Game
const newGame = (data) => {
  $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: `Token token=${store.user.token}`
    }
  })
    .then(function (data) {
      console.log('after create, data is', data)
      store.game = data.game
    })
}
// Game history
const gameHistory = (data) => {
  console.log('api.game-history is working')
  return $.ajax({
    url: config.apiUrl + `/games`,
    method: 'GET',
    contentType: 'application/json',
    Authorization: `Token token=` + store.data
  })
}

const leaderBoard = (data) => {
  console.log('api.game-status is working')
  return $.ajax({
    url: config.apiUrl + `/games/`,
    method: 'POST',
    contentType: 'application/json',
    Authorization: `Token token=` + store.data,
    data
  })
}

// Gameboard api

const boardClick = (data) => {
  console.log('api.boardClick is clicking')
  return $.ajax({
    url: config.apiUrl + `/games/:id` + store.game.id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: `Token token= + ${store.user.token}`
    },
    data
  })
}
module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut,
  gameHistory,
  newGame,
  leaderBoard,
  boardClick
}

// const data = {
//   'game': {
//     'cell': {
//       'index': 0, // position on board
//       'value': 'x' // current user's turn
//     },
//     'over': false // if game is over or not
//   }
// }
