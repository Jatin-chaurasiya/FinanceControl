package in.chaurasiya.moneymanager.Service;

import in.chaurasiya.moneymanager.Entity.ProfileEntity;
import in.chaurasiya.moneymanager.Entity.Role;
import in.chaurasiya.moneymanager.Repository.ProfileRepository;
import in.chaurasiya.moneymanager.dto.ExpenseDTO;
import in.chaurasiya.moneymanager.dto.IncomeDTO;
import in.chaurasiya.moneymanager.dto.RecentTransactionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;
import static java.util.stream.Stream.concat;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final ProfileService profileService;
    private final ProfileRepository profileRepository;

    public Map<String, Object> getDashboardData() {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        Map<String, Object> returnValue = new LinkedHashMap<>();

        List<IncomeDTO> latestIncomes;
        List<ExpenseDTO> latestExpenses;
        BigDecimal totalIncome;
        BigDecimal totalExpense;

        if (currentProfile.getRole() == Role.ADMIN) {
            // ← Sab ANALYST ka combined data
            List<ProfileEntity> analysts = profileRepository.findByRole(Role.ANALYST);

            latestIncomes = analysts.stream()
                    .flatMap(a -> incomeService.getLatest5IncomesForUser(a.getId()).stream())
                    .sorted(Comparator.comparing(IncomeDTO::getDate).reversed())
                    .limit(10)
                    .toList();

            latestExpenses = analysts.stream()
                    .flatMap(a -> expenseService.getLatest5ExpensesForUser(a.getId()).stream())
                    .sorted(Comparator.comparing(ExpenseDTO::getDate).reversed())
                    .limit(10)
                    .toList();

            totalIncome = analysts.stream()
                    .map(a -> incomeService.getTotalIncomeForUser(a.getId()))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            totalExpense = analysts.stream()
                    .map(a -> expenseService.getTotalExpenseForUser(a.getId()))
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

        } else {
            // ← ANALYST apna data dekhe
            latestIncomes = incomeService.getLatest5IncomesForCurrentUser();
            latestExpenses = expenseService.getLatest5ExpensesForCurrentUser();
            totalIncome = incomeService.getTotalIncomeForCurrentUser();
            totalExpense = expenseService.getTotalExpenseForCurrentUser();
        }

        List<RecentTransactionDTO> recentTransactions = concat(
                latestIncomes.stream().map(income -> RecentTransactionDTO.builder()
                        .id(income.getId())
                        .profileId(currentProfile.getId())
                        .icon(income.getIcon())
                        .name(income.getName())
                        .amount(income.getAmount())
                        .date(income.getDate())
                        .createdAt(income.getCreatedAt())
                        .updatedAt(income.getUpdatedAt())
                        .type("income")
                        .build()),
                latestExpenses.stream().map(expense -> RecentTransactionDTO.builder()
                        .id(expense.getId())
                        .profileId(currentProfile.getId())
                        .icon(expense.getIcon())
                        .name(expense.getName())
                        .amount(expense.getAmount())
                        .date(expense.getDate())
                        .createdAt(expense.getCreatedAt())
                        .updatedAt(expense.getUpdatedAt())
                        .type("expense")
                        .build()))
                .sorted((a, b) -> {
                    int cmp = b.getDate().compareTo(a.getDate());
                    if (cmp == 0 && a.getCreatedAt() != null && b.getCreatedAt() != null) {
                        return b.getCreatedAt().compareTo(a.getCreatedAt());
                    }
                    return cmp;
                }).collect(Collectors.toList());

        returnValue.put("totalBalance", totalIncome.subtract(totalExpense));
        returnValue.put("totalIncome", totalIncome);
        returnValue.put("totalExpense", totalExpense);
        returnValue.put("recent5Expenses", latestExpenses);
        returnValue.put("recent5Incomes", latestIncomes);
        returnValue.put("recentTransactions", recentTransactions);

        return returnValue;
    }
}