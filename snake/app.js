document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('.score span')
    const startButton = document.querySelector('.start')
    // setting vars
    const width = 10
    let currentIndex = 0
    let appleIndex = 0
    let currentSnake = [2,1,0]
    let direction = 1
    let score = 0 
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    //start game function
    function startGame(){
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        direction = 1
        randomApple()
        scoreDisplay.innerHTML = score
        intervalTime= 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    //behavior of snakes
    function moveOutcomes(){
        // hitting the wall or itself
        if((currentSnake[0] + width >= (width*width) && direction === width) || //hits bottom
         (currentSnake[0] % width === width-1 && direction === 1) || //hits right
         (currentSnake[0] % width === 0 && direction===-1) || //hits left
         (currentSnake[0] - width < 0 && direction ===-width)|| // hits top
         (squares[currentSnake[0] + direction].classList.contains('snake'))) // hits itself 
         {
             return clearInterval(interval)
         }

         const tail = currentSnake.pop()
         squares[tail].classList.remove('snake')
         currentSnake.unshift(currentSnake[0] + direction)
        // hitting an apple
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime*speed
            interval = setInterval(moveOutcomes,intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    function randomApple(){
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple') 
    }

    // setting keycodes for the mov direction
    function control(e){
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode === 39){
            direction = 1  // right
        }
        if(e.keyCode === 38){
            direction = -width // up
        }
        if(e.keyCode === 37){
            direction = -1 //left
        }
        if(e.keyCode === 40){
            direction = +width //down
        }
    }

    document.addEventListener('keyup', control)
    startButton.addEventListener('click',startGame)
})