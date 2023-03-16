import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from './Filter.module.css';
import images from '../../assets';
import { AuthContext } from '../../Context/AuthContext';
import { Model } from '../index';

const Filter = () => {
    const { account } = useContext(AuthContext);

    return (
        <div className={Style.Filter}>
            <div className={Style.Filter_box}>
                <div className={Style.Filter_box_left}>
                    <div className={Style.Filter_box_left_search}>
                        <Image src={images.search} alt="image" width={20} height={20} />
                        <input type="text" placeholder="search.." />
                    </div>
                </div>
                <div className={Style.Filter_box_right}></div>
            </div>
        </div>
    )
};

export default Filter;