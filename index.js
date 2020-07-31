import { cards } from './cards.js'
import shuffle from './shuffle_array.js'

// have player choose how many cards to play
// bonus: set timer
// add new game option
// add cardflip animation

const container = document.querySelector('.container')
const cardElements = document.getElementsByClassName('card')

let flippedCard1
let flippedCard2

shuffle(cards)

cards.map(cardValue => createCardElements(cardValue))

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
