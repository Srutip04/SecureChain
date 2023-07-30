import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Web3 from "web3";
import '../App.css'

class Header extends Component{
    constructor(props){
        super(props);
        this.state = { isNavOpen : false }
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav(){
        this.setState({isNavOpen : !this.state.isNavOpen});
    }

    render(){
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container justify-center">
                        <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className="mr-auto" >CERTICHAIN</NavbarBrand>
                        <Collapse isOpen = {this.state.isNavOpen} navbar>
                            <Nav navbar className="m-auto"> 
                                <NavItem>
                                    <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/home">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/allclg">All Colleges</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" style={{width:200,justifyContent:'space-around'}} to="/mystu">My Student</NavLink>
                                </NavItem> 
                            </Nav>    
                        </Collapse>
                    </div>
                    <h6 style={{ color: "white"}}><small>{this.props.accounts}</small>
                    <br/><small>Balance : {Web3.utils.fromWei(this.props.balance.toString(), 'ether')}</small></h6>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default Header;