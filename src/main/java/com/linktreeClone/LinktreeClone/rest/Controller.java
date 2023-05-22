package com.linktreeClone.LinktreeClone.rest;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.linktreeClone.LinktreeClone.domain.Link;
import com.linktreeClone.LinktreeClone.domain.LinkTreeUser;
import com.linktreeClone.LinktreeClone.reposistory.LinkRepository;
import com.linktreeClone.LinktreeClone.service.LinkService;
import com.linktreeClone.LinktreeClone.service.UserService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

@RestController
@RequestMapping("api/links")
@AllArgsConstructor

public class Controller {
    private final UserService userService;
private final LinkService linkServe;
	@Autowired
	LinkRepository linkRepo;
	
	@GetMapping
	public String testMap() {
		return "Hello World";
	}
	
	@PostMapping("/newLink")
   public Link create (@RequestBody Link link) {
		
		
		return linkServe.create(link);

	}
	@PostMapping("/linkToUser")
	   public void addToUsername (@RequestBody String username, Link link) {
			userService.addLinkToUser(username, link);
			
			

		}
	
	@GetMapping("/allLinks")
	public List<Link> getAllUrls( HttpServletResponse response) {
		
		return linkRepo.findAll();
	}
	@GetMapping("/get/{username}")
	public LinkTreeUser getUser( @PathVariable("username") String username) {
        return userService.getUser(username);

	}
	@GetMapping("/get/{username}/links")
	public List<Link> getUserLinks( @PathVariable("username") String username) {
		
        return userService.getLinksByUser(username);

	}
	@Data
	class LinkToUserForm {
	    private String username;
	    private String linkName;
	}
}
