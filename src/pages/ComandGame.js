
import { newQuestion, hints } from "../mock";
import { useEffect, useState } from "react";
import AddUsers from "../components/AddUsers";
import ComadSuperGame from "../components/ComadSuperGame";
import ComadPoints from "../components/ComadPoints";



const ComandGame = () => {
    const [question, setQuestion] = useState(0);
    const [start, setStart] = useState(false)
    const [disabled, setDisabled] = useState([]);
    const [disbledHints, setDisabledHints] = useState({});
    const [users, setUsers] = useState([]);
    const [currentUsers, setCurrentUsers] = useState('');
    const [disabledUsers, setDisabledUsers] = useState([]);
    const [media, setMedia] = useState('');
    const [videoAnswer, setVideoAnswer] = useState('');
    const [mediaType, setMediaType] = useState('')
    const [currentDisabledAnswer, setCurrentDisabledAnswer] = useState([]);
    const [nextQuestion, setNextQuestion] = useState(false);
    const [superGame, setSuperGame] = useState(false)
    const [end, setEnd] = useState(false)
    const [winner, setWinner]=useState('');
    
    useEffect(()=>{
        if(end){
        const sortUsers = users.sort((a, b) => a?.points - b?.points);
            setWinner(sortUsers[sortUsers.length-1].name)
        }
    },[end])

    const renderCurrentUssers = (arrUsers) => {
        const sortUsers = arrUsers.sort((a, b) => a?.points - b?.points);
        setCurrentUsers(sortUsers[0]?.name || users[0]?.name)
    }

    const lastQuestion = () => {
        return question < newQuestion.length;
    }

    useEffect(() => {
        if (lastQuestion()) {
            renderCurrentUssers(users);

        } else {
            setSuperGame(true)
                ;
        }
    }, [question, start])





    const click = (points, i) => {
        setCurrentDisabledAnswer([]);
        setDisabled((prev) => {
            return [...prev, i]
        })

        const userIndex = users.findIndex(({ name }) => name === currentUsers);

        const arrUsers = [...users];

        arrUsers[userIndex].points = +arrUsers[userIndex].points + +points;

        setUsers(arrUsers);

        setDisabledUsers((prev) => {
            return [...prev, currentUsers]
        })
    }

    useEffect(() => {
        if (start && disabledUsers.length >= users.length) {
            setNextQuestion(true)
        } else {
            const filterUsers = users.filter(({ name }) => !disabledUsers.includes(name))
            renderCurrentUssers(filterUsers);
        }

    }, [disabledUsers])

    const renderQuestion = () => {
        if (lastQuestion())
            return (
                <div className="flex-container" >
                    <h1 className="question" >{newQuestion[question].question}</h1>
                    <div className="button-block" >
                        {newQuestion[question].answers.map((item, i) => {
                            return (
                                <button disabled={disabled.includes(i) || currentDisabledAnswer.includes(item)} className="button" onClick={() => click(item.points, i)}>
                                    {disabled.includes(i) ? item.points : item.answer}
                                </button>
                            );
                        })}
                    </div>

                </div>
            );
    };

    useEffect(() => {
        if (lastQuestion() && newQuestion[question]?.media?.question) {
            setMediaType(newQuestion[question].media.type)
            setMedia(newQuestion[question].media.question);
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
                return <img width="600" src={media} alt='img' />
            case 'audio':
                return <audio src={media} />
            default:
                break;
        }
    }

    const bestOrlose = () => {
        const sortAnswer = newQuestion[question].answers.sort((a, b) => a.points - b.points);
        setCurrentDisabledAnswer([sortAnswer[1], sortAnswer[2]])

    }

    const centerPoints = () => {
        const sortAnswer = newQuestion[question].answers.sort((a, b) => a.points - b.points);
        setCurrentDisabledAnswer([sortAnswer[0], sortAnswer[sortAnswer.length - 1]])

    }

    const hintsClick = (hint) => {
        switch (hint) {
            case 'лучший и худший':
                bestOrlose();
                break;
            case 'два средних':
                centerPoints()
                break;
            default:
                break;
        }
        const disHin = disbledHints[currentUsers] || [];

        disHin.push(hint);

        setDisabledHints((prev) => {
            return { ...prev, [currentUsers]: disHin }
        })
    }

    return (
        <>
            {end ? <div>
                <h1>Победил {winner}</h1>
                <ComadPoints users={users} hint={false}  />
            </div> : superGame ? <ComadSuperGame users={users} setUsers={setUsers} setEnd={setEnd} /> : start ? media ? <div className="flex-container" >
                {renderMedia()}
                <button className="button" onClick={onQuestion} >К вопросу</button>
            </div>
                :
                <div className="flex-container">
                    {<ComadPoints users={users} hint={true} disbledHints={disbledHints} currentUsers={currentUsers} hintsClick={hintsClick} />}
                    <h1>{`Отвечает ${currentUsers}`}</h1>

                    {renderQuestion()}
                    {nextQuestion && <button onClick={() => {
                        setQuestion(question + 1);
                        setNextQuestion(false);
                        setDisabled([]);
                        setDisabledUsers([]);
                    }} className="button" >следующий вопрос</button>}
                    {/* <div className="button-block">{renderHints()}</div> */}
                    <h2>{`Вопрос номер ${question + 1}`}</h2>

                </div> : <AddUsers setStart={setStart} users={users} setUsers={setUsers} />
            }

        </>

    );
}

export default ComandGame;