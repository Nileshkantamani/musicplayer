package com.player.music.config;

import com.player.music.model.Role;
import com.player.music.model.Role.ERole;
import com.player.music.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder implements ApplicationListener<ContextRefreshedEvent> {
    
    private boolean alreadySetup = false;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (alreadySetup) {
            return;
        }
        
        createRoleIfNotFound(ERole.ROLE_USER);
        createRoleIfNotFound(ERole.ROLE_ADMIN);
        
        alreadySetup = true;
    }
    
    private void createRoleIfNotFound(ERole name) {
        if (!roleRepository.findByName(name).isPresent()) {
            Role role = new Role();
            role.setName(name);
            roleRepository.save(role);
        }
    }
} 