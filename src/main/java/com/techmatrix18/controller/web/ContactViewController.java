package com.techmatrix18.controller.web;

import com.techmatrix18.dto.ClientDto;
import com.techmatrix18.dto.ContactDto;
import com.techmatrix18.model.Client;
import com.techmatrix18.model.Contact;
import com.techmatrix18.model.User;
import com.techmatrix18.model.enums.ClientType;
import com.techmatrix18.service.ClientService;
import com.techmatrix18.service.ContactService;
import com.techmatrix18.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.logging.Logger;

/**
 * Contact controller with endpoints for contacts pages
 *
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class ContactViewController {

    Logger log = Logger.getLogger(ContactViewController.class.getName());

    private final ContactService contactService;
    private final ClientService clientService;
    private final UserService userService;

    public ContactViewController(ContactService contactService, ClientService clientService, UserService userService) {
        this.contactService = contactService;
        this.clientService = clientService;
        this.userService = userService;
    }

    @GetMapping("/contacts")
    public String getAllContacts(@RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "10") int size,
                                Model model) {
        Page<Contact> contactsPage = contactService.getAllPaginated(page, size);

        model.addAttribute("contactsPage", contactsPage);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", contactsPage.getTotalPages());

        return "contacts/index";
    }

    @GetMapping("/contacts/add")
    public String addContact(Model model) {
        model.addAttribute("contactDto", new ContactDto()); // empty form
        model.addAttribute("clients", clientService.getAllClients());
        return "contacts/add";
    }

    @PostMapping("/contacts/add")
    public String addContactPost(@Valid @ModelAttribute("contactDto") ContactDto contactDto,
                                BindingResult result,
                                Model model,
                                RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "contacts/add"; // return form with errors
        }

        // get current user
        User user = userService.getById(1L);

        // Mapping DTO → Entity
        Contact contact = new Contact();
        contact.setFirstname(contactDto.getFirstname());
        contact.setLastname(contactDto.getLastname());
        contact.setEmail(contactDto.getEmail());
        contact.setPhone(contactDto.getPhone());
        contact.setClient(contactDto.getClient());
        contact.setPosition(contactDto.getPosition());
        contact.setCreatedAt(LocalDateTime.now());
        contact.setUpdatedAt(LocalDateTime.now());

        // save Contact in database
        contactService.saveContact(contact);
        redirectAttributes.addFlashAttribute("successMessage", "Contact was successfully added!");

        return "redirect:/contacts";
    }

    @GetMapping("/contacts/edit/{id}")
    public String editContact(@PathVariable Long id, Model model) {
        ContactDto contactDto = contactService.getByIdDto(id);
        model.addAttribute("contactDto", contactDto);
        model.addAttribute("clients", clientService.getAllClients());
        return "contacts/edit";
    }

    @PostMapping("/contacts/edit")
    public String editContactPost(@Valid @ModelAttribute("contactDto") ContactDto contactDto,
                                 BindingResult result,
                                 Model model,
                                 RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "contacts/edit"; // return form with errors
        }

        // get current user
        User user = userService.getById(1L);

        // Mapping DTO → Entity
        Contact contact = contactService.getById(contactDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Contact not found with id " + contactDto.getId()));
        contact.setFirstname(contactDto.getFirstname());
        contact.setLastname(contactDto.getLastname());
        contact.setEmail(contactDto.getEmail());
        contact.setPhone(contactDto.getPhone());
        contact.setClient(contactDto.getClient());
        contact.setPosition(contactDto.getPosition());
        contact.setUpdatedAt(LocalDateTime.now());

        contactService.saveContact(contact); // update entity

        redirectAttributes.addFlashAttribute("successMessage", "Contact was successfully updated!");
        return "redirect:/contacts";
    }

    @GetMapping("/contacts/view/{id}")
    public String viewContact(@PathVariable Long id, Model model) {
        Contact contact = contactService.getById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contact not found with id " + id));
        model.addAttribute("contact", contact);
        return "contacts/view";
    }

    @GetMapping("/contacts/delete/{id}")
    public String deleteContact(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        contactService.deleteContact(id);
        redirectAttributes.addFlashAttribute("successMessage", "Contact was successfully deleted!");
        return "redirect:/contacts";
    }
}

