pragma solidity ^0.5.0;

contract ProjectChain {
    string public name = "ProjectChain";

    // uint256 public currentUser = 0;

    uint256 public blockSize = 0;
    mapping(uint256 => Project) public projBlock;

    uint256 public blockCount = 0;
    mapping(uint256 => Block) public chain;

    uint256 public projCount = 0;
    mapping(uint256 => Project) public projects;

    uint256 public userCount = 0;
    mapping(uint256 => User) public users;

    struct User {
        uint256 userId;
        string userName;
        string userPwd;
        address payable walAdd;
        mapping(uint256 => Project)  myProjects;
    }
    struct Block {
        uint256 blockId;
        bytes32 blockHash;
        bytes32 preHash;
        uint256 proj1;
        uint256 proj2;
        uint256 proj3;
    }
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
    
    event UserRegistered(
        uint256 userId,
        string userName,
        string userPwd,
        address payable walAdd
    );
    event BlockMined(
        uint256 blockId,
        bytes32 blockHash,
        bytes32 preHash
    );
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

    function addToChain() public{
        blockSize=0;
        bytes32 pre;
        if(blockCount>0) pre = chain[blockCount].blockHash;
        blockCount++;
        chain[blockCount].blockId = blockCount;
        chain[blockCount].proj1 = projBlock[1].projId;
        chain[blockCount].proj2 = projBlock[2].projId;
        chain[blockCount].proj3 = projBlock[3].projId;
        chain[blockCount].blockHash = keccak256(abi.encodePacked(projBlock[1].projHash,projBlock[2].projHash,projBlock[3].projHash));
        chain[blockCount].preHash = pre;
        projCount++;
        projects[projCount]=projBlock[1];
        projCount++;
        projects[projCount]=projBlock[2];
        projCount++;
        projects[projCount]=projBlock[3];
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
        if (blockSize > 0) prev = projBlock[blockSize].projHash;
        else if (projCount > 0) prev = projects[projCount].projHash;
        else prev = "genesis";

        blockSize++;
        projBlock[blockSize] = Project(
            projCount+blockSize,
            prev,
            _projHash,
            _projSize,
            _projType,
            _projName,
            _projDesc,
            now,
            msg.sender
        );
        if(blockSize>=3){
        addToChain();
        }
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
