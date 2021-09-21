package ru.viktor.lesson_3_1_2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.viktor.lesson_3_1_2.dao.UserDao;
import ru.viktor.lesson_3_1_2.models.User;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    UserDao userDao;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
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

    public User addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.addUser(user);
        return user;
    }

    @Override
    public void editUser(User user) {
        if (user.getPassword().equals("")) {
            user.setPassword(userDao.getUser(user.getId()).getPassword());
        }
        if (!user.getPassword().equals(userDao.getUser(user.getId()).getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userDao.editUser(user);
    }

    @Override

    public void deleteUser(Long id) {
        userDao.deleteUser(id);
    }

    @Override
    public User getUserByEmail(String email) {
        return userDao.getUserByEmail(email);
    }

}
