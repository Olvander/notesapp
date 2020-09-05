import React, {Component} from "react";
import '../styles/Note.css';

class Note extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="noteDiv">
                <div className="noteText">
                    {this.props.text}
                </div>
                <div className="noteDate">
                    {this.props.date}
                </div>
            </div>
        );
    }
}

export default Note;