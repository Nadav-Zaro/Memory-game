const Message = ({gameSeconds,gameMoves,gameOver})=>{
    return (
        <>
        <h4>Game Seconds: {gameSeconds} sec</h4>
        <h3>Game Moves: {gameMoves}</h3>
        {gameOver ? <h5>Game over</h5> : ""}
        </>
    )
}

export default Message