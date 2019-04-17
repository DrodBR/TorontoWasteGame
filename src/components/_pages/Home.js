import React, { Component } from 'react'
import FullLayout from '../_layouts/FullLayout'
import Navbar from '../_layouts/Navbar'
import Footer from '../_layouts/Footer'
import Title from '../_layouts/Title'
import Body from './TOWasteGame/Body'

class Home extends Component {
    render() {
        return(
            <div>
                <Title title="Toronto Waste Game"/>
                <Navbar />
                <FullLayout 
                    main={<Body />}
                />
                <Footer title1="Author" title2="Contact"/>
            </div>
        )
    }
}
export default Home