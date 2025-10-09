package com.techmatrix18.controller.api;

import com.techmatrix18.dto.ClientDto;
import com.techmatrix18.mapper.ClientMapper;
import com.techmatrix18.model.Client;
import com.techmatrix18.service.ClientService;
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
 * Controller for registering clients in the system.
 * Processes HTTP-requests, related to client.
 *
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@RestController
@Tag(name = "Clients", description = "Client management API")
@RequestMapping("/api/v1/clients")
public class ClientController {

    private ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    private static final Logger log = Logger.getLogger(ClientController.class.getName());

    @GetMapping
    @Operation(summary = "Get all clients", description = "Returns list of all clients")
    public ResponseEntity<List<ClientDto>> getAllClients() {
        log.info("Fetching all clients");
        List<Client> clients = clientService.getAll();
        return ResponseEntity.ok(ClientMapper.toDtoList(clients));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get client by ID", description = "Returns a client by its unique ID")
    public ResponseEntity<ClientDto> getClient(@PathVariable Long id) {
        log.info("Fetching client with ID = " + id);
        Optional<Client> client = clientService.getById(id);
        if (client.isPresent()) {
            return ResponseEntity.ok(ClientMapper.toDto(client.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    @Operation(summary = "Create new client", description = "Adds a new client to the system")
    public ResponseEntity addClient(@Valid @RequestBody ClientDto clientDto) {
        log.info("Creating new client ID = " + clientDto.getCompany());
        Client client = ClientMapper.toEntity(clientDto);
        Client saved = clientService.saveClient(client);
        return ResponseEntity
                .created(URI.create("/api/v1/clients/" + saved.getId()))
                .body(ClientMapper.toDto(saved));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update existing client by ID", description = "Updates data for an existing client by ID")
    public ResponseEntity updateClient(@PathVariable Long id, @Valid @RequestBody ClientDto clientDto) {
        Optional<Client> exist = clientService.getById(id);
        if (exist.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        log.info("Updating client with ID + " + id);

        Client client = exist.get();
        client.setCompany(clientDto.getCompany());
        client.setFirstname(clientDto.getFirstname());
        client.setLastname(clientDto.getLastname());
        client.setType(clientDto.getType());
        client.setEmail(clientDto.getEmail());
        client.setPhone(clientDto.getPhone());
        client.setSource(clientDto.getSource());
        client.setTags(clientDto.getTags());
        client.setUpdatedAt(LocalDateTime.now());
        Client updated = clientService.saveClient(client);

        return ResponseEntity.ok(ClientMapper.toDto(updated));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete client by ID", description = "Deletes a client by ID")
    public ResponseEntity deleteClient(@PathVariable Long id) {
        log.info("Deleting Client ID = " + id);
        if (clientService.getById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}

