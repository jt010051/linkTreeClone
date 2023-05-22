package com.linktreeClone.LinktreeClone.reposistory;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.linktreeClone.LinktreeClone.domain.Link;
import com.linktreeClone.LinktreeClone.domain.LinkTreeUser;
//import com.linktreeClone.LinktreeClone.domain.Role;

@Repository
public interface UserRepository extends JpaRepository<LinkTreeUser, Long>{
	LinkTreeUser findByusername(String username);
	List<Link> findLinksByusername(String username);

}
