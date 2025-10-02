package com.techmatrix18.repository;

import com.techmatrix18.enums.ActivityStatus;
import com.techmatrix18.enums.ActivityType;
import com.techmatrix18.enums.ClientType;
import com.techmatrix18.model.Activity;
import com.techmatrix18.model.Client;
import com.techmatrix18.model.Contact;
import com.techmatrix18.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@DataJpaTest
public class ActivityRepositoryTest {

    @Autowired
    private ActivityRepository activityRepository;

    @Test
    void testSaveActivity() {
        User owner = new User();
        owner.setId(1L);
        owner.setFirstname("Father");
        owner.setFirstname("Connor");
        owner.setEmail("father.connro@gmail.com");
        owner.setMan(true);
        owner.setPictureSet(true);

        Client client = new Client();
        client.setFirstname("Sarah");
        client.setLastname("Connor");
        client.setEmail("sarah.connor@gmail.com");
        client.setType(ClientType.INDIVIDUAL);
        client.setOwner(owner);

        Contact contact = new Contact();
        contact.setId(1L);
        contact.setClient(client);
        contact.setFirstname("Terminator 2");
        contact.setLastname("T800");
        contact.setEmail("terminator.t800@gmail.com");

        Activity activity = new Activity(1L, client, contact, ActivityType.CALL, owner, ActivityStatus.IN_PROGRESS);
        Activity saved = activityRepository.save(activity);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getType()).isEqualTo(ActivityType.CALL);
        assertThat(saved.getStatus()).isEqualTo(ActivityStatus.IN_PROGRESS);
    }
}

