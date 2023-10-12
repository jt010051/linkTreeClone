package com.linktreeClone.LinktreeClone.service;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Service;

import com.linktreeClone.LinktreeClone.domain.Link;
import com.linktreeClone.LinktreeClone.domain.LinkTreeUser;
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
		
		log.info("Saving new url {}: ", link.getURL(), link.getURL());


		return repository.save(link);
	}

	@Override
	public Link get(Long id) {
		log.info("Fetching url by id {}", id);
		return repository.findById(id).get();
	}





	@Override
	public Link update(Long id, Link link) {
Link updateLink = repository.findById(id).get();
if(link.getName() != "") updateLink.setName(link.getName());
if(link.getURL() != "") updateLink.setURL(link.getURL());
return updateLink;
	}

	@Override
	public void delete(String username, LinkTreeUser user, Link link) {
		Link deleteLink = repository.findById(link.getID()).get();
		
		List<Link> links = user.getLinks();
		for(int i =0; i < links.size(); i++) {
			if(links.get(i).getID() == deleteLink.getID()) {
				links.remove(i);
				
			}
		}
		log.info("Delete url by id {}", deleteLink.getID());


 repository.deleteById(deleteLink.getID());
			
	}
	
	
}
