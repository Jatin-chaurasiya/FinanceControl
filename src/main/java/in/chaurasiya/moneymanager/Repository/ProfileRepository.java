package in.chaurasiya.moneymanager.Repository;


import in.chaurasiya.moneymanager.Entity.ProfileEntity;
import in.chaurasiya.moneymanager.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {


    Optional<ProfileEntity> findByEmail(String email);


    Optional<ProfileEntity> findByActivationToken(String activationToken);

    List<ProfileEntity> findByRole(Role role);
}

