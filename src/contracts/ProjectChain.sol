pragma solidity ^0.5.0;

contract ProjectChain {
    string public name = "ProjectChain";

    uint256 public currentUser = 0;

    uint256 public projCount = 0;
    mapping(uint256 => Project) public projects;

    uint256 public userCount = 0;
    mapping(uint256 => User) public users;

    struct User {
        uint256 userId;
        string userName;
        string userPwd;
        address payable walAdd;
        mapping(uint256 => Project) myProjects;
    }
    event UserRegistered(
        uint256 userId,
        string userName,
        string userPwd,
        address payable walAdd
    );
    event UserLoggedIn(
        uint256 userId
    );
    // Struct
    struct Project {
        uint256 projId;
        string prevHash;
        string projHash;
        uint256 projSize;
        string projType;
        string projName;
        string projDesc;
        uint256 uploadTime;
        address payable auther;
    }

    event ProjUploaded(
        uint256 projId,
        string prevHash,
        string projHash,
        uint256 projSize,
        string projType,
        string projName,
        string projDesc,
        uint256 uploadTime,
        address payable auther
    );

    constructor() public {}

    function regUser(string memory _userName, string memory _pwd) public {
        require(bytes(_userName).length > 0);
        require(bytes(_pwd).length > 0);
        require(msg.sender != address(0));
        userCount++;
        users[userCount] = User(userCount, _userName, _pwd, msg.sender);
        emit UserRegistered(userCount, _userName, _pwd, msg.sender);
    }

    function loginUser(uint256 _Id) public {
        currentUser=_Id; 
        emit UserLoggedIn(_Id);
    //     require(bytes(_userName).length > 0);
    //     require(msg.sender != address(0));
    //     bytes32 pass = keccak256(abi.encodePacked(_pwd));
    //     for (uint8 i = 1; i <= userCount; i++) {
    //         string memory uname=users[i].userName;
    //         if (keccak256(abi.encodePacked(uname)) == keccak256(abi.encodePacked(_userName)))
    //             if (users[i].pwdHash == pass) {
    //                 currentUser = users[i].userId;
    //                 emit UserLoggedIn(userCount, _userName, pass, msg.sender);
    //             }
    //     }
    }

    function uploadProj(
        string memory _projHash,
        uint256 _projSize,
        string memory _projType,
        string memory _projName,
        string memory _projDesc
    ) public {
        require(bytes(_projHash).length > 0);
        require(bytes(_projType).length > 0);
        require(bytes(_projName).length > 0);
        require(bytes(_projDesc).length > 0);
        require(msg.sender != address(0));

        require(_projSize > 0);

        string memory prev;
        if (projCount > 0) prev = projects[projCount].projHash;
        else prev = "root";

        projCount++;

        projects[projCount] = Project(
            projCount,
            prev,
            _projHash,
            _projSize,
            _projType,
            _projName,
            _projDesc,
            now,
            msg.sender
        );

        emit ProjUploaded(
            projCount,
            prev,
            _projHash,
            _projSize,
            _projType,
            _projName,
            _projDesc,
            now,
            msg.sender
        );
    }
}
