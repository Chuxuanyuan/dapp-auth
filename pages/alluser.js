import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import { UserCard } from "../Components/index";
import Style from '../styles/alluser.module.css';
import { AuthContect } from "../Context/AuthContext";

const alluser = () => {
    const { userLists } = useContext(AuthContect);
    return (
        <div>
            <div className={Style.alluser_info}>
                <h1>List users used dapp</h1>
            </div>

            <div className={Style.alluser}>
                {userLists.map((el, i)=> (
                    <UserCard key={i + 1} el={el} i={i} />
                ))}
            </div>
        </div>
    )
};

export default alluser;