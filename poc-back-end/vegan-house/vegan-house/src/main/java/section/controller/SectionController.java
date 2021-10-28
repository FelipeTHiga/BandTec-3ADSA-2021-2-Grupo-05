package section.controller;

import org.springframework.web.bind.annotation.*;
import section.controller.form.LoginForm;
import section.model.User;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/vegan-house")
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
    @PostMapping("/sign-up") // Cadastro
    public String registerUser(@RequestBody User newUser) {
        if (usersMap.containsKey(newUser.getLogin())) {
            return "Esse login já está cadastrado.";
        }
        usersMap.put(newUser.getLogin(), newUser);
        return String.format("Usuário %s cadastrado com sucesso.", newUser.getName());
    }

    @PostMapping("/sign-in") // Login
    public String login(@RequestBody LoginForm loginForm) {
        if (Objects.isNull(activeUser)) {
            try {
                User user = usersMap.get(loginForm.getLogin());
                if (user.password().equals(loginForm.getPassword())) {
                    activeUser = user;
                    user.setAuthenticated(true);
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy - HH:mm:ss");
                    String dateTimeformatted = (LocalDateTime.now()).format(formatter);
                    user.setAuthenticatedIn(dateTimeformatted);

                    return "Login efetuado com sucesso.";
                }
                throw new Exception();

            } catch (Exception e) {
                return "Dados inválidos";
            }
        }

        return "Já existe usuário logado nessa sessão";
    }

    //endregion

    //region GET
    @GetMapping("/users")
    public List<User> getUsers() {
        List<User> usersOrder = usersMap.values().stream()
                .sorted(Comparator.comparing(User::getId))
                .collect(Collectors.toList());
        return usersOrder;
    }
    //endregion

    //region DELETE
    @DeleteMapping("/log-off")
    public String logoff() {
        if (Objects.isNull(activeUser)) {
            return "Não existe usuário logado";
        }
        activeUser.setAuthenticated(false);
        activeUser.setAuthenticatedIn(null);
        String name = activeUser.getName();
        activeUser = null;
        return String.format("Usuário %s saiu do sistema", name);

    }
    //endregion
}

