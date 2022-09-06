import React, { useState, useMemo, useEffect } from "react";
import ComadPoints from "./ComadPoints";
import Label from "./Label";
import SuperGameQuestion from "./SuperGameQuestion";

const loc = { x: 50, y: 50 };

const ComadSuperGame = ({ users, setUsers, setEnd }) => {
  const [disabledUser, setDisabledUser] = useState([]);
  const [userPoint, setUserPoint] = useState({});
  const [start, setStart] = useState(false);
  const [userClick, setUserClick] = useState({});
  const [opacity, setOpacity]=useState(false);
const[anyState, setanyState]=useState([]);
const [currentUsers, setCurrentUsers]=useState('');
const [disabledCurrentUsers, setDisabledCurrentUsers]=useState([])
const [championSuperGame, setChampionSuperGame]=useState('');


  const renderCurrentUssers = (arrUsers) => {
    const sortUsers = arrUsers.sort((a, b) => a?.points - b?.points);
    setCurrentUsers(sortUsers[0]?.name || users[0]?.name)
}



  const usersArr = useMemo(() => {
    return users.filter(({ name }) => !disabledUser.includes(name));
  }, [disabledUser]);

  const addUser = (point, name) => {
   
    setUserPoint((prev) => {
      return { ...prev, [name]: point };
    });

    setDisabledUser((prev) => {
      return [...prev, name];
    });
  };

  const userPoints = Object.keys(userPoint).map((item) => {
    return (
      
        <h2 className="button-block" >{item}
           <div className="circle" >{userPoint[item]}</div>
           </h2>
     
    
    );
  });

  const check = () => {
    setOpacity(true);
    const arr = Object.keys(userClick).map((item) => {
      const zn = Math.sqrt(
        (userClick[item].x - loc.x) * (userClick[item].x - loc.x) +
          (userClick[item].y - loc.y) * (userClick[item].y - loc.y)
      );
      return { name: item, zn };
    });
    const sortArr = arr.sort((a, b) => a.zn - b.zn);
    setChampionSuperGame(sortArr[0].name)
  };

  const pointsToSuperGame = () => {
    return (
      <div className="flex-container" >
        <h1>В супер игру пойдут</h1>
        {Object.keys(userPoint).length > 0 && <div className="button-block" >{userPoints}</div>}
        <div className="button-block" >
          {usersArr.map(({ name }) => {
            return (
                <Label span={name} func={addUser} />
           );
          })}
        </div>
        <button className="button" onClick={() => setStart(true)}>К супер игре</button>
      </div>
    );
  };

  useEffect(()=>{
    if(start){
      const arr=[];
      for (const key in userPoint) {
     
          const element = userPoint[key];
          
       arr.push({name:key, points: element})
      }
      setanyState(arr)
      renderCurrentUssers(users)
    }
  },[start])

  useEffect(()=>{
    if(start){
      const filterUsers = users.filter(({ name }) => !disabledCurrentUsers.includes(name))
      renderCurrentUssers(filterUsers);
    }
  },[disabledCurrentUsers])

  const end=()=>{
    setUsers((prev)=>{
      return prev.map(({name, points})=>{
        return name === championSuperGame ? {name, points: +points + +userPoint[name]}:{name, points: +points - +userPoint[name]}
      })
    })
    setEnd(true)
  }


  return (
    <div className="flex-container">
      {start ? (
        <div className="flex-container">
          <div className="button-block no-wrap" >
            <div>
            <h1>Ваши очки</h1>  
            <ComadPoints users={users} hint={false} />
            </div>
        <div>
        <h1>Вы поставили</h1>
        <ComadPoints users={anyState} hint={false} />
        </div>
      
          </div>
          
         <h1>{championSuperGame ? `В супер игре победил ${championSuperGame} ` : ` Ходит ${currentUsers}`}</h1>
         
          <SuperGameQuestion
            userClick={userClick}
            setUserClick={setUserClick}
            users={users}
            loc={loc}
            opacity={opacity}
            currentUsers={currentUsers}
            setDisabled={setDisabledCurrentUsers}
            disabled={disabledCurrentUsers.length=== Object.keys(userPoint).length }
          />
          {championSuperGame ? 
          <button onClick={end} >К общему счету</button> :
          disabledCurrentUsers.length=== Object.keys(userPoint).length && 
          <button className="button" onClick={check}>Проверить</button>
          }
        </div>
      ) : (
        pointsToSuperGame()
      )}
    </div>
  );
};

export default ComadSuperGame;
