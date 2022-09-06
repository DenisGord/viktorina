import React, { useState, useEffect } from 'react';
import './style.css'

const Begin = ({setStart, setRulles, rulles}) => {

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {

            let j = 0
            const littleInterval = setInterval(() => {

                document.getElementById(`h${i}`).style.opacity = j
                j = j + 0.1;

                if (j >= 1) {
                    clearInterval(littleInterval)

                }
            }, 50)
            i++
            if (i >= 4) {
                clearInterval(interval);
            }
        }, 1000);
    }, [])



    return (
        <div className='container' >
            {rulles ?<>
                <p>
                    {rulles=== 'li' ? 
                'Вам предстоит состязание с вашими друзьями. В каждом вопросе вам нужно выбрать наиболее правильный ответ. За один вопрос можно заработать от 10 до 40 очков. В вопросе ходит первым тот у кого обзая сумма очков наименьшая. Удачи' :
                ' В этой игре вы играете командой, чтобы победить вам необходимо набрать очков больше нуля. В каждом вопросе у вас будет 4 варианта ответа. За каждый неверный ответ из вашего счета будет отниматься 1/3 от стоимости очков за вопрос. Поэтому ответив на три вопроса не верно, вы не заработаете очков, а из вашего счета отнимуться все очки предложенные за вопрос. Также у вас есть три подсказки. Подсказки можно использовать только когда у вас доступны все варианты отввета. Удачи!'    
                }
               
            </p>
            <button id='h4' onClick={() => { setStart(true)}} className='button'>К вопросам</button>

            </> : <>
                <h2 className='h-opacity' id='h1' >Добро пожаловать</h2>
                <h3 className='h-opacity' id='h2'>На первую игру</h3>
                <h1 className='h-opacity' id='h3'>"Кто хочет стать МилиАндреем"</h1>
                <div id='h4' className='h-opacity' >
                <button  onClick={() =>  setRulles('co')} className='button'>Командныя игра</button>
                <button  onClick={() =>  setRulles('li')}  className='button'>Состязание</button>
                </div>

            </>}
        </div>
    );
};

export default Begin;