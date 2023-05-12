package com.linktreeClone.LinktreeClone.reposistory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.linktreeClone.LinktreeClone.domain.Link;
@Repository


public interface LinkRepository extends JpaRepository<Link, Long> {

}
