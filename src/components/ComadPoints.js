import React from 'react';

const ComadPoints = ({users, hint, disbledHints, currentUsers, hintsClick}) => {
    return (
        <div className="flex-container flex-row max-width">
            {users.map(({ name, points, hints })=>{
                return  <h2 className="flex-container user-border" >{name}
                <div className="circle circle-non-margin" >
                    {`${points}`}
                </div>
                {hint &&
                <div className="button-block no-wrap" >{hints.map(item => {
                    return <button disabled={(Object.keys(disbledHints).length && disbledHints?.[currentUsers]?.includes(item)) || name !== currentUsers} onClick={() => hintsClick(item)} className="button-hints">{item}</button>
                })}</div>
                }
                
            </h2>
            })}
            
        </div>
    );
};

export default ComadPoints;