package ru.viktor.lesson_3_1_2.service;

import ru.viktor.lesson_3_1_2.models.Roles;

import java.util.List;

public interface RoleService {
    void addRole(Roles roles);

    Roles getRole(String role);

    List<Roles> getListRoles();
}
