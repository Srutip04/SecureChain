import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button,Form,FormGroup,Label,Input,Col,Card,CardImg,CardTitle,CardBody,CardText,Modal,ModalHeader,ModalBody} from 'reactstrap';
import pinataSDK from "@pinata/sdk";
import Axios from 'axios';
import Web3 from 'web3';
let x;

const REACT_APP_PINATA_API_KEY = "4e974bf92628a2a22d81";
const REACT_APP_PINATA_API_SECRET =
  "b174f7aeb7aeb0cf7e98d5f23ccd2045bf69321216e6e9a7fefc721c94ecfde9";
class StuRender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            art: [],
            isModalOpen: false,
            clgid: 0,
            certname: '',
            stuadd: 0,
            certhash: '',
            loading: '',
            buffer: null,
            singlecol: 0,
            clid: 0
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.uploadImage = this.uploadImage.bind(this)
        this.captureFile = this.captureFile.bind(this)
    }

    async componentDidMount() {
        let sinColId = await this.props.singlecolId;
        let clgId = await this.props.art.cllg_id ;
        this.setState({singlecol: sinColId, clid: clgId});
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    captureFile = event => {
        event.preventDefault()
        const file = event.target.files[0]
        this.setState({ buffer: file });
    }
    
    uploadImage = async () => {
        console.log("Submitting file to ipfs...")
        //adding file to the IPFS
        //console.log(this.state.buffer);
        try {
            const formData = new FormData();
            formData.append("file", this.state.buffer);
      
            const resFile = await Axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                pinata_api_key: REACT_APP_PINATA_API_KEY,
                pinata_secret_api_key: REACT_APP_PINATA_API_SECRET,
                "Content-Type": "multipart/form-data",
              },
            });
            console.log(resFile);
            //this.creatingItems(resFile.data.IpfsHash);
            const res = await this.props.contract.methods.addCertificate(
                this.props.current,
                this.props.art.stu_id,
                this.props.art.stu_aadhar_no,
                resFile.data.IpfsHash,
                this.state.certname
            ).send({ from: this.props.accounts, gas: 1000000 })
            this.setState({ loading: false })
            this.toggleModal();
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
      
    render() {
        let xyz = ((this.props.show == this.props.art.stu_aadhar_no) && (this.props.singlecolID != this.state.clid) ? 'invisible':'visible');
        let bux = this.props.show != 0? (this.props.show == this.props.art.stu_aadhar_no ? 'visible':'invisible') : 'visible';
        x = this.props.show != 0? (this.props.show == this.props.art.stu_aadhar_no ? '':'none') : '';
        let butname = 'Add Certficate';
        return (
            <Card className={bux} style={{display : `${x}`}}>
                <Link to={`/card/${this.props.art.stu_id}`}>
                    <i className="fa fa-user-circle-o fa-4x"></i>
                </Link>
                <CardBody>
                    <CardTitle><small>Student ID : {this.props.art.stu_id}</small></CardTitle>
                    <CardText><small>Student Adhar no : {this.props.art.stu_aadhar_no}</small></CardText>
                    <CardText><small>Student Name : {this.props.art.stu_name}</small></CardText>
                    <CardText><small>College Id : {this.props.art.cllg_id}</small></CardText>
                    <CardText><small>Certificate Count : {this.props.art.certcount}</small></CardText>
                    <Button className={xyz} type="submit" color="primary" onClick={this.toggleModal}>
                        {butname}
                    </Button>
                    <Modal
                        isOpen={this.state.isModalOpen}
                        toggle={this.toggleModal}
                        className='modal-xl'>
                        <ModalHeader toggle={this.toggleModal}>
                            <h3>Add Certificate</h3>
                        </ModalHeader>
                        <ModalBody>
                            <Form>
                                <div className='row pl-5 pr-5'>
                                    <div className='col-6'>
                                        <FormGroup>
                                            <Label htmlFor='title' className='ml-3'>
                                                Certificate Name
                                            </Label>
                                            <Input
                                                type='text'
                                                id='certname'
                                                name='certname'
                                                onChange={this.handleInputChange}
                                            />
                                        </FormGroup>
                                    </div>
                                    <div className='col-6'>
                                        <FormGroup>
                                            <Label htmlFor='fileupload' className='ml-3'>
                                                    Certificate Upload
                                                </Label>
                                            <Input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" name = "fileupload" onChange={this.captureFile} />
                                        </FormGroup>
                                    </div>
                                </div>
                                <br />
                                <br/>
                                <div className='row pl-5'>
                                    <div className='col-6'>
                                        <Button
                                            color='primary'
                                            onClick={this.uploadImage}
                                            >
                                            Add
                                        </Button>
                                    </div>
                                </div>
                                <br />
                            </Form>
                        </ModalBody>
                    </Modal>
                </CardBody>
            </Card>
        );
    }
}

class AllStuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            art: [],
            isModalOpen1: false,
            title: '',
            stuname : '',
            stuadd : '',
            current: 0 ,
            reg: null,
            show:0,
            clgaddr : null,
            bul : 0  ,
            singlecol:0
        };
        this.toggleModal1 = this.toggleModal1.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.creatingItems = this.creatingItems.bind(this);
    }

    toggleModal1() {
        this.setState({
            isModalOpen1: !this.state.isModalOpen1
        });
    }

    creatingItems = async () => {
        const res = await this.props.contract.methods
            .addStudent(
                this.state.current,
                this.state.stuadd,
                this.state.stuname
            )
            .send({ from: this.props.accounts, gas: 1000000 });
        this.toggleModal1();
        window.location.reload();
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    async componentDidMount() {
        this.setState({current: this.props.current, art: this.props.art, reg: this.props.isRegistered});
        var currentClgId = this.props.current == null ? 0 : this.props.current;
        var resCurrentClgAddr = await this.props.contract?.methods.colId(currentClgId).call();
        if(resCurrentClgAddr == this.props.accounts){ 
            this.setState({clgaddr : true})
            this.setState({singlecol : this.props?.singlecolId});
        }
    }

    render() {
        const Menu = this.state.art?.map((x) => {
            if(x.cllg_id == this.state.current){
                return (
                    <div key={x.cllg_id} className='col-4 col-md-3'>
                        <StuRender
                            art={x}
                            current={this.state.current}
                            show = {this.state.show}
                            contract={this.props.contract}
                            accounts={this.props.accounts}
                            clgaddr = {this.state.clgaddr}
                            singlecolID = {this.state.singlecol}
                        />
                        <br />
                        <br />
                    </div>
                );
            }
            else if(this.state.bul == 1){
                return (
                    <div key={x} className='col-4 col-md-3'>
                        <StuRender
                            art={x}
                            current={this.state.current}
                            dish={this.props.dish}
                            show = {this.state.show}
                            contract={this.props.contract}
                            accounts={this.props.accounts}
                            clgaddr = {this.state.clgaddr}
                            singlecolID = {this.state.singlecol}
                        />
                        <br />
                        <br />
                    </div>
                );
            }
        });
        let registeredStyle = this.state.reg? 'visible':'invisible';
        return (
            <div className='container'>
                <h2>My Students</h2>
                <Button
                    color='success'
                    className={registeredStyle}
                    onClick={this.toggleModal1}>
                    Add Student
                </Button>
                <Form onSubmit={(event) => {
                    event.preventDefault()
                    const aadharno = this.searchAadhar.value
                    this.setState({show : aadharno,bul : 1});
                }}>
                    <div className="form-group mr-sm-2">
                        <br></br>
                        <h4>Search By Aadhar</h4>
                        <input
                            id="searchAadhar"
                            type="text"
                            ref={(input) => { this.searchAadhar = input }}
                            className="form-control"
                            placeholder="Aadhar No."
                            required
                        />
                    </div>
                    <Button type="submit" className="btn btn-primary btn-block btn-lg">Search</Button>
                </Form>

                <Modal
                    isOpen={this.state.isModalOpen1}
                    toggle={this.toggleModal1}
                    className='modal-xl'>
                    <ModalHeader toggle={this.toggleModal1}>
                        <h3>Add Student</h3>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className='row pl-5 pr-5'>
                                <div className='col-3'>
                                    <FormGroup>
                                        <Label htmlFor='title' className='ml-3'>
                                             Student Aadhar
                                        </Label>
                                        <Input
                                            type='number'
                                            id='stuadd'
                                            name='stuadd'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label htmlFor='title' className='ml-3'>
                                             Student Name
                                        </Label>
                                        <Input
                                            type='text'
                                            id='stuname'
                                            name='stuname'
                                            onChange={this.handleInputChange}
                                        />
                                    </FormGroup>
                                </div>
                            </div>
                            <br />
                            <div className='row pl-5'>
                                <div className='col-6'>
                                    <Button
                                        color='primary'
                                        onClick={this.creatingItems}
                                        >
                                        Add
                                    </Button>
                                </div>
                            </div>
                            <br />
                        </Form>
                    </ModalBody>
                </Modal>
                <br />
                <br />
                <div className='row'>{Menu}</div>
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default AllStuComponent;
