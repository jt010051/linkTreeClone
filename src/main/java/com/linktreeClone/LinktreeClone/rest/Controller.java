package com.linktreeClone.LinktreeClone.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.linktreeClone.LinktreeClone.domain.Link;
import com.linktreeClone.LinktreeClone.reposistory.LinkRepository;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/")
public class Controller {

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
//	@GetMapping("/user")
//	public String userLinks() {
//		return "Hello World";
//	}
}
