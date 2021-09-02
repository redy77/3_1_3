package ru.viktor.lesson_3_1_1.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import javax.persistence.*;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "role")
public class Roles implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String role;

    public Roles(String role) {
        this.role = role;
    }

    @ManyToMany(fetch = FetchType.EAGER, mappedBy = "roles")
    private Set<User> users;


    @Override
    public String getAuthority() {
        return role;
    }

}
