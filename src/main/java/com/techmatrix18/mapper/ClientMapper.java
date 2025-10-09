package com.techmatrix18.mapper;

import com.techmatrix18.dto.ClientDto;
import com.techmatrix18.model.Client;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class ClientMapper {

    public static ClientDto toDto(Client client) {
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

    public static List<ClientDto> toDtoList(List<Client> clients) {
        return clients.stream()
                .map(ClientMapper::toDto)
                .collect(Collectors.toList());
    }

    public static Client toEntity(ClientDto clientDto) {
        Client client = new Client();
        client.setId(clientDto.getId());
        client.setCompany(clientDto.getCompany());
        client.setFirstname(clientDto.getFirstname());
        client.setLastname(clientDto.getLastname());
        client.setEmail(clientDto.getEmail());
        client.setPhone(clientDto.getPhone());
        client.setType(clientDto.getType());
        client.setSource(clientDto.getSource());
        client.setTags(clientDto.getTags());
        return client;
    }
}

