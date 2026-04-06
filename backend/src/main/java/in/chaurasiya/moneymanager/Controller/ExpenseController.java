package in.chaurasiya.moneymanager.Controller;

import in.chaurasiya.moneymanager.Entity.ProfileEntity;
import in.chaurasiya.moneymanager.Service.ExpenseService;
import in.chaurasiya.moneymanager.Service.ProfileService;
import in.chaurasiya.moneymanager.dto.ExpenseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; // ✅ ADD
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;
    private final ProfileService profileService;

    // ONLY ADMIN
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ExpenseDTO> addExpense(
            @RequestBody ExpenseDTO dto,
            @RequestParam(required = false) Long targetUserId) { // ← ADD
        ExpenseDTO saved = expenseService.addExpense(dto, targetUserId);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // ANALYST + ADMIN
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','ANALYST')")
    public ResponseEntity<List<ExpenseDTO>> getExpenses(
            @RequestParam(required = false) Long targetUserId) {

        ProfileEntity current = profileService.getCurrentProfile(); // ✅ FIX

        if (current.getRole().name().equals("ADMIN") && targetUserId == null) {
            return ResponseEntity.ok(expenseService.getExpensesForAdmin()); // 👇 next fix
        }

        return ResponseEntity.ok(expenseService.getExpenses(targetUserId));
    }

    // ✅ ONLY ADMIN
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }
}