import * as style from './card.module.css'
const Cards = ({clickHandler,card,clicked})=>{
    return (
        <button className={style.card} disabled={clicked} onClick={clickHandler}>{card}</button>)
}

export default Cards