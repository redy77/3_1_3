package ru.viktor.lesson_3_1_1.dao;

import ru.viktor.lesson_3_1_1.models.Roles;

import java.util.List;

public interface RoleDao {
    void addRole(Roles roles);

    Roles getRole(Long id);

    List <Roles> getListRoles();

}
