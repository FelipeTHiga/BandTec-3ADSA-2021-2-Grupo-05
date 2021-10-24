package section.controller.form;

public class LoginForm {
    //region Attributes
    private String login;
    private String password;
    //endregion

    //region Constructor
    public LoginForm(String login, String password) {
        this.login = login;
        this.password = password;
    }
    //endregion

    //region Getters and Setters
    public String getLogin() {
        return login;
    }
    public String getPassword() {
        return password;
    }
    //endregion
}
