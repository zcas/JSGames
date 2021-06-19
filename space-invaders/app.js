document.addEventListener('DOMContentLoaded', () =>{
    const squares= document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('#result')
    let width = 15
    let currentShooterIndex = 202
    let currentInvaderIndex = 0
    let alienInvaderDestroyed = []
    let result= 0
    let direction = 1
    let invaderId
    
    // define aliens
    const alienInvaders = [
        0,1,2,3,4,5,6,7,8,9,
        15,16,17,18,19,20,21,22,23,24,
        30,31,32,33,34,35,36,37,38,39
    ]

    //draw aliens 
    alienInvaders.forEach( alienInvader => squares[currentInvaderIndex+alienInvader].classList.add('invader'))

    //moving aliens
    function moveAliens(){
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length-1] % width === width -1

        if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
            direction = width
        }else if( direction === width){
            if(leftEdge){
                direction = 1
            } 
            if(rightEdge){
                direction = -1
            }
        }
        for(let i = 0; i <= alienInvaders.length -1; i++){
            squares[alienInvaders[i]].classList.remove('invader')
        }
        for(let i = 0;i<= alienInvaders.length-1; i++){
            alienInvaders[i] += direction
        }
        for(let i = 0; i<=alienInvaders.length-1;i++){
            if(!alienInvaderDestroyed.includes(i)){
                squares[alienInvaders[i]].classList.add('invader')
            }     
        }

    // decides game over
        if(squares[currentShooterIndex].classList.contains('invader','shooter')){
            scoreDisplay.textContent = 'Game Over'
            squares[currentShooterIndex].classList.add('boom')
            squares[currentShooterIndex].classList.remove('shooter')
            squares[currentShooterIndex].classList.remove('invader')
            clearInterval(invaderId)
        }
        for (let i = 0; i <= alienInvaders.length-1;i++){
            if(alienInvaders[i]> (squares.length - (width-1))){
                scoreDisplay.textContent = 'Game Over'
                clearInterval(invaderId)
            }
        }
    // win?

    if(alienInvaderDestroyed.length===alienInvaders.length){
        scoreDisplay.textContent = result + '- You Won!'
        clearInterval(invaderId)
    }
    
    }
    invaderId = setInterval(moveAliens,500)

    //shoot bullet
    function shoot(e){
        let keyPressed = e.keyCode
        let bulletId
        let currentBulletIndex = currentShooterIndex
        function moveBullet(){
            squares[currentBulletIndex].classList.remove('bullet')
            currentBulletIndex -= width
            squares[currentBulletIndex].classList.add('bullet')
            if(squares[currentBulletIndex].classList.contains('invader')){
                squares[currentBulletIndex].classList.remove('invader')
                squares[currentBulletIndex].classList.remove('bullet')
                squares[currentBulletIndex].classList.add('boom')

                setTimeout(() => squares[currentBulletIndex].classList.remove('boom'),200)
                clearInterval(bulletId)
                
                const alienTakenDown = alienInvaders.indexOf(currentBulletIndex)
                alienInvaderDestroyed.push(alienTakenDown) 
                result++
                scoreDisplay.textContent = result
            }
            if(currentBulletIndex < width){
                clearInterval(bulletId)
                setTimeout(() => squares[currentBulletIndex].classList.remove('bullet'),100)
            }
        }
        if(keyPressed === 32){
            bulletId = setInterval(moveBullet,100)
        }
    }

    
 
    
    //shooter move
    squares[currentShooterIndex].classList.add('shooter')

    function control(e){
        if(e.keyCode === 39 && (currentShooterIndex % width < width-1)){
            squares[currentShooterIndex].classList.remove('shooter')
            currentShooterIndex++
            squares[currentShooterIndex].classList.add('shooter')
        }
        if(e.keyCode === 37 && (currentShooterIndex % width !== 0)){
            squares[currentShooterIndex].classList.remove('shooter')
            currentShooterIndex--
            squares[currentShooterIndex].classList.add('shooter')
        }
    }
        document.addEventListener('keyup',control)
        document.addEventListener('keyup',shoot)
})