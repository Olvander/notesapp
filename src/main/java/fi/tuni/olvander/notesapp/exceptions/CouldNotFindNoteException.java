package fi.tuni.olvander.notesapp.exceptions;

/**
 * An instance of this class is created when a note cannot be found with an id.
 *
 * @author  Olli Pertovaara
 * @version 2020.09.06
 * @since   1.8
 */
public class CouldNotFindNoteException extends IllegalArgumentException {

    private Long noteId;

    public CouldNotFindNoteException(Long id) {
        noteId = id;
    }

    public Long getNoteId() {
        return noteId;
    }
}
