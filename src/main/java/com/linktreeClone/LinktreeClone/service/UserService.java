package com.linktreeClone.LinktreeClone.service;

import java.util.List;

import com.linktreeClone.LinktreeClone.domain.Link;
import com.linktreeClone.LinktreeClone.domain.LinkTreeUser;
import com.linktreeClone.LinktreeClone.domain.PendingUserRoles;
import com.linktreeClone.LinktreeClone.domain.Role;



public interface UserService {
	LinkTreeUser saveUser(LinkTreeUser user);
	void addRoleToUser(String username, String roleName);
	LinkTreeUser getUser(String username);
    List<LinkTreeUser>getUsers();
    Role saveRole(Role role);
    LinkTreeUser addLinkToUser(String username, Link link);
    Link saveLink(Link link);

    List<Link> getLinksByUser(String username);
    LinkTreeUser updatePassword (String password, LinkTreeUser updatedUser);
    LinkTreeUser update (LinkTreeUser user);
    void pending (String username, String pendingRole);
	void delete (LinkTreeUser user);
	void removeRole(String username);

}
