import { cardsArray } from './cards.js'
import shuffle from './shuffle_array.js'

const container = document.querySelector('.container')
const cardElements = document.getElementsByClassName('card')
const startGameButton = document.getElementById('start-game-btn')
const resetGameButton = document.getElementById('reset-game-btn')
let cards = [...cardsArray]
let flippedCard1
let flippedCard2

startGameButton.addEventListener('click', startGame)
resetGameButton.addEventListener('click', resetGame)

startGame()

function startGame() {
    const options = document.querySelectorAll('option')
    let numOfCards

    for (const option of options) {
        if (option.selected) {
            numOfCards = option.value
        }
    }

    const currentCards = cards.slice(0, numOfCards)
    container.setAttribute('id', `cards-${numOfCards}`)
    container.innerHTML = ''
    shuffle(currentCards)
    currentCards.forEach(cardValue => createCardElements(cardValue))
}

function createCardElements(cardValue) {
    const scene = document.createElement('div')
    scene.setAttribute('class', 'scene')

    const cardElement = document.createElement('div')
    cardElement.setAttribute('class', 'card')
    cardElement.innerHTML = `
        <div class="card-face card-front"></div>
        <div class="card-face card-back">${cardValue}</div>
    `
    cardElement.addEventListener('click', () => flipCard(cardValue, cardElement))
    scene.append(cardElement)
    container.append(scene)
}

function flipCard(cardValue, cardElement) {
    if ([...cardElement.classList].includes('is-flipped')) {
        return
    } else {
        cardElement.classList.add('is-flipped')
        if (flippedCard1) {
            flippedCard2 = { cardValue, cardElement }
            setTimeout(() => evaluateCards(), 850)
        } else {
            flippedCard1 = { cardValue, cardElement }
        }
    }
}

function getNumOfFlippedCards() {
    return [...document.getElementsByClassName('is-flipped')].length
}

function evaluateCards() {
    if (flippedCard1.cardValue == flippedCard2.cardValue) {
        if (getNumOfFlippedCards() < [...cardElements].length) {
            flippedCard1 = null
            flippedCard2 = null
        } else {
            let confirmNewGame = confirm('You win! New game?')
            if (confirmNewGame) {
                resetGame()
                startGame()
            } else {
                resetGame()
            }
        }
    } else {
        flippedCard1.cardElement.classList.remove('is-flipped')
        flippedCard2.cardElement.classList.remove('is-flipped')
        flippedCard1 = null
        flippedCard2 = null
    }
}

function resetGame() {
    flippedCard1 = null
    flippedCard2 = null

    for (const card of cardElements) {
        card.classList.remove('is-flipped')
    }
}
