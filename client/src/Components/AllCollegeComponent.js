import React, { Component } from 'react';
import {Button,Form,FormGroup,Label,Input,Card,CardTitle,CardBody,CardText,Modal,ModalHeader,ModalBody} from 'reactstrap';

class SingleCllgComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            art: [],
            isModalOpen: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleRegister = this.toggleRegister.bind(this);
    }

    toggleRegister = async () => {
        let regStatus = !this.props.college.isregistered;
        const res = await this.props.contract.methods
        .registerCollege(
            this.props.college.clg_id,
            regStatus
        )
        .send({ from: this.props.accounts, gas: 1000000 });
        window.location.reload();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render () {  
        let isOwnerStyle = this.props.owner == this.props.accounts?'visible':'invisible';;
        let isRegisterStyle = this.props.college.isregistered?'Unregister':'register';
        return (
            <Card >
                <i className="fa fa-institution fa-4x"></i>
                <CardBody>
                    <CardTitle><small>College ID : {this.props.college.clg_id}</small></CardTitle>
                    <CardText><small>College Address : {this.props.college.clg_address}</small></CardText>
                    <CardText><small>College Name : {this.props.college.clg_name}</small></CardText>
                    <CardText><small>Registration Status : {this.props.college.isregistered?'True':'False'}</small></CardText>
                    <Button className={isOwnerStyle} type="submit" color="primary" onClick={this.toggleRegister}>
                        {isRegisterStyle}
                    </Button>
                </CardBody>
            </Card>
        );
    }
}

class  AllCllgComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            art: [],
            clgname: '',
            isModalOpen1: false,
            title: '',
            owner:''
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
        .addCollege(
            this.state.clgname
        )
        .send({ from: this.props.accounts, gas: 1000000 });
        console.log(res);
        console.log(this.state.clgname);
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
        var res = await this.props.contract?.methods.owner().call();
        console.log(res);
        this.setState({owner : res});
    }

    render() {
        const allColleges = this.props.colleges?.map((x) => {
            return (
                <div key={x.clg_id} className='col-4 col-md-3'>
                    <SingleCllgComp
                        college={x}
                        owner={this.state.owner}
                        contract={this.props.contract}
                        accounts={this.props.accounts}
                    />
                    <br />
                    <br />
                </div>
            );
        });

        return (
            <div className='container'>
                <h2>All Colleges</h2>
                <br/>
                <Button
                    color='success'
                    className='visible'
                    onClick={this.toggleModal1}>
                    Add College
                </Button>
                <Modal
                    isOpen={this.state.isModalOpen1}
                    toggle={this.toggleModal1}
                    className='modal-xl'>
                    <ModalHeader toggle={this.toggleModal1}>
                        <h3>Add College</h3>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className='row pl-5 pr-5'>
                                <div className='col-6'>
                                    <FormGroup>
                                        <Label htmlFor='title' className='ml-3'>
                                            College Name
                                        </Label>
                                        <Input
                                            type='text'
                                            id='clgname'
                                            name='clgname'
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
                <div className='row'>{allColleges}</div>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default AllCllgComponent;
