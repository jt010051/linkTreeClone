package com.linktreeClone.LinktreeClone.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class Controller {

	
	
	@GetMapping
	public String testMap() {
		return "Hello World";
	}
}
