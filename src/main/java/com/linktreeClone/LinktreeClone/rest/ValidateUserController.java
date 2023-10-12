package com.linktreeClone.LinktreeClone.rest;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.util.MimeTypeUtils;
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
import org.springframework.web.client.HttpClientErrorException.Forbidden;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.exc.StreamWriteException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.linktreeClone.LinktreeClone.domain.Link;
import com.linktreeClone.LinktreeClone.domain.LinkTreeUser;
import com.linktreeClone.LinktreeClone.domain.Role;
import com.linktreeClone.LinktreeClone.reposistory.UserRepository;
import com.linktreeClone.LinktreeClone.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")

@Slf4j

public class ValidateUserController {
    private final UserService userService;
	private long expirationTime = 1800000;
    private final UserRepository userRepo;
Role role;
    @GetMapping("/users")
    public ResponseEntity<List<LinkTreeUser>>getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/user/save")
    public LinkTreeUser saveUser(@RequestBody LinkTreeUser user) {


     return userService.saveUser(user);
    }
    @DeleteMapping("deleteUser/{username}")
	public void delete( @PathVariable("username") String username, @RequestParam String password) {
		log.info("Delete user {}", username);

		LinkTreeUser user = userService.getUser(username);
		userService.removeRole(username);
			 userService.delete(user);
		
		
	}
    @DeleteMapping("deleteUser/admin/{userToDelete}")

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
   	public void deleteAdmin(@PathVariable ("userToDelete")String userToDelete) {
           		LinkTreeUser userToDeleteObj = userService.getUser(userToDelete);
        		userService.removeRole(userToDelete);

           			 userService.delete(userToDeleteObj);
				
				
           
   		
   	}
    @PostMapping("/user/pendingRole")

    public void pendingRole(@RequestParam String thisPendingRole, @RequestParam String username) {
 System.out.println(thisPendingRole);
    	
    	
      	 userService.pending(username, thisPendingRole );
    }
  @PutMapping("user/updatePassword")
  public LinkTreeUser updatePassword( @RequestParam String username, @RequestParam String password) {
		LinkTreeUser user = userRepo.findByusername(username);
		
		return userService.updatePassword(password, user);
	  
	  
  }
  @PutMapping("user/update")
  public LinkTreeUser updatePassword( @RequestBody LinkTreeUser updatedUser) {
		
		
		return userService.update(updatedUser);
	  
	  
  }
    @PostMapping("/role/save")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")

    public ResponseEntity<Role>saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/auth/role/save").toUriString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

    @PostMapping("/role/addtouser")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")

    public ResponseEntity<?>addRoleToUser(@RequestBody RoleToUserForm form) {
   

        userService.addRoleToUser(form.getUsername(), form.getRoleName());
        
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {

    	String authorizationHeader = request.getHeader(AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                LinkTreeUser user = userService.getUser(username);
                String access_token = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                        .withIssuer(request.getRequestURL().toString())
                        .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);
                Map<String, String> tokens = new HashMap<>();
               
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);

                response.setContentType(MediaType.APPLICATION_JSON_VALUE);

                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
               
				
				
            }catch (Exception exception) {
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(MimeTypeUtils.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }
   
}

@Data
class RoleToUserForm {
    private String username;
    private String roleName;
    
}