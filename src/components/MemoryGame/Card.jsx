import { Component, Fragment } from 'react'
import Cards from './Cards'
import Message from './Message'
import * as style from './card.module.css'


export default class Card extends Component {
    LOCAL_STORAGE_KEY = "Memory game score board"
    state={cards:[],gameSeconds:0,gameOver:false,gameMoves:0,scoreBoard:[]}
    timeHandler = null;
    card1=null;
    card2=null

    startGame=()=>{
        this.shuffle()
        this.startTime()
        this.setState({gameMoves:0})
    }

    shuffle=()=>{
        const cards = [
            {card:1,clicked:false},
            {card:1,clicked:false},
            {card:2,clicked:false},
            {card:2,clicked:false},
            {card:3,clicked:false},
            {card:3,clicked:false}
        ]
        cards.sort(()=> .5 - Math.random())
        this.setState({cards})
    }

    startTime=()=>{
        this.setState({gameSeconds:0})
        this.timeHandler = setInterval(() => {
        this.setState({gameSeconds:this.state.gameSeconds+1})
        }, 1000);
    }
    stopTime = ()=>{
        clearInterval(this.timeHandler)
        this.timeHandler = null
    }

    stopGame = ()=>{
        this.stopTime()
        this.appendToHistory(this.state.gameSeconds,this.state.gameMoves)
    }

    isGameOver = ()=>{
        for (let i = 0; i < this.state.cards.length; i++) {
            const item = this.state.cards[i];
            if (!item.clicked) {
                return false;
                }
            }
        return true;
    }

    getHistory = () => {
        let jsonHistory = localStorage.getItem(this.LOCAL_STORAGE_KEY);
        return jsonHistory ? JSON.parse(jsonHistory) : [];
    };
    
    appendToHistory = (secondsElapsed,moves) => {
        let historyArray = this.getHistory();
        let score = {time:secondsElapsed,moves:moves}
        historyArray.push(score);
        console.log(historyArray);
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(historyArray));
    };

    render() {
        const {cards,gameSeconds,gameOver,gameMoves,scoreBoard} = this.state
        const cardsElement = cards.map((item,i)=>(
            <Cards
            key={i}
            clicked={item.clicked}
            card={item.card}
            clickHandler={(e)=>{
                item.clicked = true
                this.setState({gameOver:this.isGameOver()})
                if (this.isGameOver()) {
                    this.stopGame()
                }
                let cardToMatch = cards
                if (this.card1 === null) {
                    this.card1 = cardToMatch[i]
                    return
                }
                if (this.card2 === null && !(this.card1 === null)) {
                    this.card2 = cardToMatch[i]
                }
                if (this.card1.clicked === this.card2.clicked) {
                    this.setState({gameMoves:gameMoves + 1})
                    if (this.card1.card === this.card2.card) {
                        this.card1 = null
                        this.card2 = null
                        console.log("success");
                    }
                    else{
                        this.card1.clicked = false
                        this.card2.clicked = false
                        this.card1 = null
                        this.card2 = null
                    }
                }
            }
            }
            />
            ))

            const scoreHistory = (
                <Fragment>
                    <button onClick={()=>{
                        this.setState({scoreBoard:this.getHistory()})
                        }}>
                        Score Board
                    </button>
                    {scoreBoard.map((it,i)=>(
                        <p>{i}. Time: {it.time} sec , Moves: {it.moves}</p>
                    ))}
                </Fragment>
            )
                
        return (
            <>
                <h1>Memoy Game</h1>
                <button onClick={this.startGame}>Start Game</button><button onClick={this.stopTime}>Stop Game</button><br />
                <div className={style.cards}>
                {cardsElement}
                </div>
                <Message gameSeconds={gameSeconds} gameMoves={gameMoves} gameOver={gameOver}/>
                {scoreHistory}
            </>
        )
    }
}
