package fi.tuni.olvander.notesapp;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The main starting class. Implements CommandLineRunner.
 *
 * @author  Olli Pertovaara
 * @version 2020.09.07
 * @since   1.8
 */
@SpringBootApplication
public class NotesappApplication implements CommandLineRunner {

	/**
	 * The main method. Starts the application.
	 * @param args	Command line arguments. Not used.
	 */
	public static void main(String[] args) {
		SpringApplication.run(NotesappApplication.class, args);
	}

	/**
	 * The run method that the CommandLineRunner interface includes.
	 * Prints logging information about curl commands.
	 *
	 * @param args			Command line arguments. Not used.
	 * @throws Exception	An exception that may be thrown.
	 */
	@Override
	public void run(String... args) throws Exception {
		Log log = LogFactory.getLog(NotesappApplication.class);
		log.info("");
		log.info("Curl commands to interact with NoteController REST api\n");
		log.info("Get all notes");
		log.info("curl -i -X GET http://localhost:8080/api/notes/");
		log.info("Get one note");
		log.info("curl -i -X GET http://localhost:8080/api/notes/1");
		log.info("Post a note");
		log.info("curl -i -X POST -H \"Content-Type: application/json\" -d \"{\\\"text\\\": \\\"type your note here\\\"}\" http://localhost:8080/api/notes/");
		log.info("Replace a note");
		log.info("curl -i -X PUT -H \"Content-Type: application/json\" -d \"{\\\"text\\\": \\\"edited note here\\\"}\" http://localhost:8080/api/notes/1");
		log.info("Delete a note");
		log.info("curl -i -X DELETE http://localhost:8080/api/notes/1");
	}
}
