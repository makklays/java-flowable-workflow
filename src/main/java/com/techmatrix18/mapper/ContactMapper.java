package com.techmatrix18.mapper;

import com.techmatrix18.dto.ContactDto;
import com.techmatrix18.model.Contact;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Alexander Kuziv
 * @since 09.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class ContactMapper {

    public static ContactDto toDto (Contact contact) {
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

    public static List<ContactDto> toDtoList (List<Contact> contacts) {
        return contacts.stream().map(contact -> ContactMapper.toDto(contact)).collect(Collectors.toList());
    }

    public static Contact toEntity(ContactDto contactDto) {
        Contact contact = new Contact();
        contact.setId(contactDto.getId());
        contact.setClient(contactDto.getClient());
        contact.setFirstname(contactDto.getFirstname());
        contact.setLastname(contactDto.getLastname());
        contact.setEmail(contactDto.getEmail());
        contact.setPhone(contactDto.getPhone());
        contact.setPosition(contactDto.getPosition());
        return contact;
    }
}

