package ru.viktor.lesson_3_1_2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.viktor.lesson_3_1_2.models.Roles;
import ru.viktor.lesson_3_1_2.models.User;
import ru.viktor.lesson_3_1_2.service.RoleService;
import ru.viktor.lesson_3_1_2.service.UserService;
import java.util.*;

@Controller
public class UserController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(value = "login")
    public String getLoginPage() {
        return "login";
    }

    @GetMapping("/")
    public String AllUsers(Model model, Authentication authentication) {
        model.addAttribute("users", userService.getAll());
        model.addAttribute("user", authentication.getPrincipal());
        return "index";
    }

    @GetMapping("user")
    public String User(Model model, Authentication authentication) {
        model.addAttribute("user", authentication.getPrincipal());
        return "user";
    }

    @GetMapping("/{id}")
    public String UserId(@PathVariable("id") Long id, Model model) {
        model.addAttribute(userService.getUser(id));
        return "user";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/";
    }


    @GetMapping("/new")
    public String newUser(@ModelAttribute("user") User user, Model model) {
        model.addAttribute("roles", roleService.getListRoles());
        return "new";
    }

    @PostMapping("/new")
    public String create(@ModelAttribute("user") User user,
                         @RequestParam(required = false) List<Long> choseRoles) {
        Set<Roles> roles = new HashSet<>();
        for (Long role: choseRoles) {
            roles.add(roleService.getRole(role));
        }
        user.setRoles(roles);

        userService.addUser(user);
        return "redirect:/";
    }

    @GetMapping("/{id}/edit")
    public String edit(@ModelAttribute("user") User user, Model model, @PathVariable("id") Long id) {
        model.addAttribute("user", userService.getUser(id));
        model.addAttribute("roles", roleService.getListRoles());
        return "edit";
    }

    @PatchMapping("/{id}")
    public String update(@ModelAttribute("user") User user,
                         @RequestParam(required = false) List<Long> choseRoles) {
        Set<Roles> roles = new HashSet<>();
        for (Long role: choseRoles) {
            roles.add(roleService.getRole(role));
        }
        user.setRoles(roles);
        userService.editUser(user);
        return "redirect:/";
    }
}
