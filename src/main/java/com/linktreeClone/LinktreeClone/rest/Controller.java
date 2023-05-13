package com.linktreeClone.LinktreeClone.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.linktreeClone.LinktreeClone.domain.Link;
import com.linktreeClone.LinktreeClone.domain.LinkTreeUser;
import com.linktreeClone.LinktreeClone.reposistory.LinkRepository;
//import com.linktreeClone.LinktreeClone.service.UserService;
//import com.linktreeClone.LinktreeClone.service.UserServiceImpl;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/")
@AllArgsConstructor
public class Controller {
//    private final UserServiceImpl userService;

	@Autowired
	LinkRepository linkRepo;
	
	@GetMapping
	public String testMap() {
		return "Hello World";
	}
	
	@GetMapping("/allLinks")
	public List<Link> getAllUrls(HttpServletResponse response) {
		return linkRepo.findAll();
	}
//	@GetMapping("/get/{username}")
//	public LinkTreeUser getUser( @PathVariable("username") String username) {
//        return userService.getUser(username);
//
//	}
//	@GetMapping("/user")
//	public String userLinks() {
//		return "Hello World";
//	}
}
