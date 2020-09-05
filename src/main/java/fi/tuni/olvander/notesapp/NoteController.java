package fi.tuni.olvander.notesapp;

import fi.tuni.olvander.notesapp.exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class NoteController {

    /**
     * A NoteRepository instance to manage the database.
     */
    @Autowired
    private NoteRepository noteRepository;

    /**
     * A request mapping for GET method to fetch all the notes in the H2 database.
     *
     * @return  An exception or a response entity with the fetched Iterable notes.
     * @throws IllegalArgumentException A NoNotesExistException.
     */
    @RequestMapping(value = "/api/notes", method = RequestMethod.GET)
    synchronized public ResponseEntity<Optional<Iterable<Note>>> getAllNotes() throws IllegalArgumentException {

        List<Note> notes = (ArrayList<Note>) noteRepository.findAllByOrderByDateDesc();
        if (notes.size() > 0) {
            return new ResponseEntity<>(Optional.of(notes), HttpStatus.OK);
        } else {
            throw new NoNotesExistException();
        }
    }

    /**
     * A request mapping for GET request methods for getting a note specified by an id.
     *
     * @param id    The id of the note to be fetched.
     * @return      An exception or a response entity with an error message or the found note.
     * @throws IllegalArgumentException A CouldNotFindNoteException.
     */
    @RequestMapping(value = "/api/notes/{id}", method = RequestMethod.GET)
    synchronized public ResponseEntity<Optional<Note>> getOneNote(@PathVariable Long id) throws IllegalArgumentException {
        if (noteRepository.findById(id).isPresent()) {
            return new ResponseEntity<>(noteRepository.findById(id), HttpStatus.OK);
        } else {
            throw new CouldNotFindNoteException(id);
        }
    }

    /**
     * Saves a new note on HTTP POST request.
     * @param note      The note to be added to database.
     * @param builder   A UriComponentsBuilder object.
     * @return          A ResponseEntity which always returns a note object and 201 Status code.
     */
    @RequestMapping(value = "/api/notes/", method = RequestMethod.POST)
    synchronized public ResponseEntity<Note> addNote(@RequestBody Note note, UriComponentsBuilder builder) {
        note.setDate(new Date());
        noteRepository.save(note);

        UriComponents uriComponents = builder
                .path("/api/notes/{id}")
                .buildAndExpand(note.getID());

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(uriComponents.toUri());

        return new ResponseEntity<>(note, headers, HttpStatus.CREATED);
    }

    /**
     * Replaces a note object in the database if finds the id.
     *
     * @param id    The id of the note to be replaced.
     * @param note  The note to be saved.
     * @return      A response entity of an optional note or error message.
     * @throws IllegalArgumentException A CouldNotFindNoteException.
     */
    @RequestMapping(value = "/api/notes/{id}", method = RequestMethod.PUT)
    synchronized ResponseEntity<Optional<Note>> modifyNote(@PathVariable Long id, @RequestBody Note note) throws
            IllegalArgumentException {

        if (noteRepository.findById(id).isPresent()) {
            Note noteToModify = noteRepository.findById(id).get();
            noteToModify.setDate(new Date());
            noteToModify.setText(note.getText());
            noteRepository.save(noteToModify);
            return new ResponseEntity<>(Optional.of(noteToModify), HttpStatus.OK);
        } else {
            throw new CouldNotFindNoteException(id);
        }
    }

    /**
     * Mapping for the delete request method. Deletes a note if id is found.
     *
     * @param id    The id of the note to delete.
     * @return      A ResponseEntity with no content or error message.
     * @throws IllegalArgumentException A CouldNotFindNoteException
     */
    @RequestMapping(value = "/api/notes/{id}", method = RequestMethod.DELETE)
    synchronized public ResponseEntity<Void> deleteNote(@PathVariable Long id) throws IllegalArgumentException {
        if (noteRepository.findById(id).isPresent()) {
            noteRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            throw new CouldNotFindNoteException(id);
        }
    }
}