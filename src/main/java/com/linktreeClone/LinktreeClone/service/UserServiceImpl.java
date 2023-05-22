package com.linktreeClone.LinktreeClone.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.linktreeClone.LinktreeClone.domain.Link;
import com.linktreeClone.LinktreeClone.domain.LinkTreeUser;
import com.linktreeClone.LinktreeClone.domain.Role;
import com.linktreeClone.LinktreeClone.reposistory.LinkRepository;
import com.linktreeClone.LinktreeClone.reposistory.RoleRepository;
import com.linktreeClone.LinktreeClone.reposistory.UserRepository;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final LinkRepository linkRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	LinkTreeUser user = userRepo.findByusername(username);
        if(user == null) {
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User found in the database: {}", username);
            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            user.getRoles().forEach(role -> {
                authorities.add(new SimpleGrantedAuthority(role.getName()));
            });
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
        }
   
    }

    @Override
    public LinkTreeUser saveUser(LinkTreeUser user) {
        log.info("Saving new user {} to the database", user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new role {} to the database", role.getName());
        return roleRepo.save(role);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}", roleName, username);
        LinkTreeUser user = userRepo.findByusername(username);
        Role role = roleRepo.findByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public LinkTreeUser getUser(String username) {
        log.info("Fetching user {}", username);
        return userRepo.findByusername(username);
    }

    @Override
    public List<LinkTreeUser> getUsers() {
        log.info("Fetching all users");
        return userRepo.findAll();
    }

	@Override
	public List <Link> getLinksByUser(String username) {
        log.info( username +"Found");

        log.info("Fetching all links for" +username);
    	LinkTreeUser user = userRepo.findByusername(username);


		return user.getLinks();
	}

	@Override
	public void addLinkToUser(String username, Link link) {
		log.info("Adding link {} to user {}", link, username);
        LinkTreeUser user = userRepo.findByusername(username);
        Link l = linkRepo.findByName(link);
        user.getLinks().add(l);
		
	}

	@Override
	public Link saveLink(Link link) {
        log.info("Saving new link {} to the database", link.getName());
        return linkRepo.save(link);
	}


}