package com.linktreeClone.LinktreeClone.config;



import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.PUT;
import static org.springframework.http.HttpMethod.OPTIONS;


import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Configuration @EnableWebSecurity @RequiredArgsConstructor @EnableMethodSecurity(prePostEnabled = true, jsr250Enabled = true)
public class RestSecurityConfig  { 
	AuthenticationConfiguration authentication;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager(authentication));
        customAuthenticationFilter.setFilterProcessesUrl("/api/auth/login/**");
        http.cors(); 
        http.csrf().disable();
    http.sessionManagement().sessionCreationPolicy(STATELESS);
    http.authorizeHttpRequests().requestMatchers(GET, "api/links/**").permitAll();
    http.authorizeHttpRequests().requestMatchers(POST, "api/links/**").permitAll();

    http.authorizeHttpRequests().requestMatchers(POST, "api/auth/user/**").permitAll();
    http.authorizeHttpRequests().requestMatchers(POST, "api/auth/user/**").permitAll();
    http.authorizeHttpRequests().requestMatchers(POST, "api/auth/role/addtouser").permitAll();

    http.authorizeHttpRequests().requestMatchers(PUT, "api/auth/user/**").permitAll();
    http.authorizeHttpRequests().requestMatchers(GET, "api/links/get/{username}/links").permitAll();
    http.authorizeHttpRequests().requestMatchers(PUT, "api/links/updateLink/{id}").permitAll();
    http.authorizeHttpRequests().requestMatchers(DELETE, "api/links/deleteLink/{username}").permitAll();
    http.authorizeHttpRequests().requestMatchers(DELETE, "api/auth/deleteUser/{username}").permitAll();
    http.authorizeHttpRequests().requestMatchers(DELETE, "api/auth/deleteUser/admin/{userToDelete}").permitAll();

  

 
    http.authorizeHttpRequests().requestMatchers(POST, "/api/auth/**").permitAll();
    http.authorizeHttpRequests().requestMatchers(GET,  "/api/auth/token/refresh/**").permitAll();

    http.authorizeHttpRequests().requestMatchers(GET,"/api/auth/users/**").permitAll();


    http.authorizeHttpRequests().anyRequest().authenticated();
    http.addFilter(customAuthenticationFilter);

    http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)  throws Exception{
		return authenticationConfiguration.getAuthenticationManager();
	}
}