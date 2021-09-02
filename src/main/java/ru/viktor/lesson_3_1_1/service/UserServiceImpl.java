package ru.viktor.lesson_3_1_1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.viktor.lesson_3_1_1.dao.UserDao;
import ru.viktor.lesson_3_1_1.models.User;

import java.util.List;


@Service
@Transactional
public class UserServiceImpl implements UserService {
    UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public List<User> getAll() {
        return userDao.getAll();
    }

    @Override
    public User getUser(Long id) {
        return userDao.getUser(id);
    }

    @Override

    public void addUser(User user) {
        userDao.addUser(user);
    }

    @Override

    public void editUser(User user) {
        userDao.editUser(user);
    }

    @Override

    public void deleteUser(Long id) {
        userDao.deleteUser(id);
    }

    @Override
    public User getUserByName(String name) {
        return userDao.getUserByName(name);
    }

}
