package fi.tuni.olvander.notesapp;

import org.springframework.data.repository.CrudRepository;

/**
 * A NoteRepository interface used for managing the H2 database.
 *
 * @author  Olli Pertovaara
 * @version 2020.09.06
 * @since   1.8
 */
public interface NoteRepository extends CrudRepository<Note, Long> {
    Iterable<Note> findAllByOrderByDateDesc();
}
