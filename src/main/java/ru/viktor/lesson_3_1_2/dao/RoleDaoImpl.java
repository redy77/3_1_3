package ru.viktor.lesson_3_1_2.dao;

import org.springframework.stereotype.Repository;
import ru.viktor.lesson_3_1_2.models.Roles;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
public class RoleDaoImpl implements RoleDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Roles getRole(Long id) {

        TypedQuery<Roles> query = entityManager.createQuery("select u from Roles u where u.id= :id", Roles.class);
        query.setParameter("id", id);
        return query.getResultList().stream().findAny().orElse(null);
    }
    @Override
    public void addRole(Roles roles) {
        entityManager.persist(roles);
    }

    @Override
    public List<Roles> getListRoles() {
        List list = entityManager.createQuery("select r from Roles r").getResultList();
        return list;
    }
}
