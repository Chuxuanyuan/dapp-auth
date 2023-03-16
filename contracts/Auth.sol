// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auth {

    //USER STRUCT
    struct Owner {
        address addr;
        string image;
        string sid;
        string firstName;
        string lastName;
        string gender;
        string course;
        string level;
        string grade;
        uint mobileNumber;
    }

    struct AllUser{
        address addr;
        string sid;
    }
    struct AllSid{
        address addr;
        string sid;
    }
    struct AllFname{
        address addr;
        string firstname;
    }
    struct AllLname{
        address addr;
        string lastname;
    }
    struct AllGender{
        address addr;
        string gender;
    }
    struct AllGrade{
        address addr;
        string course;
    }
    struct AllCourse{
        address addr;
        string level;
    }
    struct AllLevel{
        address addr;
        string grade;
    }

    struct AllImage{
        address addr;
        string image;
    }

    AllUser[] getAllUser;
    AllSid[] getAllSid;
    AllFname[] getAllFname;
    AllLname[] getAllLname;
    AllGender[] getAllGender;
    AllGrade[] getAllGrade;
    AllCourse[] getAllCourse;
    AllLevel[] getAllLevel;
    AllImage[] getAllImage;

    mapping(address => Owner) user;

    //Check user exist
    function checkUserExits(address _addr) public view returns(bool){
        return bytes(user[_addr].sid).length > 0;
    }

    //CreateData
    function create(
        address _addr,
        string memory _image,
        string memory _sid,
        string memory _fname,
        string memory _lname,
        string memory _gender,
        string memory _grade,
        string memory _course,
        string memory _level,
        uint _mobile) public   {

        require(_addr == msg.sender, "Unauthorized!");
        require(checkUserExits(msg.sender) == false,"User already exists!");
        require(bytes(_sid).length > 0, "StudentID cannot be empty");

        user[_addr].addr = _addr;
        user[_addr].image = _image;
        user[_addr].sid = _sid;
        user[_addr].firstName = _fname;
        user[_addr].lastName = _lname;
        user[_addr].gender = _gender;
        user[_addr].grade = _grade;
        user[_addr].course = _course;
        user[_addr].level = _level;
        user[_addr].mobileNumber = _mobile;

        getAllUser.push(AllUser(msg.sender, _sid));
        getAllSid.push(AllSid(msg.sender, _sid));
        getAllFname.push(AllFname(msg.sender, _fname));
        getAllLname.push(AllLname(msg.sender, _lname));
        getAllGender.push(AllGender(msg.sender, _gender));
        getAllGrade.push(AllGrade(msg.sender, _grade));
        getAllCourse.push(AllCourse(msg.sender, _course));
        getAllLevel.push(AllLevel(msg.sender, _level));
        getAllImage.push(AllImage(msg.sender, _image));
    }

    //getUsersid
    function getUsersid(address _addr) public view returns(string memory){
        //require(checkUserExits(_addr), "User is not registered");
        return user[_addr].sid;
    }
    //getUserFirstName
    function getUserfname(address _addr) public view returns(string memory){
        return user[_addr].firstName;
    }
    //getUserLastName
    function getUserlname(address _addr) public view returns(string memory){
        return user[_addr].lastName;
    }
    //getUserGender
    function getUsergender(address _addr) public view returns(string memory){
        return user[_addr].gender;
    }
    //getUserGrade
    function getUsergrade(address _addr) public view returns(string memory){
        return user[_addr].grade;
    }
    //getUserCourse
    function getUsercourse(address _addr) public view returns(string memory){
        return user[_addr].course;
    }
    //getUserLevel
    function getUserlevel(address _addr) public view returns(string memory){
        return user[_addr].level;
    }

    //getImage
    function getImage(address _addr) public view returns(string memory){
        return user[_addr].image;
    }

    //getData
    function getData(address _addr) public view returns(
            string memory, 
            string memory, 
            string memory, 
            string memory, 
            string memory, 
            string memory, 
            string memory
            //uint
        ) {

        return (
            user[_addr].sid,
            user[_addr].firstName,
            user[_addr].lastName,
            user[_addr].gender,
            user[_addr].grade,
            user[_addr].course,
            user[_addr].level
            //user[_addr].mobileNumber
        );
    }

    //getAlluser
    function getAllAppUser() public view returns(AllUser[] memory){
        return getAllUser;
    }

    //getAllImage
    function getAllAppImage() public view returns(AllImage[] memory){
        return getAllImage;
    }
}