package com.techmatrix18.controller.api;

import com.techmatrix18.dto.ContactDto;
import com.techmatrix18.mapper.ContactMapper;
import com.techmatrix18.model.Contact;
import com.techmatrix18.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

/**
 * Controller for registering contacts in the system.
 * Processes HTTP-requests, related to contact.
 *
 * @author Alexander Kuziv
 * @since 10.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@RestController
@Tag(name = "Contacts", description = "Contact management API")
@RequestMapping("/api/v1/contacts")
public class ContactController {

    private ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    private static final Logger log = Logger.getLogger(ContactController.class.getName());

    @GetMapping
    @Operation(summary = "Get all contacts", description = "Returns list of all contacts")
    public ResponseEntity<List<ContactDto>> getAll() {
        log.info("Fetching all contacts");
        List<Contact> contacts = contactService.getAll();
        return ResponseEntity.ok(ContactMapper.toDtoList(contacts));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get contact by ID", description = "Returns a contact by its unique ID")
    public ResponseEntity<ContactDto> getContact(@PathVariable Long id) {
        log.info("Fetching contact with ID = " + id);
        Optional<Contact> contact = contactService.getById(id);
        if (contact.isPresent()) {
            return ResponseEntity.ok(ContactMapper.toDto(contact.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @Operation(summary = "Create new contact", description = "Adds a new contact to the system")
    public ResponseEntity addContact(@Valid @RequestBody ContactDto contactDto) {
        log.info("Creating new contact name = " + contactDto.getFirstname() + " " + contactDto.getLastname());
        Contact contact = ContactMapper.toEntity(contactDto);
        Contact saved = contactService.saveContact(contact);
        return ResponseEntity
                .created(URI.create("/api/v1/contacts/" + saved.getId()))
                .body(ContactMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update existing contact by ID", description = "Updates data for an existing contact by ID")
    public ResponseEntity updateContact(@PathVariable Long id, @Valid @RequestBody ContactDto contactDto) {
        Optional<Contact> exist = contactService.getById(id);
        if (exist.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        log.info("Updating contact with ID + " + id);

        Contact contact = exist.get();
        contact.setClient(contactDto.getClient());
        contact.setFirstname(contactDto.getFirstname());
        contact.setLastname(contactDto.getLastname());
        contact.setEmail(contactDto.getEmail());
        contact.setPhone(contactDto.getPhone());
        contact.setPosition(contactDto.getPosition());
        contact.setUpdatedAt(LocalDateTime.now());
        Contact updated = contactService.saveContact(contact);

        return ResponseEntity.ok(ContactMapper.toDto(updated));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete contact by ID", description = "Deletes a contact by ID")
    public ResponseEntity deleteContact(@PathVariable Long id) {
        log.info("Deleting contact with ID = " + id);
        if (contactService.getById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        contactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }
}

