// const element = document.createElement('div')
// element.id = 'myDiv'
// element.innerHTML = 'Hello World!'
// document.body.appendChild(element)
const api = require('./api')
const getFormFields = require('../../lib/get-form-fields')
const ui = require('./ui')
const gamelogic = require('./gamelogic')
const config = require('./config')
const store = require('./store')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onNewGame = (event) => {
  event.preventDefault()
  api.newGame()
    .then(ui.newGameSuccess)
    .catch(ui.newGameFailure)
}

const onBoardClick = (event) => {
  event.preventDefault()
  if (!store.game || store.game.over) {
    $('#jumboTron').text('Start a new game!')
    return
  }

  const index = event.target.id
  const currentPlayer = gamelogic.changePlayer()

  let gameEnd = false
  if (gamelogic.checkWin()) {
    gameEnd = true
    store.game.over = true
    $('#jumboTron').text(`Player ${gamelogic.checkWin()} is the winner!`)
  } else if (gamelogic.tie()) {
    gameEnd = true
    $('#jumboTron').text('Its a tie!')
  }
  api.boardClick()
    .then(ui.boardClickSuccess)
    .catch(ui.boardClickFailure)
}

const onGameHistory = (event) => {
  event.preventDefault()
  // const data = getFormFields(event.target)
  console.log('events game-history working')
  api.gameHistory()
    .then(ui.gameHistorySuccess)
    .catch(ui.gameHistoryFailure)
}

const onGameStatus = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('events game-status is working')
  api.gameStatus(data)
    .then(ui.gameStatusSuccess)
    .catch(ui.gameStatusFailure)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('#new-game').on('submit', onNewGame)
  $('#game-history').on('submit', onGameHistory)
  $('#game-status').on('submit', onGameStatus)
  $('td').on('click', onBoardClick)
}

module.exports = {
  addHandlers
}
