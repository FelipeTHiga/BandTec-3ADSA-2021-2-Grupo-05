package section.model;

import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;

public class User {
    //region Attributes
    private Integer id;
    private String name;
    private String rg;
    private String cpf;
    private String phone;
    private String email;
    private String login;
    private String password;
    private Boolean isSeller;
    private Boolean authenticated;
    private String authenticatedIn;
    //endregion

    //region Constructor
    public User(String name, String rg, String cpf, String phone, String email, String login, String password) {
        this.id = ThreadLocalRandom.current().nextInt(0,100);
        this.name = name;
        this.rg = rg;
        this.cpf = cpf;
        this.phone = phone;
        this.name = phone;
        this.email = email;
        this.login = login;
        this.password = password;
        this.authenticated = false;
        this.authenticatedIn = null;
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

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(Boolean autenticated) {
        this.authenticated = autenticated;
    }

    public String getAuthenticatedIn() {
        return authenticatedIn;
    }

    public void setAuthenticatedIn(String authenticatedIn) {
        this.authenticatedIn = authenticatedIn;
    }
    //endregion

    public String password() {
        return password;
    }
}
