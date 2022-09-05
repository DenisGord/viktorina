
import { questions, hints } from "./mock";
import { useEffect, useState } from "react";
import Begin from "./components/Begin";
import SuperGame from "./components/SuperGame";
import "./App.css";
import ComandGame from "./pages/ComandGame";

export default function App() {
  const [question, setQuestion] = useState(0);
  const [disabled, setDisabled] = useState([]);
  const [color, setColor] = useState('');
  const [disbledHints, setDisabledHints] = useState([]);
  const [count, setCount] = useState(0);
  const [point, setPoint] = useState(90)
  const [currentPoint, setCurrentPoint] = useState(90);
  const [media, setMedia] = useState('');
  const [videoAnswer, setVideoAnswer] = useState('');
  const [popUp, setPopUp] = useState('');
  const [mediaType, setMediaType] = useState('')
  const [start, setStart]=useState(false);
  const [superGame, setSuperGame]=useState(false);
  const [rulles, setRulles] = useState(false)

  const lastQuestion = () => {
    return question < questions.length;
  }

  const click = (right, i) => {
    if (right) {
      if (lastQuestion()) {
        setColor('green');
        setTimeout(() => {
          if (questions[question]?.media?.answer) {
            setMedia(questions[question].media?.answer)
            setVideoAnswer(true)
          } else {
            setQuestion(question + 1);
          }
          setColor(false);
          setDisabled([]);
        }, 1000)
        setCount(count + currentPoint);
      }
    } else {
      setDisabled((prev) => {
        return [...prev, i]
      })
      setCurrentPoint(currentPoint - point / 3)
      setCount(count - point / 3)
      setColor('red');
      setTimeout(() => {
        setColor(false);
      }, 1000)
    }
  };



  useEffect(() => {
    if (lastQuestion()) {
      setPoint(90 * (question + 1))

    } else {
      if (count > 0) {
        setPopUp(`Вы победили! У вас ${count} очков`)
      } else {
        setPopUp(`Вы проиграли! У вас ${count} очков`)
      }
    }
  }, [question])

  useEffect(() => {
    setCurrentPoint(point)
  }, [point])





  const renderQuestion = () => {
    if (lastQuestion())
      return (
        <div className="flex-container" >
          <h1 className="question" >{questions[question].qustion}</h1>
          <div className="button-block" >
            {questions[question].answers.map((item, i) => {
              return (
                <button disabled={disabled.includes(i)} className="button" onClick={() => click(item.right, i)}>
                  {item.answer}
                </button>
              );
            })}
          </div>

        </div>
      );
  };

  const randomDisabled = (p) => {
    let arr = [];
    questions[question].answers.forEach((item, i) => {
      if (!item.right) {
        arr.push(i);
      }
    })

    if (p === 50) {
      const rn = Math.floor(Math.random() * 3)
      arr.splice(rn, 1);
      setDisabled([...arr])
    }
    setDisabled([...arr])

  }

  const hintsClick = (name, i) => {
    switch (name) {
      case 'звонок другу':
        break;
      case '50 на 50':
        randomDisabled(50)
        break;
      case '70 на 30':
        randomDisabled()
        break;
      default:
        break;

    }

    setDisabledHints((prev) => {
      return [...prev, i]
    })
  }

  const renderHints = () => {
    if (lastQuestion()) {
      return hints.map((item, i) => {
        return <button onClick={() => hintsClick(item, i)} disabled={disbledHints.includes(i) || disabled.length > 0} className="button-hints" >{item}</button>;
      });
    }
  }

  useEffect(() => {
    if (lastQuestion() && questions[question]?.media?.question) {
      setMediaType(questions[question].media.type)
      setMedia(questions[question].media.question);
    }
  }, [question])

  const onQuestion = () => {
    if (videoAnswer) {
      setQuestion(question + 1);
      setMedia(false);
      setVideoAnswer(false);
    }
    setMedia(false);
  }

  const renderMedia = () => {
    switch (mediaType) {
      case 'video':
        return <iframe src={media} width="400" height="400" frameborder="0" title="вопрос" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      case 'image':
        return <img src={media} alt='img' />
      case 'audio':
        return <audio src={media} />
      default:
        break;
    }
  }

  return (
    <>
    {superGame ? 
      <SuperGame count={count} />:
    !start ?  <Begin rulles={rulles} setRulles={setRulles} setStart={setStart} /> : 
      <div className="App">
      {popUp ? <>
        <h1>{popUp}</h1> 
        <button className="button" onClick={()=>setSuperGame(true)} >Супер Игра</button>
    
      </>
    
      :
      rulles === 'li' ? 
      <ComandGame/> :
        media ? <div className="flex-container" >
          {renderMedia()}
          <button className="button" onClick={onQuestion} >К вопросу</button>
        </div>
          :
          <div className="flex-container">
            <div className="flex-container flex-row">
              <h2 className="count-wrapper" >Счет
                <div className="circle" >
                  {`${count}`}
                </div>
              </h2>
              <h2 className="count-wrapper">На кону
                <div className="circle"  >
                  {`${currentPoint}`}
                </div>
              </h2>
            </div>


            {renderQuestion()}
            <div className="button-block">{renderHints()}</div>
            {color && <div style={{ background: color }} className="background-block" />}
            <h2>{`Вопрос номер ${question + 1}`}</h2>

          </div>
      }
    </div>
    }
   
    </>
  
  );
}