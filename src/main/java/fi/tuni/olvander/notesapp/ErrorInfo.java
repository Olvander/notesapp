package fi.tuni.olvander.notesapp;

/**
 * An ErrorInfo class for printing custom error messages in REST responses.
 */
public class ErrorInfo {

    private String errorMessage;

    public ErrorInfo() {}

    public ErrorInfo(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
