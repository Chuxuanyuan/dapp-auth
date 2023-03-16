import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from './UserCard.module.css';
import images from '../../assets';

const UserCard = ({el, i}) => {
    console.log(el);
    return (
        <div className={Style.UserCard}>
            <div className={Style.UserCard_box}>
                <Image 
                    className={Style.UserCard_box_img}
                    src={images[`image${i + 1}`]} 
                    alt="user"
                    width={100}
                    height={100}
                />

                <div className={Style.UserCard_box_info}>
                    <h3>{el.addr.slice(0,7)}...{el.addr.slice(36,42)}</h3>
                </div>
            </div>

            <small className={Style.number}>{i + 1}</small>
        </div>
    )
};

export default UserCard;