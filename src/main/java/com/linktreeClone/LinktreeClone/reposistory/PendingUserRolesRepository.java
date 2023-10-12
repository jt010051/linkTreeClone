package com.linktreeClone.LinktreeClone.reposistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.linktreeClone.LinktreeClone.domain.LinkTreeUser;
import com.linktreeClone.LinktreeClone.domain.PendingUserRoles;

@Repository
public interface PendingUserRolesRepository extends JpaRepository<PendingUserRoles, Long>{

}
