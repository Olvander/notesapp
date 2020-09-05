import React, {Component} from 'react';
import '../styles/AddNote.css';

class AddNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.manageSubmit = this.manageSubmit.bind(this);
        this.manageTextChange = this.manageTextChange.bind(this);
    }

    async manageSubmit(event) {
        event.preventDefault();
        if (this.state.text !== '') {
            const res = await fetch('/api/notes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'text': this.state.text})
            });
            const body = await res.json();
            this.props.setMainPage(body);
        }
    }

    manageTextChange(event) {
        event.preventDefault();
        this.setState({text: event.target.value});
    }

    render() {
        return (
            <div className="addNoteDiv">
                <form
                    name="addNoteForm"
                    onSubmit={this.manageSubmit}
                >
                    <textarea
                        className="addText"
                        name="addText"
                        placeholder="Type your note here..."
                        onChange={this.manageTextChange}
                    />
                    <br/>
                    <input
                        className="submitAddBtn"
                        name="submitBtn"
                        type="submit"
                        value="Add note"
                    />
                </form>
            </div>
        );
    }
}

export default AddNote;