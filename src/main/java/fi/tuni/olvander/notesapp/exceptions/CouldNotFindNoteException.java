package fi.tuni.olvander.notesapp.exceptions;

/**
 * An instance of this class is created when a note cannot be found with an id.
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
