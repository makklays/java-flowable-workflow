package com.techmatrix18.controller.web;

import com.techmatrix18.dto.ClientDto;
import com.techmatrix18.dto.DepartmentDto;
import com.techmatrix18.model.Client;
import com.techmatrix18.model.Department;
import com.techmatrix18.model.User;
import com.techmatrix18.model.enums.ClientType;
import com.techmatrix18.service.ClientService;
import com.techmatrix18.service.DepartmentService;
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
 * Client controller with endpoints for clients pages
 *
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class ClientViewController {

    Logger log = Logger.getLogger(ClientViewController.class.getName());

    private final ClientService clientService;
    private final UserService userService;

    public ClientViewController(ClientService clientService, UserService userService) {
        this.clientService = clientService;
        this.userService = userService;
    }

    @GetMapping("/clients")
    public String getAllClients(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size,
                                    Model model) {
        Page<Client> clientsPage = clientService.getAllPaginated(page, size);

        model.addAttribute("clientsPage", clientsPage);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", clientsPage.getTotalPages());

        return "clients/index";
    }

    @GetMapping("/clients/add")
    public String addClient(Model model) {
        model.addAttribute("clientDto", new ClientDto()); // empty form
        model.addAttribute("types", Arrays.asList(ClientType.values()));
        return "clients/add";
    }

    @PostMapping("/clients/add")
    public String addClientPost(@Valid @ModelAttribute("clientDto") ClientDto clientDto,
                                    BindingResult result,
                                    Model model,
                                    RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "clients/add"; // return form with errors
        }

        // get current user
        User user = userService.getById(1L);

        // Mapping DTO → Entity
        Client client = new Client();
        client.setCompany(clientDto.getCompany());
        client.setFirstname(clientDto.getFirstname());
        client.setLastname(clientDto.getLastname());
        client.setEmail(clientDto.getEmail());
        client.setPhone(clientDto.getPhone());
        client.setType(clientDto.getType());
        client.setSource(clientDto.getSource());
        client.setTags(clientDto.getTags());
        client.setOwner(user);
        client.setRegisteredAt(LocalDateTime.now());
        client.setCreatedAt(LocalDateTime.now());
        client.setUpdatedAt(LocalDateTime.now());

        // save Client in database
        clientService.saveClient(client);
        redirectAttributes.addFlashAttribute("successMessage", "Client was successfully added!");

        return "redirect:/clients";
    }

    @GetMapping("/clients/edit/{id}")
    public String editClient(@PathVariable Long id, Model model) {
        ClientDto clientDto = clientService.getByIdDto(id);
        model.addAttribute("clientDto", clientDto);
        model.addAttribute("types", Arrays.asList(ClientType.values()));
        return "clients/edit";
    }

    @PostMapping("/clients/edit")
    public String editClientPost(@Valid @ModelAttribute("clientDto") ClientDto clientDto,
                                     BindingResult result,
                                     Model model,
                                     RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "clients/edit"; // return form with errors
        }

        // get current user
        User user = userService.getById(1L);

        // Mapping DTO → Entity
        Client client = clientService.getById(clientDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Client not found with id " + clientDto.getId()));
        client.setCompany(clientDto.getCompany());
        client.setFirstname(clientDto.getFirstname());
        client.setLastname(clientDto.getLastname());
        client.setEmail(clientDto.getEmail());
        client.setPhone(clientDto.getPhone());
        client.setType(clientDto.getType());
        client.setSource(clientDto.getSource());
        client.setTags(clientDto.getTags());
        client.setOwner(user);
        client.setUpdatedAt(LocalDateTime.now());

        clientService.saveClient(client); // update entity

        redirectAttributes.addFlashAttribute("successMessage", "Client was successfully updated!");
        return "redirect:/clients";
    }

    @GetMapping("/clients/view/{id}")
    public String viewClient(@PathVariable Long id, Model model) {
        Client client = clientService.getById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client not found with id " + id));
        model.addAttribute("client", client);
        return "clients/view";
    }

    @GetMapping("/clients/delete/{id}")
    public String deleteClient(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        clientService.deleteClient(id);
        redirectAttributes.addFlashAttribute("successMessage", "Client was successfully deleted!");
        return "redirect:/clients";
    }
}

