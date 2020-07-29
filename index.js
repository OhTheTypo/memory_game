import { cards } from './cards.js'

// todo: make up to 16 cards
// have player choose how many cards to play
// bonus: set timer
// shuffle cards

const container = document.querySelector('.container')
const cardElements = document.getElementsByClassName('card')

let flippedCard1
let flippedCard2

cards.map(cardValue => createCardElements(cardValue))

function createCardElements(cardValue) {
    const cardElement = document.createElement('div')
    cardElement.setAttribute('class', 'card')
    cardElement.addEventListener('click', () => flipCard(cardValue, cardElement))
    container.append(cardElement)
}

function flipCard(cardValue, cardElement) {
    if (flippedCard1 && flippedCard2) return
    if (cardElement.innerText == '') {
        cardElement.innerText = cardValue
        if (flippedCard1) {
            flippedCard2 = { cardValue, cardElement }
            setTimeout(() => evaluateCards(), 2000)
        } else {
            flippedCard1 = { cardValue, cardElement }
        }
    } else {
        if (getNumOfFlippedCards() == 1) {
            cardElement.innerText = ''
        }
    }
}

function getNumOfFlippedCards() {
    let numOfFlippedCards = 0
    for (const cardElement of cardElements) {
        if (cardElement.innerText !== '') {
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
        flippedCard1.cardElement.innerText = ''
        flippedCard2.cardElement.innerText = ''
        flippedCard1 = null
        flippedCard2 = null
    }
}
