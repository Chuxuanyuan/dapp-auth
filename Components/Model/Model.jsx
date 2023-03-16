import React, { useState, useContext, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";

//INTERNAL IMPORT
import Style from './Model.module.css';
import images from '../../assets';
import { AuthContect } from '../../Context/AuthContext';
import { Loader } from '../../Components/index';
import { uploadToIPFS } from '../../Context/AuthContext';
import { ST } from "next/dist/shared/lib/utils";

const Model = ({
    openBox,
    title,
    address,
    head,
    info,
    smallInfo,
    image,
    functionName
}) => {

    //USESTATE
    const [_addr, setAddress] = useState("");
    const [_sid, setStuid] = useState("");
    const [_image, setImage] = useState("");
    const [_fname, setFirstname] = useState("");
    const [_lname, setLastname] = useState("");
    const [_gender, setGender] = useState("");
    const [_grade, setGrade] = useState("");
    const [_course, setCourse] = useState("");
    const [_level, setLevel] = useState("");
    const [_mobile, setMobile] = useState("");

    //SAVE IMAGE
    const [NFTs, setNFTs] = useState([]);
    const [aNFTs, setANFTs] = useState([]);

    const { loading } = useContext(AuthContect);

    const router = useRouter();
    const { uploadToIPFS } = useContext(AuthContect);

    const [fileUrl, setFileUrl] = useState(null);
    // const [formInput, setFormInput] = useState({
    //     name: "",
    //     address: "",
    //     position: "",
    // });

    const onDrop = useCallback(async (acceptedFile) => {
        const url = await uploadToIPFS(acceptedFile[0]);
        setFileUrl(url);
        setImage(url);
        setNFTs(url);
        setANFTs(address);
        console.log(url);
    });

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/*",
        maxSize: 5000000,
    });

    return (
        <div className={Style.Model}>
            <div className={Style.Model_box}>
                <div className={Style.Model_box_left}>
                    <div>
                        {fileUrl && (
                            <div className={Style.Model_image}>
                                <img src={fileUrl} alt="Stu Image" width={500} height={500} />
                            </div>
                        )}
                        {!fileUrl && (
                            <div className={Style.Model_image_sideInfo}>
                                <Image src={image} alt="buddy" width={700} height={700} />
                             </div>
                         ) }
                    </div>
                </div>
                <div className={Style.Model_box_right}>
                    <h1>
                        {title} <span>{head}</span>
                    </h1>
                    <p>{info}</p>
                    <small>{smallInfo}</small>

                    {
                        loading == true ? (
                            <Loader />
                        ) : (
                            <div className={Style.Model_box_right_name}>



                                <div className={Style.Model_box_right_name_info}>
                                    <div className={Style.Model_box_div}>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />

                                            <div className={Style.Model_box_div_info}>
                                                <p>Upload File: JPG, PNG, GIF, WEBM Max 10MB</p>

                                                <div className={Style.Model_box_div_image}>
                                                    <Image
                                                        src={images.create}
                                                        width={50}
                                                        height={50}
                                                        // objectFit="contain"
                                                        alt="File upload"
                                                        onChange={(e) => setImage(e.target.value)}
                                                    />
                                                </div>
                                                <p>Drag & Drop File</p>
                                                <p>or Browse Media on you device</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className={Style.Model_box_right_name_info}>
                                    <div className={Style.Model_box_right_name_info2}>
                                        <Image src={images.account} alt="address" width={30} height={30} />
                                        <input
                                            type="address"
                                            placeholder={address || "Enter address .."}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>

                                    <div className={Style.Model_box_right_name_info2}>
                                        <Image src={images.sid} alt="stuid" width={30} height={30} />
                                        <input
                                            type="uint"
                                            placeholder="your student id"
                                            onChange={(e) => setStuid(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={Style.Model_box_right_name_info}>
                                    <div className={Style.Model_box_right_name_info2}>
                                        <Image src={images.fname} alt="firstname" width={30} height={30} />
                                        <input
                                            type="text"
                                            placeholder="your firstname"
                                            onChange={(e) => setFirstname(e.target.value)}
                                        />
                                    </div>

                                    <div className={Style.Model_box_right_name_info2}>
                                        <Image src={images.lname} alt="lastname" width={30} height={30} />
                                        <input
                                            type="text"
                                            placeholder="your lastname"
                                            onChange={(e) => setLastname(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={Style.Model_box_right_name_info}>
                                    <div className={Style.Model_box_right_name_info2}>
                                        <Image src={images.gender} alt="gender" width={30} height={30} />
                                        <input
                                            type="text"
                                            placeholder="male / female"
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                    </div>

                                    <div className={Style.Model_box_right_name_info2}>
                                        <Image src={images.grade} alt="grade" width={30} height={30} />
                                        <input
                                            type="text"
                                            placeholder="your grade (0.00 - 4.00)"
                                            onChange={(e) => setGrade(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={Style.Model_box_right_name_info}>
                                    <div className={Style.Model_box_right_name_info2}>
                                        <Image src={images.course} alt="course" width={30} height={30} />
                                        <input
                                            type="text"
                                            placeholder="your course (IE,CPE,CE,EE,ME,LGE)"
                                            onChange={(e) => setCourse(e.target.value)}
                                        />
                                    </div>

                                    <div className={Style.Model_box_right_name_info2}>
                                        <Image src={images.level} alt="level" width={30} height={30} />
                                        <input
                                            type="text"
                                            placeholder="your level (1-4 or etc)"
                                            onChange={(e) => setLevel(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={Style.Model_box_right_name_info3}>
                                    <Image src={images.mobile} alt="mobile" width={30} height={30} />
                                    <input
                                        type="text"
                                        placeholder="your mobile phone"
                                        onChange={(e) => setMobile(e.target.value)}
                                    />
                                </div>

                                <div className={Style.Model_box_right_name_btn}>
                                    <button
                                        onClick={() => functionName({
                                            _addr,
                                            _sid,
                                            _image,
                                            _fname,
                                            _lname,
                                            _gender,
                                            _grade,
                                            _course,
                                            _level,
                                            _mobile
                                        })}
                                    >
                                        {""}
                                        <Image src={images.send} alt="send" width={30} height={30} />
                                        {""}
                                        Submit
                                    </button>

                                    <button
                                        onClick={() => openBox(false)}>
                                        {""}
                                        <Image src={images.close} alt="send" width={30} height={30} />
                                        {""}
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
};

export default Model;