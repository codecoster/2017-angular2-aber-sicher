package de.trion.sample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class BackendApplication
{
    public static void main(String[] args)
    {
        SpringApplication.run(BackendApplication.class, args);
    }

    @RequestMapping("/")
    public String dashboard()
    {
        return "hello from spring!";
    }
    
    @RequestMapping("/protected")
    public Object secure()
    {
        return SecurityContextHolder.getContext().getAuthentication();
//        return "protected hello from spring!";
    }
        
    @CrossOrigin
    @RequestMapping("/protected/account")
    public String account()
    {
        return "{\"balance\": 123, \"currency\": \"EUR\"}";
    }
        
    @CrossOrigin
    @RequestMapping("/protected/appointments")
    public String appointments()
    {
        return "{\"Monday\": \"Dentist\", "
                + "\"Wednesday\": \"Clean the Home\", "
                + "\"Sunday\": \"Visit Parents\"}";
    }

}
