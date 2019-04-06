import React, { Component } from 'react'
 
class Title extends Component {
 
    componentDidMount() {
        var titlePrefix = "Daniel R. | "
        document.title = titlePrefix + this.props.title
    }
 
    render() {
        return(
        <div>
        </div>)
    }
}
export default Title