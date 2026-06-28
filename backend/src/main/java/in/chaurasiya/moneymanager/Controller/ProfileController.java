package in.chaurasiya.moneymanager.Controller;

import in.chaurasiya.moneymanager.Service.ProfileService;
import in.chaurasiya.moneymanager.dto.AuthDTO;
import in.chaurasiya.moneymanager.dto.ProfileDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; // ✅ ADD
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping("/register")
    public ResponseEntity<ProfileDTO> registerProfile(@RequestBody ProfileDTO profileDTO) {
        ProfileDTO registeredProfile = profileService.registerProfile(profileDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredProfile);
    }

    @GetMapping(value="/activate", produces = "text/html")
    public ResponseEntity<String> activateProfile(@RequestParam String token) {

        boolean activated = profileService.activateProfile(token);

        if (activated) {

            String html = """
        <!DOCTYPE html>
        <html>

        <head>

        <title>Account Activated</title>

        </head>

        <body style="
        background:#f4f6f9;
        font-family:Arial;
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;">

        <div style="
        background:white;
        padding:40px;
        border-radius:12px;
        width:450px;
        text-align:center;
        box-shadow:0 0 20px rgba(0,0,0,.15);">

        <h1 style="color:green;">
        ✅ Account Activated
        </h1>

        <p>
        Your Money Manager account has been activated successfully.
        </p>

        <br>

        <a href="http://13.239.117.204:8082/login"

        style="
        background:#2563eb;
        color:white;
        padding:14px 30px;
        text-decoration:none;
        border-radius:8px;">

        Go To Login

        </a>

        </div>

        </body>

        </html>
        """;

            return ResponseEntity.ok(html);

        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("""
        <html>
        <body style="font-family:Arial;text-align:center;padding:60px;">
        <h1 style="color:red;">❌ Invalid Activation Link</h1>
        <p>The activation link is invalid or has already been used.</p>
        </body>
        </html>
        """);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthDTO authDTO) {
        try {
            if (!profileService.isAccountActive(authDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
                        "message", "Account is not active. Please activate your account first."
                ));
            }
            Map<String, Object> response = profileService.authenticateAndGenerateToken(authDTO);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of(
                    "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/profiles/analysts")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ProfileDTO>> getAllAnalysts() {
        return ResponseEntity.ok(profileService.getAllAnalysts());
    }

    @PreAuthorize("hasAnyRole('ADMIN','ANALYST')")
    @GetMapping("/profile")
    public ResponseEntity<ProfileDTO> getPublicProfile() {
        ProfileDTO profileDTO = profileService.getPublicProfile(null);
        return ResponseEntity.ok(profileDTO);
    }

    @PutMapping("/profiles/analysts/{id}/ban")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> banUser(@PathVariable Long id) {
        profileService.banUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/profiles/analysts/{id}/unban")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> unbanUser(@PathVariable Long id) {
        profileService.unbanUser(id);
        return ResponseEntity.ok().build();
    }
}