import React, { Component } from 'react';
import {Card,CardTitle,CardBody,CardText} from 'reactstrap';

function CertificateComp ({art}){
    return (
        <Card >
            <div style={{ maxWidth: '100%'}}>
                <a href={`https://ipfs.io/ipfs/${art.ipfs_hash}`} target="_black" ><img src={`https://ipfs.io/ipfs/${art.ipfs_hash}`} style={{ maxWidth: '100%'}}/></a>
            </div>
            <CardBody>
                <CardTitle><small>Student ID : {art.stu_id}</small></CardTitle>
                <CardText><small>College Id : {art.college_id}</small></CardText>
                <CardText><small>Student Adhar no : {art.student_aadhar}</small></CardText>
                <CardText><small>Certificate Id : {art.cert_id}</small></CardText>
                <CardText><small>Certificate Name : {art.cert_name}</small></CardText>
                <CardText><small>IPFS Hash : {art.ipfs_hash}</small></CardText>
            </CardBody>
        </Card>
    );
}

class AllCertComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            art: [],
            title: ''
        };
    }

    render() {
        console.log(this.props.art);
        for(let i = 0;i<this.props.art?.length;i++){
            console.log(this.props.art[i]);
        }
        const Menu = this.props.art?.map((x) => {
            if(x.stu_id == this.props.matchId){
                return (
                    <div key={x.cert_id} className='col-4 col-md-3'>
                        <CertificateComp
                            art={x}
                            contract={this.props.contract}
                            accounts={this.props.accounts}
                        />
                        <br />
                        <br />
                    </div>
                );
            }
            else{
                return(<></>);
            }
        });

        return (
            <div className='container'>
                <h2>All Certficate</h2>
                <br />
                <br />
                <div className='row'>{Menu}</div>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default AllCertComp;
