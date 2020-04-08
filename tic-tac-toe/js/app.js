const CIRCLE_CLASS = 'circle';
const X_CLASS ='x';
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const cells = document.querySelectorAll('[data-cell]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restart = document.getElementById('restart');

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    [0, 4, 8],
    [2, 4, 6],
]
class Game{
    constructor(turns){
        this.circleTurns = turns;
        this.init();
    }
    init(){
        cells.forEach(cell => {    
            cell.classList.remove(CIRCLE_CLASS);
            cell.classList.remove(X_CLASS);
            cell.addEventListener('click', this.handleClick.bind(this), {once: true} )
        });
        this.setBoardHoverClass()
    }
    handleClick(e){
        //Place Mark
        //Switch turn
        //check for win
        //check for draw
        const cell = e.target
        const currentClass = this.circleTurns ? CIRCLE_CLASS : X_CLASS
        this.placeMark(cell, currentClass)
        if (this.checkWin(currentClass)) {
            this.endGame(false)
        } else if (this.checkDraw()) {
            this.endGame(true)
        } else {
            this.swapTurns()
            this.setBoardHoverClass()
        }
    }
    placeMark(cell, currentClass){
        cell.classList.add(currentClass);
    }
    swapTurns(){
        this.circleTurns = !this.circleTurns;
    }
    setBoardHoverClass(){
        board.classList.remove(X_CLASS)
        board.classList.remove(CIRCLE_CLASS)
        if (this.circleTurns) {
            board.classList.add(CIRCLE_CLASS)
        } else {
            board.classList.add(X_CLASS)
        }
    }
    checkWin(currentClass){
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
              return cells[index].classList.contains(currentClass)
            })
          })
    }
    checkDraw(){
        return [...cells].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
          })
    }
    endGame(draw){
        if (draw) {
            winningMessageTextElement.innerText = 'Draw!'
          } else {
            winningMessageTextElement.innerText = `${this.circleTurns ? "O's" : "X's"} Wins!`
          }
          winningMessageElement.classList.add('show')
    }
    restart(){
        winningMessage.classList.remove('show');
        winningMessage.classList.add('hide');
        board.classList.remove(CIRCLE_CLASS);
        board.classList.remove(X_CLASS);
        this.circleTurns = new Game(false)
    }
}

const newGame = new Game(false)
restart.addEventListener('click', newGame.restart.bind(this))
