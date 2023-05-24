package com.linktreeClone.LinktreeClone.service;

import java.io.IOException;
import java.util.Collection;

import org.springframework.stereotype.Service;

import com.linktreeClone.LinktreeClone.domain.Link;
import com.linktreeClone.LinktreeClone.reposistory.LinkRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class LinkTreeImpl implements LinkService {
private final LinkRepository repository;
	@Override
	public Link create(Link link) {
		
		log.info("Saving new url{}: ", link.getURL(), link.getURL());


		return repository.save(link);
	}

	@Override
	public Link get(Long id) {
		log.info("Fetching url by id{}", id);
		return repository.findById(id).get();
	}





	@Override
	public Link update(Link server) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean delete(Long id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
