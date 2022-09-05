import React, { useState } from 'react';
import { superGame } from '../mock';
const SuperGame = ({ count }) => {

    const [answerObj, setAnswer] = useState({})
    const [winner, setWinner] = useState(false);
    const onChange = (key, value) => {
        let obj = { ...answerObj };
        obj[key] = value;
        setAnswer(obj);
    }

    const renderQuestion = superGame.questions.map((item) => {
        return <div>
            <li>
                <label>
                    <span>{item.qustion}</span>
                    <input onChange={(e) => onChange(item.qustion, e.target.value.toString())} className='input' type={'number'} />
                </label> </li>

        </div>

    })

    const renderAnswers = superGame.answers.map(item => {
        return <li>{item}</li>
    })

    const click = () => {

        const right = superGame.questions.every((item) => {
            const { qustion, answer } = item;
            return answerObj[qustion] === answer
        })

        setWinner(right);
    }

    return (
        <div className='super-game'>
            {
                winner ? <h1 className='question' >
                    {count > 0 ? `Поздравляю вы удвоили очки. У вас ${count * 2} очков, с этими очками вы начнете игру в следующий раз.` : 'Поздравляю вам удалось победить'}
                </h1> :
                    <div className='flex-container' >
                        <h1>
                            {superGame.title}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                            <ul className='list' >{renderQuestion}</ul>
                            <ol className='list'>
                                {renderAnswers}
                            </ol>
                        </div>
                        <button onClick={click} className='button' >Проверить</button>
                    </div>
            }

        </div>

    );
};

export default SuperGame;