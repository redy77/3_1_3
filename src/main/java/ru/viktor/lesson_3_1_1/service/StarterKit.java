package ru.viktor.lesson_3_1_1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.viktor.lesson_3_1_1.models.Roles;
import ru.viktor.lesson_3_1_1.models.User;
import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class StarterKit {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public StarterKit(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostConstruct
    private void init() {

        Roles role = new Roles("ROLE_ADMIN");
        roleService.addRole(role);
        Roles role1 = new Roles("ROLE_USER");
        roleService.addRole(role1);
        User user = new User("1", "1", 34, "tom@tom.ru", Set.of(role, role1));
        User user1 = new User("user", "1", 34, "tom1@tom.ru", Set.of(role1));
        userService.addUser(user);
        userService.addUser(user1);
    }
}
