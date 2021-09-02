package section.model;

import java.util.concurrent.ThreadLocalRandom;

public class User {
    //region Attributes
    private Integer id;
    private String name;
    private String email;
    private String login;
    private String password;
    private Boolean authenticated;
    //endregion

    //region Constructor
    public User(String name, String email, String login, String password) {
        this.id = ThreadLocalRandom.current().nextInt(0,100);
        this.name = name;
        this.email = email;
        this.login = login;
        this.password = password;
        this.authenticated = false;
    }
    //endregion

    //region Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String password() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(Boolean autenticated) {
        this.authenticated = autenticated;
    }
    //endregion
}
