package in.chaurasiya.moneymanager.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping({"/status","/health"})
public class HomeController {
    @GetMapping
    public String healthCheck() { // fixed typo 'heathCheck' -> 'healthCheck'
        return "Application is running On..";
    }
}
