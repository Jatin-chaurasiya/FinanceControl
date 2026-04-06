package in.chaurasiya.moneymanager.Controller;

import in.chaurasiya.moneymanager.Entity.ProfileEntity;
import in.chaurasiya.moneymanager.Service.IncomeService;
import in.chaurasiya.moneymanager.Service.ProfileService;
import in.chaurasiya.moneymanager.dto.IncomeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize; // ✅ ADD
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {

    private final IncomeService incomeService;
    private final ProfileService profileService;

    // ✅ ONLY ADMIN
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<IncomeDTO> addIncome(
            @RequestBody IncomeDTO dto,
            @RequestParam(required = false) Long targetUserId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(incomeService.addIncome(dto, targetUserId));
    }

    // ✅ ANALYST + ADMIN
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','ANALYST')")
    public ResponseEntity<List<IncomeDTO>> getIncomes(
            @RequestParam(required = false) Long targetUserId) {

        ProfileEntity current = profileService.getCurrentProfile();

        if (current.getRole().name().equals("ADMIN") && targetUserId == null) {
            return ResponseEntity.ok(incomeService.getIncomesForAdmin()); // 🔥 ALL DATA
        }

        return ResponseEntity.ok(incomeService.getIncomes(targetUserId));
    }

    // ✅ ONLY ADMIN
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id){
        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ ONLY ADMIN
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}") // ❗ fixed path
    public ResponseEntity<IncomeDTO> updateIncome(
            @PathVariable Long id,
            @RequestBody IncomeDTO dto) {

        IncomeDTO updated = incomeService.UpdateIncome(id, dto);
        return ResponseEntity.ok(updated);
    }
}