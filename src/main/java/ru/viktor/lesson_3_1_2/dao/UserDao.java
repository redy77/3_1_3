package ru.viktor.lesson_3_1_2.dao;

import ru.viktor.lesson_3_1_2.models.User;
import java.util.List;

public interface UserDao {
    List<User> getAll();

    User getUser(Long id);

    void addUser(User user);

    void editUser(User user);

    void deleteUser(Long id);

    User getUserByEmail(String email);

}
