import { cardsArray } from './cards.js'
import shuffle from './shuffle_array.js'

const container = document.querySelector('.container')
const cardElements = document.getElementsByClassName('card')
const startGameButton = document.querySelector('button')
let cards = [...cardsArray]
let flippedCard1
let flippedCard2

startGameButton.addEventListener('click', startGame)

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
    if (flippedCard1 && flippedCard2) return
    if (!cardElement.hasAttribute('is-flipped')) {
        cardElement.classList.add('is-flipped')
        if (flippedCard1) {
            flippedCard2 = { cardValue, cardElement }
            setTimeout(() => evaluateCards(), 1000)
        } else {
            flippedCard1 = { cardValue, cardElement }
        }
    } else {
        if (getNumOfFlippedCards() == 1) {
            cardElement.classList.remove('is-flipped')
        }
    }
}

function getNumOfFlippedCards() {
    return [...document.querySelectorAll('.is-flipped')].length
}

function evaluateCards() {
    if (flippedCard1.cardValue == flippedCard2.cardValue) {
        if (getNumOfFlippedCards() < [...cardElements].length) {
            flippedCard1 = null
            flippedCard2 = null
        } else {
            let confirmNewGame = confirm('you win! New Game?')
            if (confirmNewGame) {
                flippedCard1 = null
                flippedCard2 = null
                startGame()
            }
        }
    } else {
        flippedCard1.cardElement.classList.remove('is-flipped')
        flippedCard2.cardElement.classList.remove('is-flipped')
        flippedCard1 = null
        flippedCard2 = null
    }
}
