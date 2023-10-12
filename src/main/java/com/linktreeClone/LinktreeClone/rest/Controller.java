package com.linktreeClone.LinktreeClone.rest;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.linktreeClone.LinktreeClone.domain.Link;
import com.linktreeClone.LinktreeClone.domain.LinkTreeUser;
import com.linktreeClone.LinktreeClone.reposistory.LinkRepository;
import com.linktreeClone.LinktreeClone.service.LinkService;
import com.linktreeClone.LinktreeClone.service.UserService;
import com.linktreeClone.LinktreeClone.service.UserServiceImpl;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("api/links")
@AllArgsConstructor
@Slf4j
public class Controller {
    private final UserService userService;
private final LinkService linkServe;
	@Autowired
	LinkRepository linkRepo;
	
	@GetMapping
	public String testMap() {
		return "Hello World";
	}
	
	@PostMapping(path ="/newLink")
   public LinkTreeUser createLink (@RequestParam String username, @RequestBody Link link ) {
System.out.println(username +" added a new link");        
        link = linkServe.create(link);
        
return userService.addLinkToUser(username, link);
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
	@PutMapping("updateLink/{id}")
	public Link update(@PathVariable ("id") Long id, @RequestBody Link link) {
		
		return linkServe.update(id, link);
	}
	@DeleteMapping("deleteLink/{username}")
	public void delete( @PathVariable("username") String username, @RequestBody Link link) {
		log.info("Delete url by name {}", link);
log.info(link.getURL());
		LinkTreeUser user = userService.getUser(username);
	
		 linkServe.delete(username, user, link);
	}
	@Data
	class LinkToUserForm {
	    private String username;
	    private String linkName;
	}
}
