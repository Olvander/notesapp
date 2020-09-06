package fi.tuni.olvander.notesapp;

import fi.tuni.olvander.notesapp.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Class for handling response entity exceptions.
 *
 * @author  Olli Pertovaara
 * @version 2020.09.06
 * @since   1.8
 */
@ControllerAdvice
public class ResponseEntityExceptionHandler {

    /**
     * Handles conflicts arising from not finding a note.
     * Returns a message and the id of the note from a CouldNotFindNoteException instance.
     *
     * @param ex    The exception class instance.
     * @return      An ErrorInfo response entity and a 404 status code.
     */
    @ExceptionHandler(CouldNotFindNoteException.class)
    public ResponseEntity<ErrorInfo> handleConflict(CouldNotFindNoteException ex) {
        ErrorInfo e = new ErrorInfo("Could not find note with the id " + ex.getNoteId());
        return new ResponseEntity<>(e, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles conflicts arising from not finding any notes in the database.
     * Returns a 404 status code and an error message.
     *
     * @param ex    The NoNotesExistException instance
     * @return      A Response Entity containing an error message.
     */
    @ExceptionHandler(NoNotesExistException.class)
    public ResponseEntity<ErrorInfo> handleConflict(NoNotesExistException ex) {
        ErrorInfo e = new ErrorInfo("No notes exist yet");
        return new ResponseEntity<>(e, HttpStatus.NOT_FOUND);
    }
}
