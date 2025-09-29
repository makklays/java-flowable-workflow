package com.techmatrix18.service;

import com.techmatrix18.model.User;

/**
 * @author Alexander Kuziv
 * @since 28.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class FlowableUserAdapter implements org.flowable.idm.api.User {

    private final User user;

    public FlowableUserAdapter(User user) {
        this.user = user;
    }

    @Override
    public String getId() {
        return user.getId().toString(); // ID из твоей таблицы
    }

    @Override
    public String getFirstName() { return user.getFirstname(); }

    @Override
    public String getLastName() { return user.getLastname(); }

    @Override
    public void setDisplayName(String displayName) { user.setDisplayname(displayName); }

    @Override
    public String getDisplayName() { return user.getDisplayname(); }

    @Override
    public String getEmail() { return user.getEmail(); }

    @Override
    public String getPassword() { return user.getPassword(); }

    @Override
    public boolean isPictureSet() { return user.getPictureSet(); }

    @Override
    public void setId(String id) { user.setId(Long.valueOf(id)); }

    @Override
    public void setFirstName(String firstName) { user.setFirstname(firstName); }

    @Override
    public void setLastName(String lastName) { user.setLastname(lastName); }

    @Override
    public void setEmail(String email) { user.setEmail(email); }

    @Override
    public void setPassword(String password) { user.setPassword(password); }

    @Override
    public String getTenantId() { return user.getTenantId(); }

    @Override
    public void setTenantId(String tenantId) { user.setTenantId(tenantId); }

    public void setPictureSet(boolean pictureSet) { user.setPictureSet(pictureSet); }
}

