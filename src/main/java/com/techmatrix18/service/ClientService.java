package com.techmatrix18.service;

import com.techmatrix18.dto.ClientDto;
import com.techmatrix18.dto.DepartmentDto;
import com.techmatrix18.model.Client;
import com.techmatrix18.model.Deal;
import com.techmatrix18.model.Department;
import com.techmatrix18.repository.ClientRepository;
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
public class ClientService {
    private ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    /**
     * Finds all clients by pages
     *
     * @param page
     * @param size
     * @return
     */
    public Page<Client> getAllPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        return clientRepository.findAll(pageable);
    }

    public ClientDto getByIdDto(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));
        return mapToDto(client);
    }

    private ClientDto mapToDto(Client client) {
        ClientDto dto = new ClientDto();
        dto.setId(client.getId());
        dto.setCompany(client.getCompany());
        dto.setFirstname(client.getFirstname());
        dto.setLastname(client.getLastname());
        dto.setEmail(client.getEmail());
        dto.setPhone(client.getPhone());
        dto.setType(client.getType());
        dto.setSource(client.getSource());
        dto.setTags(client.getTags());
        return dto;
    }

    public Optional<Client> getById(Long id) {
        return clientRepository.findById(id);
    }

    // Find a client by email
    public Optional<Client> getClientByEmail(String email) {
        return clientRepository.findByEmail(email);
    }

    // Find a client by phone
    public Optional<Client> getClientByPhone(String phone) {
        return clientRepository.findByPhone(phone);
    }

    // Find clients by last name
    public List<Client> getClientsByLastname(String lastname) {
        return clientRepository.findByLastname(lastname);
    }

    // Search by phone part
    public List<Client> searchClientsByPhone(String phonePart) {
        return clientRepository.findByPartPhone(phonePart);
    }

    // Search by email part
    public List<Client> searchClientsByEmail(String emailPart) {
        return clientRepository.findByPartEmail(emailPart);
    }

    // Search by part of a surname
    public List<Client> searchClientsByLastname(String lastnamePart) {
        return clientRepository.findByPartLastname(lastnamePart);
    }

    // Get client transactions
    public List<Client> getDealsByOwnerId(Long ownerId) {
        return clientRepository.findByOwnerId(ownerId);
    }

    // Saving or updating a client
    public Client saveClient(Client client) {
        return clientRepository.save(client);
    }

    // Deleting a client by ID
    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }
}

