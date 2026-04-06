package in.chaurasiya.moneymanager.Controller;

import in.chaurasiya.moneymanager.Service.ExpenseService;
import in.chaurasiya.moneymanager.Service.IncomeService;
import in.chaurasiya.moneymanager.dto.ExpenseDTO;
import in.chaurasiya.moneymanager.dto.FilterDTO;
import in.chaurasiya.moneymanager.dto.IncomeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/filter")
public class FilterController {

    private final ExpenseService expenseService;
    private final IncomeService incomeService;

    //  ANALYST + ADMIN
    @PreAuthorize("hasAnyRole('ADMIN','ANALYST')")
    @PostMapping
    public ResponseEntity<?> filterTransactions(@RequestBody FilterDTO filter) {

        LocalDate startDate = filter.getStartDate() != null ? filter.getStartDate() : LocalDate.MIN;
        LocalDate endDate = filter.getEndDate() != null ? filter.getEndDate() : LocalDate.now();
        String keyword = filter.getKeyword() != null ? filter.getKeyword() : "";
        String sortField = filter.getSortField() != null ? filter.getSortField() : "date";
        Sort.Direction direction = "desc".equalsIgnoreCase(filter.getSortOrder()) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortField);

        if ("income".equalsIgnoreCase(filter.getType())) {
            List<IncomeDTO> incomes = incomeService.filterIncomes(
                    startDate, endDate, keyword, sort, filter.getTargetUserId()); // ← ADD
            return ResponseEntity.ok(incomes);

        } else if ("expense".equalsIgnoreCase(filter.getType())) {
            List<ExpenseDTO> expenses = expenseService.filterExpenses(
                    startDate, endDate, keyword, sort, filter.getTargetUserId()); // ← ADD
            return ResponseEntity.ok(expenses);
        } else {
            return ResponseEntity.badRequest().body("Invalid type. Must be 'income' or 'expense'");
        }
    }
}