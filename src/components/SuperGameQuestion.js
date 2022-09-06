import React, { useState } from "react";

const SuperGameQuestion = ({ currentUsers, userClick, setUserClick, loc, opacity, setDisabled, disabled }) => {
   

    const click = (e, name) => {
        const element = e.target.getBoundingClientRect();
        setUserClick((prev) => {
            return { ...prev, [name]: { x: e.clientX-element.left-50, y: e.clientY-element.top-15 } };
        });
       
        setDisabled((prev)=>{
            return [...prev, name]
        })
    };

    return (
        <div
            onClick={(e) => {
              !disabled &&  click(e, currentUsers);
            }}
            style={{ position: "relative" }}
        >
            <div
                style={{
                    position: "absolute",
                    width: "50px",
                    height: "50px",
                    borderRadius: '50%',
                    left: loc.x + "px",
                    top: loc.y + "px",
                    background: "gold",
                    opacity: opacity ?1 :0
                }}
            />
            {Object.keys(userClick).map((item) => {
                return (
                    <div
                        style={{
                            position: "absolute",
                            width: "100px",
                            height: "30px",
                            left: userClick[item].x + "px",
                            top: userClick[item].y + "px",
                            background: "#040231",
                            border:'2px solid #0f61ef',
                            borderRadius:'20px',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                    >{item}</div>
                );
            })}
            <img
            width={600}
                alt="mem"
                src={
                    "https://24.kg/thumbnails/e72e8/db152/240073_w_h500_1638954336_r.jpg"
                }
            />
        </div>
    );
};

export default SuperGameQuestion;
