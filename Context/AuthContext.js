import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from "ipfs-http-client";

//INTERNAL IMPORT
import {
    CheckIfWalletConnected,
    connectWallet,
    connectingWithContract,
} from "../Utils/apiFeature";

export const AuthContect = React.createContext();

export const AuthProvider = ({ children }) => {
    //USESTATE
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [userLists, setUserLists] = useState([]);
    const [imageLists, setImageLists] = useState([]);
    const [dataLists, setDataLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [getStuID, setGetStuID] = useState("");
    const [getFname, setGetFname] = useState("");
    const [getLname, setGetLname] = useState("");
    const [getGender, setGetGender] = useState("");
    const [getGrade, setGetGrade] = useState("");
    const [getCourse, setGetCourse] = useState("");
    const [getLevel, setGetLevel] = useState("");

    //AUTH USER DATA
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");
    const [currentUserSid, setCurrentUserSid] = useState("");
    const [currentUserFname, setCurrentUserFname] = useState("");
    const [currentUserLname, setCurrentUserLname] = useState("");
    const [currentUserGender, setCurrentUserGender] = useState("");
    const [currentUserGrade, setCurrentUserGrade] = useState("");
    const [currentUserCourse, setCurrentUserCourse] = useState("");
    const [currentUserLevel, setCurrentUserLevel] = useState("");

    const router = useRouter();

    //FETCH DATA TIME OF PAGE LOAD
    const fetchData = async () => {
        try {
            //GET CONTRACT
            const contract = await connectingWithContract();
            //GET ACCOUNT
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            //GET USER STUID
            const userName = await contract.getUsersid(connectAccount);
            setUserName(userName);
            //GET USER STUID
            const getStuID = await contract.getUsersid(connectAccount);
            setGetStuID(getStuID);
            // GET USER FIRTNAME
            const getFname = await contract.getUserfname(connectAccount);
            setGetFname(getFname);
            //GET USER LASTNAME
            const getLname = await contract.getUserlname(connectAccount);
            setGetLname(getLname);
            //GET USER GENDER
            const getGender = await contract.getUsergender(connectAccount);
            setGetGender(getGender);
            //GET USER GRADE
            const getGrade = await contract.getUsergrade(connectAccount);
            setGetGrade(getGrade);
            //GET USER COURSE
            const getCourse = await contract.getUsercourse(connectAccount);
            setGetCourse(getCourse);
            //GET USER LEVEL
            const getLevel = await contract.getUserlevel(connectAccount);
            setGetLevel(getLevel);
            //GET ALL USER LIST
            const userList = await contract.getAllAppUser();
            setUserLists(userList);
            //GET ALL IMAGE LIST
            // const imageList = await contract.getAllAppImage();
            // setImageLists(imageList);
            // //GET Data LIST
            // const dataLists = await contract.getData();
            // setDataLists(dataLists);

        } catch (error) {
            setError("Please Install And Connect Your Wallet");
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //CREATE ACCOUNT
    const create = async ({
        _addr,
        _image,
        _sid,
        _fname,
        _lname,
        _gender,
        _grade,
        _course,
        _level,
        _mobile }) => {
        try {
            // if (addr || name || surname || grade)
            // return setError("Cannot be emply");

            const contract = await connectingWithContract();
            const getCreatedUser = await contract.create(
                _addr,
                _image,
                _sid,
                _fname,
                _lname,
                _gender,
                _grade,
                _course,
                _level,
                _mobile);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Error Please reload your browser");
            console.log(error);
        }

    };

    //READ INFO
    const readUser = async (userAddress) => {
        const contract = await connectingWithContract();
        const userName = await contract.getUsersid(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
    };

    //READ Student ID
    const readStuID = async (userAddress) => {
        try {
            const contract = await connectingWithContract();
            const stuid = await contract.getUsersid(userAddress);
            setCurrentUserSid(stuid);
        } catch (error) {
            setError("Check Function readStuID");
        }
    }
    //READ Student FirstName
    const readFname = async (userAddress) => {
        try {
            const contract = await connectingWithContract();
            const fname = await contract.getUserfname(userAddress);
            setCurrentUserFname(fname);
        } catch (error) {
            setError("Check Function readFname");
        }
    }
    //READ Student LastName
    const readLname = async (userAddress) => {
        try {
            const contract = await connectingWithContract();
            const lname = await contract.getUserlname(userAddress);
            setCurrentUserLname(lname);
        } catch (error) {
            setError("Check Function readLname");
        }
    }
    //READ Student Gender
    const readGender = async (userAddress) => {
        try {
            const contract = await connectingWithContract();
            const gender = await contract.getUsergender(userAddress);
            setCurrentUserGender(gender);
        } catch (error) {
            setError("Check Function readGender");
        }
    }
    //READ Student Grade
    const readGrade = async (userAddress) => {
        try {
            const contract = await connectingWithContract();
            const grade = await contract.getUsergrade(userAddress);
            setCurrentUserGrade(grade);
        } catch (error) {
            setError("Check Function readGrade");
        }
    }
    //READ Student Course
    const readCourse = async (userAddress) => {
        try {
            const contract = await connectingWithContract();
            const course = await contract.getUsercourse(userAddress);
            setCurrentUserCourse(course);
        } catch (error) {
            setError("Check Function readCourse");
        }
    }
    //READ Student Level
    const readLevel = async (userAddress) => {
        try {
            const contract = await connectingWithContract();
            const level = await contract.getUserlevel(userAddress);
            setCurrentUserLevel(level);
        } catch (error) {
            setError("Check Function readLevel");
        }
    }

    const projectId = "2MhLV4R45LUWIBtZjzOZKQ5moBu";
    const projectSecretKey = "8d89fb761d6615b18ccb12f30de5b27a";
    const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
        "base64"
    )}`;

    const subdomain = "https://authdapp.infura-ipfs.io";

    const client = ipfsHttpClient({
        host: "infura-ipfs.io",
        port: 5001,
        protocol: "https",
        headers: {
            authorization: auth,
        },
    });

    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add({ content: file });
            const url = `${subdomain}/ipfs/${added.path}`;
            return url;
        } catch (error) {
            setError("Error Uploading to IPFS");
            setOpenError(true);
        }
    };

    return (
        <AuthContect.Provider value={{
            create,
            connectWallet,
            CheckIfWalletConnected,
            readUser,
            uploadToIPFS,
            readStuID,
            readFname,
            readLname,
            readGender,
            readGrade,
            readCourse,
            readLevel,
            account,
            userName,
            userLists,
            getStuID,
            getFname,
            getLname,
            getGender,
            getGrade,
            getCourse,
            getLevel,
            imageLists,
            dataLists,
            loading,
            error,
            currentUserName,
            currentUserAddress,
            currentUserSid,
            currentUserFname,
            currentUserLname,
            currentUserGender,
            currentUserGrade,
            currentUserCourse,
            currentUserLevel
        }}
        >
            {children}
        </AuthContect.Provider>
    );
};