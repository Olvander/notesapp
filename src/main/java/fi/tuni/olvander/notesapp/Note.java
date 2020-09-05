package fi.tuni.olvander.notesapp;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

/**
 * A POJO class for Note objects to be managed in the H2 database.
 */
@Entity
@Table
public class Note {
    @Id
    @GeneratedValue
    private Long ID;
    private Date date;
    @Type(type = "text")
    private String text;

    public Note() {}

    public Note(String text) {
        this.text = text;
    }

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return "Note{" +
                "ID=" + ID +
                ", date=" + date +
                ", text='" + text + '\'' +
                '}';
    }
}
