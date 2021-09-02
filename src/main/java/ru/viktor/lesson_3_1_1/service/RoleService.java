package ru.viktor.lesson_3_1_1.service;

import ru.viktor.lesson_3_1_1.models.Roles;

import java.util.List;

public interface RoleService {
    void addRole(Roles roles);

    Roles getRole(Long id);

    List<Roles> getListRoles();
}
