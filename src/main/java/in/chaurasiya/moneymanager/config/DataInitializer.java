package in.chaurasiya.moneymanager.config;

import in.chaurasiya.moneymanager.Entity.ProfileEntity;
import in.chaurasiya.moneymanager.Entity.Role;
import in.chaurasiya.moneymanager.Repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (profileRepository.findByEmail("admin@gmail.com").isEmpty()) {

            ProfileEntity admin = new ProfileEntity();
            admin.setEmail("admin@gmail.com");
            admin.setFullName("Admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            admin.setIsActive(true);  // ya isActive(true) (tumhare field ke hisaab se)

            profileRepository.save(admin);

            System.out.println("✅ Default Admin Created");
        }
    }
}