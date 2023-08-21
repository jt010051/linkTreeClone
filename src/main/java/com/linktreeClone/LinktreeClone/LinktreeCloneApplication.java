package com.linktreeClone.LinktreeClone;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import com.linktreeClone.LinktreeClone.domain.Link;
import com.linktreeClone.LinktreeClone.domain.LinkTreeUser;
import com.linktreeClone.LinktreeClone.domain.Role;
import com.linktreeClone.LinktreeClone.reposistory.LinkRepository;
import com.linktreeClone.LinktreeClone.service.UserService;


@SpringBootApplication
public class LinktreeCloneApplication {
	

	    public static void main(String[] args) {
		SpringApplication.run(LinktreeCloneApplication.class, args);
	}
		@Bean
		PasswordEncoder passwordEncoder() {
			return new BCryptPasswordEncoder();
		}
	
	    
	    //()
	@Bean
	CommandLineRunner run(UserService userService) {	 //delete later
		return args -> {
			userService.saveRole(new Role(null, "ROLE_USER"));
		
			userService.saveRole(new Role(null, "ROLE_ADMIN"));

Link youtube = new Link(null,"Youtube", "youtube.com/jt010051" );
Link facebook = new Link(null, "Facebook", "facebook.com/jt0100");
Link twitter = new Link(null, "Twitter" ,"twitter.com/jt0100");
Link instagram = new Link(null,"Instagram", "instagram.com/jt0100");
Link linkedin = new Link(null,  "Linkedin", "www.linkedin.com/in/jon-thomas-smith-16a239158/");

List<Link> links = new ArrayList<>();
links.add(youtube);
links.add(facebook);
links.add(twitter);
links.add(instagram);
links.add(linkedin);
String defaultUrl = "@gmail.com";
String defaultUsername = "jt0100";
			userService.saveUser(new LinkTreeUser(null, defaultUsername, "12345678","Jon-Thomas","Smith", defaultUsername + defaultUrl,"5555 Five Ln, Fake Town, TX 55555", "1111 1111 1111 1111",  new ArrayList<>(), links));
			

			

			userService.addRoleToUser("jt0100", "ROLE_ADMIN");
		
		};
	}
}
