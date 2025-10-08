package com.techmatrix18.service;

import com.techmatrix18.dto.ClientDto;
import com.techmatrix18.dto.ContactDto;
import com.techmatrix18.model.Client;
import com.techmatrix18.model.Contact;
import com.techmatrix18.repository.ContactRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * @author Alexander Kuziv
 * @since 01.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Service
@Transactional
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    // Get all contacts
    public List<Contact> getAll() {
        return contactRepository.findAll();
    }

    // Find contact by ID
    public Optional<Contact> getById(Long id) {
        return contactRepository.findById(id);
    }

    /**
     * Finds all contacts by pages
     *
     * @param page
     * @param size
     * @return
     */
    public Page<Contact> getAllPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        return contactRepository.findAll(pageable);
    }

    public ContactDto getByIdDto(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found"));
        return mapToDto(contact);
    }

    private ContactDto mapToDto(Contact contact) {
        ContactDto dto = new ContactDto();
        dto.setId(contact.getId());
        dto.setClient(contact.getClient());
        dto.setFirstname(contact.getFirstname());
        dto.setLastname(contact.getLastname());
        dto.setEmail(contact.getEmail());
        dto.setPhone(contact.getPhone());
        dto.setPosition(contact.getPosition());
        return dto;
    }

    // Find contact by email
    public Optional<Contact> getContactByEmail(String email) {
        return contactRepository.findByEmail(email);
    }

    // Find contact by phone
    public Optional<Contact> getContactByPhone(String phone) {
        return contactRepository.findByPhone(phone);
    }

    // Find contact by firstname
    public List<Contact> getContactsByFirstname(String firstname) {
        return contactRepository.findByFirstname(firstname);
    }

    // Find contact by lastname
    public List<Contact> getContactsByLastname(String lastname) {
        return contactRepository.findByLastname(lastname);
    }

    // Find by part of phone
    public List<Contact> searchContactsByPhone(String phonePart) {
        return contactRepository.findByPartPhone(phonePart);
    }

    // Find by part of email
    public List<Contact> searchContactsByEmail(String emailPart) {
        return contactRepository.findByPartEmail(emailPart);
    }

    // Find contact by part of firstname
    public List<Contact> searchContactsByFirstname(String firstnamePart) {
        return contactRepository.findByPartFirstname(firstnamePart);
    }

    // Find contact by part of lastname
    public List<Contact> searchContactsByLastname(String lastnamePart) {
        return contactRepository.findByPartLastname(lastnamePart);
    }

    // Save or update contact
    public Contact saveContact(Contact contact) {
        return contactRepository.save(contact);
    }

    // Delete contact by ID
    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }
}

