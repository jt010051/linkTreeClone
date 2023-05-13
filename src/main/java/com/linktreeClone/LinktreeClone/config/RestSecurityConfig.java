//package com.linktreeClone.LinktreeClone.config;
//
//
//
//import static org.springframework.http.HttpMethod.GET;
//import static org.springframework.http.HttpMethod.POST;
//import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//
//
//import lombok.RequiredArgsConstructor;
//
//@Configuration @EnableWebSecurity @RequiredArgsConstructor
//public class RestSecurityConfig  {
//
//	 private final UserDetailsService userDetailsService;
//	    private final BCryptPasswordEncoder bCryptPasswordEncoder;
//
//	    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//	        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
//	    }
//
//	    protected void configure(HttpSecurity http) throws Exception {
//	        
//	      
////	        http.csrf().disable();
////	        http.sessionManagement().sessionCreationPolicy(STATELESS);
////	        http.authorizeHttpRequests().requestMatchers(GET, "/api/categories/**", "/api/songs/**").permitAll();
////
////	        http.authorizeHttpRequests().requestMatchers(POST, "/api/auth/**").permitAll();
////	        http.authorizeHttpRequests().requestMatchers(GET,  "/api/auth/token/refresh/**").permitAll();
////
////	        http.authorizeHttpRequests().requestMatchers(GET,"/api/auth/users/**").hasAnyAuthority("ROLE_ADMIN");
////
////
////	        http.authorizeHttpRequests().anyRequest().authenticated();
////	        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
////	        http.cors();
//
//
//	    }
//
//	    @Bean
//	    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
//	        return authenticationConfiguration.getAuthenticationManager();
//	    }
//
//
//}