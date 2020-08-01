import { cardsArray } from './cards.js'
import shuffle from './shuffle_array.js'

const container = document.querySelector('.container')
const cardElements = document.getElementsByClassName('card')
const startGameButton = document.getElementById('start-game')
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

    let cards = [...cardsArray]
    cards = cards.splice(0, numOfCards)
    container.innerHTML = ''
    shuffle(cards)
    cards.forEach(cardValue => createCardElements(cardValue))
}

function createCardElements(cardValue) {
    const cardElement = document.createElement('div')
    cardElement.setAttribute('class', 'card')
    cardElement.addEventListener('click', () => flipCard(cardValue, cardElement))
    container.append(cardElement)
}

function flipCard(cardValue, cardElement) {
    if (flippedCard1 && flippedCard2) return
    if (cardElement.innerHTML == '') {
        cardElement.innerHTML = cardValue
        if (flippedCard1) {
            flippedCard2 = { cardValue, cardElement }
            setTimeout(() => evaluateCards(), 1500)
        } else {
            flippedCard1 = { cardValue, cardElement }
        }
    } else {
        if (getNumOfFlippedCards() == 1) {
            cardElement.innerHTML = ''
        }
    }
}

function getNumOfFlippedCards() {
    let numOfFlippedCards = 0
    for (const cardElement of cardElements) {
        if (cardElement.innerHTML !== '') {
            numOfFlippedCards++
        }
    }
    return numOfFlippedCards
}

function evaluateCards() {
    if (flippedCard1.cardValue == flippedCard2.cardValue) {
        if (getNumOfFlippedCards() < cards.length) {
            flippedCard1 = null
            flippedCard2 = null
        } else {
            alert('you win')
        }
    } else {
        flippedCard1.cardElement.innerHTML = ''
        flippedCard2.cardElement.innerHTML = ''
        flippedCard1 = null
        flippedCard2 = null
    }
}
