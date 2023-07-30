pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";

contract Certificates {
    
    uint256 public collegecnt = 0;
    uint256 public studentcnt = 0;
    uint256 public certificatecnt = 0;
    address public owner;

    constructor(){
        owner = msg.sender;
    }
    
    event clgAdded(uint indexed clg_id,string clg_name,uint times);
    event clgRegistered(uint indexed clg_id,bool isReg,uint times);
    event stuAdded(uint indexed stu_id,uint indexed aadhar,string stu_name,uint indexed clg_id,uint times);
    event certAdded(uint indexed cert_id,uint indexed clg_id,uint indexed stu_id,uint times);
    
    struct College{
        uint clg_id;
        address clg_address;
        string clg_name;
        bool isregistered;
        uint[] clg_student;
    }
    
    struct Cert{
        uint cert_id;
        uint college_id;
        uint stu_id;
        string cert_name;
        uint student_aadhar;
        string ipfs_hash;
        uint time;
    }
    
    struct Student{
        uint stu_aadhar_no;
        uint stu_id;
        string stu_name;
        uint cllg_id;
        uint certcount;
        uint[] certs;
    } 
    
    mapping(address=>College) public colleges;
    mapping(uint=>address) public colId;
    
    mapping(uint=>Student) public students;
    mapping(uint=>uint) public stuId;
    
    mapping(uint => Cert) public certy;
    
    
    modifier onlyRegisteredCollege(address _addr){
        require(colleges[_addr].isregistered == true,"Not registered");
        _;
    } 
    
    modifier uniqueclg(address _addr){
        bool unique = true;
        for(uint i=1;i<=collegecnt;i++){
            if(colId[i] == _addr){
                unique = false;
                break;
            }
        
        }
        require(unique == true,"already exists");
        _;
        
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    
    modifier uniquestudent(uint _aadhar){
        bool unique = true;
        for(uint i=1;i<=studentcnt;i++){
            if(stuId[i] == _aadhar){
                unique = false;
                break;
            }
        
        }
        require(unique == true,"already exists");
        _;
        
    }
    
    function addCollege(string memory _clg_name)public uniqueclg(msg.sender){
        collegecnt++;
        colId[collegecnt] = msg.sender;
        College memory newCollege;
        newCollege.clg_id = collegecnt;
        newCollege.clg_name = _clg_name;
        newCollege.clg_address = msg.sender;
        newCollege.isregistered = false;
        colleges[msg.sender] = newCollege;
        emit clgAdded(collegecnt, _clg_name, block.timestamp);    
    }
    
    function registerCollege(uint _clg_id,bool _reg)public onlyOwner{
       colleges[colId[_clg_id]].isregistered = _reg;
       emit clgRegistered(_clg_id, _reg, block.timestamp);
    }
    
    function addStudent(uint _cllg_id,uint _aadhar,string memory _name)public onlyRegisteredCollege(msg.sender) uniquestudent(_aadhar){
        studentcnt++;
        stuId[studentcnt]= _aadhar;
        Student memory newStudent;
        newStudent.stu_aadhar_no = _aadhar;
        newStudent.stu_name = _name;
        newStudent.stu_id = studentcnt;
        newStudent.cllg_id = _cllg_id;
        newStudent.certcount = 0;
        students[_aadhar] = newStudent;
        colleges[msg.sender].clg_student.push(studentcnt);
        emit stuAdded(studentcnt, _aadhar,_name, _cllg_id, block.timestamp);
    }
    
    function addCertificate(uint _cllg_id,uint _stu_id,uint _studentaadhar,string memory _hash,string memory _name)public{ 
        certificatecnt++;
        Cert memory newCert;
        newCert.cert_id = certificatecnt;
        newCert.stu_id = _stu_id;
        newCert.college_id = _cllg_id;
        newCert.cert_name = _name;
        newCert.student_aadhar = _studentaadhar;
        newCert.ipfs_hash = _hash;
        newCert.time = block.timestamp;
        certy[certificatecnt] = newCert;
        students[_studentaadhar].certs.push(certificatecnt);
        students[_studentaadhar].certcount++;
        emit certAdded(certificatecnt, _cllg_id, _stu_id, block.timestamp);
        
    }
    
    function getClgStu(address _addr) public view returns(uint[] memory){
        return colleges[_addr].clg_student;
    }
    
    function getStuCert(uint _aadhar) public view returns(uint[] memory){
        return students[_aadhar].certs;
    } 
}
