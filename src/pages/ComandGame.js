
import { newQuestion, hints } from "../mock";
import { useEffect, useState } from "react";
import AddUsers from "../components/AddUsers";



const ComandGame = () => {
    const [question, setQuestion] = useState(0);
    const [start, setStart] = useState(false)
    const [disabled, setDisabled] = useState([]);
    const [disbledHints, setDisabledHints] = useState([]);
    const [users, setUsers] = useState([]);
    const [currentUsers, setCurrentUsers] = useState('');
    const [disabledUsers, setDisabledUsers] = useState([]);




    const [media, setMedia] = useState('');
    const [videoAnswer, setVideoAnswer] = useState('');
    const [mediaType, setMediaType] = useState('')


    const renderCurrentUssers = (arrUsers) => {
        const sortUsers = arrUsers.sort((a, b) => a?.points - b?.points);
        setCurrentUsers(sortUsers[0]?.name || users[0]?.name)
    }

    useEffect(() => {
        renderCurrentUssers(users);
    }, [question, start])

    const lastQuestion = () => {
        return question < newQuestion.length;
    }



    const click = (points, i) => {
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
            setQuestion(question + 1);
            setDisabled([]);
            setDisabledUsers([]);
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
                                <button disabled={disabled.includes(i)} className="button" onClick={() => click(item.points, i)}>
                                    {disabled.includes(i) ? item.points : item.answer}
                                </button>
                            );
                        })}
                    </div>

                </div>
            );
    };

    const randomDisabled = (p) => {
        let arr = [];
        newQuestion[question].answers.forEach((item, i) => {
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

    const renderPoints = users.map(({ name, points }) => {
        return <h2 className="flex-container" >{name}
            <div className="circle" >
                {`${points}`}
            </div>
        </h2>

    })

    return (
        <>
            {start ? media ? <div className="flex-container" >
                {renderMedia()}
                <button className="button" onClick={onQuestion} >К вопросу</button>
            </div>
                :
                <div className="flex-container">
                    <div className="flex-container flex-row">
                        {renderPoints}
                    </div>
                    <h1>{`Отвечает ${currentUsers}`}</h1>

                    {renderQuestion()}
                    <div className="button-block">{renderHints()}</div>
                    <h2>{`Вопрос номер ${question + 1}`}</h2>

                </div> : <AddUsers setStart={setStart} users={users} setUsers={setUsers} />
            }

        </>

    );
}

export default ComandGame;