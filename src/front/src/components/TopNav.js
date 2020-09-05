import React, {Component} from "react";
import '../styles/TopNav.css';

class TopNav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clickedNoteId: props.clickedNoteId
        };

        this.addNoteClicked = this.addNoteClicked.bind(this);
        this.removeNoteClicked = this.removeNoteClicked.bind(this);
        this.editNoteClicked = this.editNoteClicked.bind(this);
    }

    componentDidMount() {
        this.setState({
            clickedNoteId: this.props.clickedNoteId
        });
    }

    async shouldComponentUpdate(nextProps, nextState, nextContext) {

        if (this.state.clickedNoteId !== nextProps.clickedNoteId) {
            if (nextProps.clickedNoteId !== undefined && nextProps.clickedNoteId > 0) {
                await this.setState({
                    clickedNoteId: nextProps.clickedNoteId
                });
                return true;
            }
        }
        return false;
    }

    addNoteClicked(e) {
        this.props.onClick("Add a Note");
    }

    removeNoteClicked(e) {
        if (this.state.clickedNoteId > 0) {
            this.props.onClick("Remove Note");
        }
    }

    editNoteClicked(e) {
        if (this.state.clickedNoteId > 0) {
            this.props.onClick("Edit Note");
        }
    }

    render() {
        return (
            <div className="topNavDiv">
                <div className="topNavContainer">
                    <div>
                        <button
                            onClick={this.addNoteClicked}
                            name="addBtn"
                            className="addNoteBtn"
                        >Add a Note</button>
                    </div>

                    <div>
                        <button
                            className="removeBtn"
                            onClick={this.removeNoteClicked}

                        >Remove Note</button>
                    </div>

                    <div>
                        <button
                            className="editBtn"
                            onClick={this.editNoteClicked}
                        >Edit Note</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TopNav;