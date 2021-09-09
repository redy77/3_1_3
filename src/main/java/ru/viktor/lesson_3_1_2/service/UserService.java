package ru.viktor.lesson_3_1_2.service;

import ru.viktor.lesson_3_1_2.models.User;
import java.util.List;
public interface UserService {

    List<User> getAll();

    User getUser(Long id);

    void addUser(User user);

    void editUser(User user);

    void deleteUser(Long id);

    User getUserByEmail(String email);

}
