import React, {Component} from 'react';
import '../styles/DisplayOneNote.css';

class DisplayOneNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            note: {},
            props: this.props,
            display: true
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.display && this.props.id > 0) {
            this.fetchNote();
        }

        if (this.props.clear && this.state.note !== '') {
            await this.setState( {
                note: '',
            });
        }
    }

    async componentDidMount(props) {
        if (this.props.display && this.props.id > 0) {
            this.fetchNote();
        }
    }

    async fetchNote() {
        const id = this.props.id;

        const res = await fetch('/api/notes/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status !== 404) {
            const body = await res.json();
            body.date = this.formatDateTime(body.date);

            if (body.text !== undefined && body.text.length > 0) {
                if (this.state.note.id !== body.id) {
                    await this.setState({note: body});
                }
            }
        }
    }

    formatDateTime(date) {
        var dateTime =  Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        }).format(Date.parse(date));

        return dateTime;
    }

    render() {
        if (!this.props.clear) {
            return (
                <div className="displayOneNoteDiv">
                    <div className="oneNoteContainer">
                        <div className="displayTextDiv">
                            <div className="displayOneNoteContainer">
                                <div className="textOfOneNoteDiv">
                                    {this.state.note.text}
                                </div>
                            </div>
                        </div>
                        <div className="dateOfOneNoteDiv">
                            {this.state.note.date ? 'Updated: ' : ''}
                            {this.state.note.date}
                        </div>
                    </div>
                </div>
            );
        } else {
            return '';
        }
    }
}

export default DisplayOneNote;