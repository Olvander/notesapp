import React, {Component} from 'react';
import Note from './Note';
import '../styles/SideBar.css';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: [],
            notes: [],
            lastNoteId: -1,
            firstNoteId: -1,
            loadComplete: false,
        };

        this.fetchNotes = this.fetchNotes.bind(this);
        this.lastOneLoaded = this.lastOneLoaded.bind(this);
        this.formatDateTime = this.formatDateTime.bind(this);

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.reloadNotes && !this.state.loadComplete ) {
            await this.fetchNotes();
            await this.updateSideBar();
        } else if (!this.props.reloadNotes && this.state.loadComplete) {
            await this.setState({loadComplete: false});
        }

    }

    async componentDidMount(props) {
        await this.fetchNotes();
    }

    async fetchNotes() {
        const res = await fetch('/api/notes');
        if (res.status !== 404) {
            const requestBody = await res.json();

            if (requestBody.length === 0) {
                if (this.state.notes.length !== 0) {
                    this.setState({
                        notes: [],
                    });
                    this.lastOneLoaded(true);
                }
            }
            else if (!this.state.loadComplete) {
                this.setState({
                    notes: requestBody,
                });
            }
        } else {
            await this.setState({
                lastNoteId: -1,
                firstNoteId: -1,
                notes: [],
            }, () => {
                this.lastOneLoaded(true);
                this.updateSideBar();});
        }
    }


    lastOneLoaded(b) {

        if (b) {
            this.setState({loadComplete: true});
            this.props.notesHaveLoaded(true, this.state.firstNoteId);
        } else {
            this.props.notesHaveLoaded(false, this.state.firstNoteId);
            this.updateSideBar();
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

    async updateSideBar() {
        this.setState({
            map: await this.state.notes.map(note => {
                    const noteX = note;
                    return (
                        <li key={noteX.id} onClick={() => this.props.noteClicked(noteX.id)}
                        >
                            <Note
                                id={noteX.id}
                                date={this.formatDateTime(noteX.date)}
                                text={noteX.text}
                            />
                            <br/>
                        </li>)
                }
            )
        }, () => {
            if (this.state.map.length > 0) {
                this.setState({
                    lastNoteId: this.state.map[this.state.map.length - 1].id,
                    firstNoteId: this.state.map[0].id,
                }, () => this.lastOneLoaded(true));
            }
        });
    }

    render() {
        if (this.state.map) {
            return (
                <div className="sideBarDiv">
                    <nav className="sideBarNav">
                        <ul>
                            {this.state.map}
                        </ul>
                    </nav>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default SideBar;