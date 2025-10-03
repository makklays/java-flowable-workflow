package com.techmatrix18.repository;

import com.techmatrix18.model.enums.ActivityStatus;
import com.techmatrix18.model.enums.ActivityType;
import com.techmatrix18.model.enums.ClientType;
import com.techmatrix18.model.Activity;
import com.techmatrix18.model.Client;
import com.techmatrix18.model.Contact;
import com.techmatrix18.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@DataJpaTest
class ActivityRepositoryTest {

    @Autowired
    private ActivityRepository activityRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private ContactRepository contactRepository;

    @Test
    void testSaveActivity() {
        // Сохраняем юзера
        User owner = new User();
        owner.setFirstname("Connor");
        owner.setLastname("Father");
        owner.setEmail("father.connor@gmail.com");
        owner.setMan(true);
        owner.setPictureSet(true);
        owner = userRepository.save(owner);

        // Сохраняем клиента
        Client client = new Client();
        client.setFirstname("Sarah");
        client.setLastname("Connor");
        client.setEmail("sarah.connor@gmail.com");
        client.setType(ClientType.INDIVIDUAL);
        client.setOwner(owner);
        client = clientRepository.save(client);

        // Сохраняем контакт
        Contact contact = new Contact();
        contact.setClient(client);
        contact.setFirstname("Terminator 2");
        contact.setLastname("T800");
        contact.setEmail("terminator.t800@gmail.com");
        contact = contactRepository.save(contact);

        // Теперь можно сохранять Activity
        Activity activity = new Activity(null, client, contact, ActivityType.CALL, owner, ActivityStatus.IN_PROGRESS);
        Activity saved = activityRepository.save(activity);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getType()).isEqualTo(ActivityType.CALL);
        assertThat(saved.getStatus()).isEqualTo(ActivityStatus.IN_PROGRESS);
    }
}

