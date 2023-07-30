import React, { Component } from "react";
import BNContract from "../contracts/Certificates.json";
import getWeb3 from "../getWeb3";
import "../App.css";
import Header from "./HeaderComponent";
import Home from './HomeComponent';
import AllCllgComponent  from "./AllCollegeComponent";
import { Switch, Route, Redirect } from 'react-router-dom';
import Footer from './FooterComponent';
import AllCertComp from './CardDetail';
import AllStuComponent from './AllStudentComponent';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      web3: null, 
      accounts: null,
      balance: 0, 
      contract: null,
      res: null,
      allColleges: null,
      stu: null,
      allce : null, 
      singlecoll:null,
      singlecolid : null
    };
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BNContract.networks[networkId];
      const instance = new web3.eth.Contract(
        BNContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      console.log(instance)
      this.setState({ 
        web3, 
        accounts: accounts[0],
        contract: instance,
        balance,
        current : null
      });
      
      var resCollegeCnt = await this.state.contract?.methods.collegecnt().call();
      console.log(resCollegeCnt);
      var collegesAcc= [];
      for(var i=1; i<=resCollegeCnt; i++) {
        var resSingleAcc = await this.state.contract?.methods.colId(i).call();
        collegesAcc.push(resSingleAcc);
      }
      console.log(collegesAcc);
      let allColleges = [];
      for(var j=0; j<collegesAcc.length; j++){
        var resSingleClg = await this.state.contract.methods.colleges(collegesAcc[j]).call();
        allColleges.push(resSingleClg); 
      }
      console.log(allColleges);
      this.setState({allColleges : allColleges});
      allColleges.map((clg) => {
        if(clg.clg_address == this.state.accounts){
          this.setState({current : clg.clg_id});
        } 
      })

      var resStudentCnt = await this.state.contract?.methods.studentcnt().call();
      console.log(resStudentCnt);
      var studentAadhars= [];
      for(var i=1; i<=resStudentCnt; i++){
        var resStuAadhar = await this.state.contract?.methods.stuId(i).call();
        studentAadhars.push(resStuAadhar);
      }
      console.log(studentAadhars);
      let allStudents = [];
      for(var j=0; j<studentAadhars.length; j++){
        var student = await this.state.contract.methods.students(studentAadhars[j]).call();
        allStudents.push(student);
      }
      console.log(this.state.current);
      var resCertCnt = await this.state.contract?.methods.certificatecnt().call();
      console.log(resCertCnt);       
      var allCertificates = [];
      for(var i=1; i<=resCertCnt; i++){
        var resCertificate = await this.state.contract?.methods.certy(i).call();
        allCertificates.push(resCertificate);
      }
      this.setState({ stu: allStudents, allce: allCertificates});
      let singleClg = await this.state.allColleges.filter(clg => clg.clg_id == this.state.current);
      this.setState({singlecoll: singleClg[0].isregistered})
      this.setState({singlecolid: singleClg[0].clg_id})
      console.log("singlecoll", this.state.singlecoll);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const CardWithId = ({ match }) => {
      return (
        <AllCertComp
          art={this.state.allce}
          allcert = {this.state.allce}
          contract={this.state.contract} 
          accounts={this.state.accounts} 
          matchId={match.params.id}
        />
      );
    };

    return (
      <div className="App">
        <Header contract={this.state.contract} accounts={this.state.accounts} registered = {this.state.registered} balance={this.state.balance} web3={this.state.web3}/>
        <Switch>
            <Route exact path="/home" component={() => <Home/>}/>
            <Route exact path='/allclg' component={() => (< AllCllgComponent colleges = {this.state.allColleges} contract={this.state.contract} accounts={this.state.accounts}/>)}/>
            <Route exact path='/mystu' component={() => (< AllStuComponent dish = {this.state.allColleges} art = {this.state.stu} current = {this.state.current} isRegistered = {this.state.singlecoll} singlecolId = {this.state.singlecolid} contract={this.state.contract} accounts={this.state.accounts}/>)}/>
            <Route path='/card/:id' component={CardWithId} />
            <Redirect to="/home"/>
        </Switch>
        <Footer/>
      </div>
    )
  }
}

export default Main;