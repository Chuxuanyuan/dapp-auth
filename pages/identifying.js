import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import { FaceRecognition } from "../Components/index";
import Style from '../styles/alluser.module.css';
import { AuthContect } from "../Context/AuthContext";

const identifying = () => {
    const { userLists } = useContext(AuthContect);
    return (
        <div>
            <div className={Style.alluser_info}>
                <h1>Identifying</h1>
            </div>

            <div>
                <FaceRecognition />
            </div>
        </div>
    )
};

export default identifying;