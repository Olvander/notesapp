import React, {Component} from 'react';
import '../styles/App.css';
import TopNav from './TopNav';
import SideBar from './SideBar';
import DisplayOneNote from './DisplayOneNote';
import AddNote from "./AddNote";
import EditNote from './EditNote';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOneNote: false,
      currentNoteId: -1,
      reloadNotes: false,
    };

    this.notesHaveLoaded = this.notesHaveLoaded.bind(this);
    this.displayNote = this.displayNote.bind(this);
    this.setMainPageWithNote = this.setMainPageWithNote.bind(this);
  }

  async componentDidMount() {
    this.setState({reloadNotes: true});
  }

  notesHaveLoaded(b, noteId) {
    if (noteId !== undefined) {
      this.setState({
        currentNoteId: noteId,
      });
    }
    this.setState({
      reloadNotes: !b,
      currentPage: noteId <= 0 ? '' : <DisplayOneNote clear={!b}
                                                      id={noteId}
                                                      display={true}/>,
    });
  }

  displayNote(noteId) {
    this.setState({
      currentPage: <DisplayOneNote   clear={false}
                                     id={noteId}
                                     display={true}/>,
    });
    if (noteId !== undefined) {
      this.setState({
        currentNoteId: noteId,
      });
    }
  }

  async editNote(id) {
    const res = await fetch('/api/notes/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const body = await res.json();
    this.setState({currentPage: <EditNote id={id}
                                          text={body.text}
                                          setMainPage={(note) => this.setMainPageWithNote(note)}/>});
  }

  async removeNote(id) {
    const response = await fetch('/api/notes/' + id, {
      method: 'DELETE',
    });
    return response.status;
  }

  async setMainPageWithNote(note) {
    if (note.id !== undefined) {
      await this.setState({
        currentNoteId: note.id
      });
      await this.notesHaveLoaded(false, note.id);
    }
  }

  async topNavClicked(item) {
    if (item === "Add a Note") {
      this.setState({
        currentPage: <AddNote setMainPage={(note) => this.setMainPageWithNote(note)}/>
      });
    } else if (item === "Remove Note") {
      if (this.state.currentNoteId !== undefined) {
        const statusCode = await this.removeNote(this.state.currentNoteId);

        if (statusCode === 404) {
        } else {
          let noteId = this.state.currentNoteId;
          await this.notesHaveLoaded(false, noteId);
        }
      }

    } else if (item === "Edit Note") {
      if (this.state.currentNoteId !== -1 && this.state.currentNoteId !== undefined) {
        await this.editNote(this.state.currentNoteId);
      }
    }
  }

  render() {
    return (
        <div className="App">
          <TopNav onClick={ (item) => this.topNavClicked(item)}
                  clickedNoteId={this.state.currentNoteId}/>
          <div className="middleDiv">
            <SideBar reloadNotes={this.state.reloadNotes}
                     notesHaveLoaded={(b, noteId) => this.notesHaveLoaded(b, noteId)}
                     noteClicked={ (note) => this.displayNote(note)}/>
            <div className="currentPageDiv">
              <div className="currentPageContainer">
                {this.state.currentPage}
              </div>
            </div>
          </div>
          <div className="bottomPageContainer">

          </div>
        </div>
    );
  }
}

export default App;