package section.controller;

import org.springframework.web.bind.annotation.*;
import section.controller.form.LoginForm;
import section.model.User;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class SectionController {
    //region Attributes
    private User activeUser;
    private Map<String, User> usersMap;
    //endregion

    //region Constructor
    public SectionController() {
        this.activeUser = null;
        usersMap = new HashMap<>();
    }
    //endregion

    //region POST
    @PostMapping("/signin")
    public String createUser(@RequestBody User newUser) {
        if (usersMap.containsKey(newUser.getLogin())) {
            return "Já existe o login cadastrado.";
        }
        usersMap.put(newUser.getLogin(), newUser);
        newUser.setAuthenticated(false);
        return String.format("Usuário %s cadastrado com sucesso", newUser.getName());
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginForm loginForm) {
        if (Objects.isNull(activeUser)) {
            try {
                User user = usersMap.get(loginForm.getLogin());
                if (user.password().equals(loginForm.getPassword())) {
                    activeUser = user;
                    user.setAuthenticated(true);
                    return "Login efetuado com sucesso";
                }
                throw new Exception();

            } catch (Exception e) {
                return "Dados inválidos";
            }
        }

        return "Já existe usuário logado";
    }
    //endregion

    //region GET
    @GetMapping("/users")
    public List<User> getUsers() {
        List<User> usersOrder = usersMap.values().stream()
                .sorted(Comparator.comparing(User::getName))
                .collect(Collectors.toList());
        return usersOrder;
    }
    //endregion

    //region DELETE
    @DeleteMapping("/logoff")
    public String logoff() {
        if (Objects.isNull(activeUser)) {
            return "Não existe usuário logado";
        }
        activeUser.setAuthenticated(false);
        String name = activeUser.getName();
        activeUser = null;
        return String.format("Usuário %s saiu do sistema", name);

    }
    //endregion
}
