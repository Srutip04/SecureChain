import React, { Component } from 'react';
import '../App.css';
import homeimg from "../assets/3950094.jpg"
import { Container} from 'reactstrap';


function Home() {
    return (
        <>
            <div>
                <Container>
                    <h1>Welcome to Securechain</h1>
                    <div>
                        <img src={homeimg} style={{width: "75%"}}/>
                    </div>
                </Container>
            </div>
        </>
    );
}


export default Home;
