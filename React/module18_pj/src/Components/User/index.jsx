import React, { useState } from "react";
import style from './style.module.css';

const User = ({name, secondName, age, gender, rank}) => {
    const [rankState, setRank] = useState(rank);

    const handlerIncrease = () => setRank(rankState + 1);
    const handlerDecrease = () => setRank(rankState - 1);

    return (
      <div className={style.UserCard}>
        <div>
          <div className={style.Title}>Пользователь:</div>
          <div>{`${name} ${secondName}`}</div>
        </div>
        <div>
          <div className={style.Title}>
            Информация:
          </div>
          <div>
            {`Возраст: ${age}`}
          </div>
          <div>
            {`Пол: ${gender}`}
          </div>
        </div>
        <div>
          <span className={style.Title}>Рейтинг: </span>
          <span>{rankState}</span>
          <div>
          <button onClick={handlerIncrease}>+</button>
          <button onClick={handlerDecrease}>-</button>
          {rankState >= 5?
          <span>Пользователь крут!</span>:
          <span></span>}
           </div>
        </div>
      </div>
    )
   }
    
export default User