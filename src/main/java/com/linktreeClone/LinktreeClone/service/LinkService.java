package com.linktreeClone.LinktreeClone.service;

import java.io.IOException;
import java.util.Collection;

import com.linktreeClone.LinktreeClone.domain.Link;
import com.linktreeClone.LinktreeClone.domain.LinkTreeUser;


public interface LinkService {
	Link create(Link link);

	Link get(Long id);
	Link update(Long id, Link link);
	void delete(String username, LinkTreeUser user, Link link);
}
