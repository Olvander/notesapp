import React, {Component} from 'react';
import '../styles/EditNote.css';

class EditNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
        };

        this.manageSubmit = this.manageSubmit.bind(this);
        this.manageTextChange = this.manageTextChange.bind(this);
    }

    async manageSubmit(event) {
        event.preventDefault();
        if (this.state.text !== '') {
            const res = await fetch('http://localhost:8080/api/notes/' + this.props.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'text': this.state.text})
            });
            if (res.status !== 404) {
                const body = await res.json();
                await this.props.setMainPage(body);
            }
        }
    }

    manageTextChange(event) {
        event.preventDefault();
        this.setState({text: event.target.value});
    }

    render() {
        return (
            <div className="editNoteDiv">
                <form
                    name="editNoteForm"
                    onSubmit={this.manageSubmit}
                >
                    <textarea
                        className="editText"
                        name="editText"
                        placeholder="Type your note here..."
                        onChange={this.manageTextChange}
                        rows = "10"
                        cols = "25"
                        value={this.state.text}
                    />
                    <br/>
                    <input
                        className="submitEditBtn"
                        name="submitBtn"
                        type="submit"
                        value="Save Changes"
                    />
                </form>
            </div>
        );
    }
}

export default EditNote;