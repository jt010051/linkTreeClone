package com.linktreeClone.LinktreeClone.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity 
@Data 
@NoArgsConstructor
@AllArgsConstructor
public class PendingUserRoles {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    
    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true
        )
    private List<LinkTreeUser> links = new ArrayList<>();

}
