package ru.viktor.lesson_3_1_2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.viktor.lesson_3_1_2.models.Roles;
import ru.viktor.lesson_3_1_2.models.User;
import ru.viktor.lesson_3_1_2.service.RoleService;
import ru.viktor.lesson_3_1_2.service.UserDetailsServiceImpl;
import ru.viktor.lesson_3_1_2.service.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class RestUserController {

    UserService userService;
    RoleService roleService;

    @Autowired
    public RestUserController(UserService userService, RoleService roleService, UserDetailsServiceImpl userDetailsService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/admin")
    User admin(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }

    @GetMapping("/users")
    List<User> allUsers() {
        return userService.getAll();
    }

    @GetMapping("/roles")
    List<Roles> allRoles() {
        return roleService.getListRoles();
    }

    @PostMapping("/newUser")
    User newUser(@RequestBody User user) {
        Set<Roles> roles = user.getRoles();
        Set<Roles> rolesForNew = new HashSet<>();
        for (Roles role : roles
        ) {rolesForNew.add(roleService.getRole(role.toString()));
        }
        user.setRoles(rolesForNew);
        userService.addUser(user);
        return user;
    }
}
