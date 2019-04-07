import React, { Component } from 'react'
import FullLayout from '../_layouts/FullLayout'
import Navbar from '../_layouts/Navbar'
import Footer from '../_layouts/Footer'
import Title from '../_layouts/Title'
import TOWasteGameBody from './TOWasteGame/TOWasteGameBody'

class Home extends Component {
    render() {
        return(
            <div>
                <Title title="Toronto Waste Game"/>
                <Navbar />
                <FullLayout 
                    main={<TOWasteGameBody />}
                />
                <Footer />
            </div>
        )
    }
}
export default Home