import React, {useMemo, useState} from 'react';

const AddUsers = ({users, setUsers, setStart}) => {
    const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const addUser = (newName) => {
    setValue("");
    if (
      users.some(({ name }) => {
        return name === newName;
      })
    ) {
      alert("это имя уже занято");
    } else {
      setUsers((prev) => {
        return [...prev, { name: newName, points: 0 }];
      });
    }
  };

  const renderUsers = useMemo(() => {
    if (users?.length) {
      return users.map((item) => {
        return <div>{item.name}</div>;
      });
    }
  }, [users]);

    return (
        <div className='flex-container'>
        <div className='super-game'>
            <div className='list-users' >
            {renderUsers}
            </div>
          <label className='flex-container' >
            <span>Имя игрока</span>
            <input
            className='input bigger'
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyPress={(e) => e.key === "Enter" && addUser(e.target.value)}
            />
          </label>
        </div>
       
          <button className='button button-wrapper' onClick={() => setStart(true)}>К игре</button>
    
      </div>
    );
};

export default AddUsers;