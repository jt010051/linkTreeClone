package com.linktreeClone.LinktreeClone.service;

import java.io.IOException;
import java.util.Collection;

import com.linktreeClone.LinktreeClone.domain.Link;


public interface LinkService {
	Link create(Link link);

	Link get(Long id);
	Link update(Link server);
	Boolean delete (Long id);
}
