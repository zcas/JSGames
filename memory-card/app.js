document.addEventListener('DOMContentLoaded', () => {
    //card options
    const cardArray = [
        {
            name:'fries',
            img: 'images/fries.png'
        },
        {
            name:'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name:'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name:'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name:'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name:'pizza',
            img: 'images/pizza.png'
        },
        {
            name:'fries',
            img: 'images/fries.png'
        },
        {
            name:'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name:'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name:'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name:'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name:'pizza',
            img: 'images/pizza.png'
        }
    ]
    //create game board
    cardArray.sort(() => 0.5 - Math.random())
    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    chosenCards = []
    chosenCardsId = []
    wonCards = []

    function createBoard(){
        for(let i =0; i < cardArray.length; i++){
            var card = document.createElement('img')
            card.setAttribute('src','images/blank.png')
            card.setAttribute('data-id',i)
            card.addEventListener('click',flipCard)
            grid.appendChild(card)
        }
    }
    function checkForMatch(){
        var cards = document.querySelectorAll('img')
        const optionOneId = chosenCardsId[0]
        const optionTwoId = chosenCardsId[1]
        if(chosenCards[0] == chosenCards[1]){
            cards[optionOneId].setAttribute('src','images/white.png')
            cards[optionTwoId].setAttribute('src','images/white.png')
            wonCards.push(chosenCards)
        }else{
           cards[optionOneId].setAttribute('src','images/blank.png')
           cards[optionTwoId].setAttribute('src','images/blank.png') 
        }
        chosenCards = []
        chosenCardsId = []
        resultDisplay.textContent = wonCards.length
        if(wonCards.length == cardArray.length/2){
            resultDisplay.textContent = 'Won'
        }
    }

    function flipCard(){
        var cardId = this.getAttribute('data-id')
        chosenCards.push(cardArray[cardId].name)
        chosenCardsId.push(cardId)
        this.setAttribute('src',cardArray[cardId].img)
        if(chosenCards.length == 2){
            setTimeout(checkForMatch,500)
        }
    }

    createBoard()

})