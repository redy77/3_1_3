package ru.viktor.lesson_3_1_1.service;

import ru.viktor.lesson_3_1_1.models.User;
import java.util.List;
public interface UserService {

    List<User> getAll();

    User getUser(Long id);

    void addUser(User user);

    void editUser(User user);

    void deleteUser(Long id);

    User getUserByName(String name);

}
