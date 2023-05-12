package com.linktreeClone.LinktreeClone;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
	
	@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
			userService.saveRole(new Role(null, "ROLE_USER"));
		
			userService.saveRole(new Role(null, "ROLE_ADMIN"));

Link youtube = new Link(null, "youtube.com/jt010051", "Youtube");
Link facebook = new Link(null, "facebook.com/jt0100", "Facebook");
Link twitter = new Link(null, "twitter.com/jt0100", "Twitter");
Link instagram = new Link(null, "instagram.com/jt0100", "Instagram");
Link linkedin = new Link(null, "https://www.linkedin.com/in/jon-thomas-smith-16a239158/", "Linkedin");

List<Link> links = new ArrayList<>();
links.add(youtube);
links.add(facebook);
links.add(twitter);
links.add(instagram);
links.add(linkedin);

			userService.saveUser(new LinkTreeUser(null, "jt0100", "12345678",  new ArrayList<>(), links));
			

			

			userService.addRoleToUser("jt0100", "ROLE_ADMIN");
		
		};
	}
}
