package fi.tuni.olvander.notesapp.exceptions;

/**
 * When no notes exists in the H2 database, an instance of this class is created.
 *
 * @author  Olli Pertovaara
 * @version 2020.09.06
 * @since   1.8
 */
public class NoNotesExistException extends IllegalArgumentException {

    public NoNotesExistException() {

    }
}
