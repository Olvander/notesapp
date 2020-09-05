package fi.tuni.olvander.notesapp.exceptions;

/**
 * When no notes exists in the H2 database, an instance of this class is created.
 */
public class NoNotesExistException extends IllegalArgumentException {

    public NoNotesExistException() {

    }
}
