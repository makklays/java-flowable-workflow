package com.techmatrix18.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * For Tables:
 * act_hi_procinst (history of processes), act_ru_execution (active processes)
 * act_ru_task (active tasks)
 * act_hi_taskinst (history of tasks)
 * act_re_procdef, act_re_deployment
 *
 * @author Alexander Kuziv
 * @since 28.09.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

/*@Repository
public interface FlowableRepository extends JpaRepository<Object, String> {

    /**
     * Get all process of user, statuses, start date and end date.
     *
     * @param userId
     * @return List <Object>
     */
    /*@Query(value = """
        SELECT hi.proc_inst_id AS process_instance_id,
               pd.name AS process_name,
               pd.key_ AS process_key,
               pd.version AS process_version,
               hi.start_time,
               hi.end_time
        FROM act_hi_procinst hi
        JOIN act_re_procdef pd ON hi.proc_def_id = pd.id_
        WHERE hi.start_user_id = :userId
        """, nativeQuery = true)
    List<Object[]> findProcessesByUser(@Param("userId") String userId);

    /**
     * Get users' current tasks
     *
     * @param userId
     * @return List <Object>
     */
    /*@Query(value = """
        SELECT t.id_, t.name_, t.assignee_, t.create_time_
        FROM act_ru_task t
        WHERE t.assignee_ = :userId
        """, nativeQuery = true)
    List<Object[]> findActiveTasksByUser(@Param("userId") String userId);

    /**
     * For analysis of completed tasks, audit, reporting.
     *
     * @param userId
     * @return List <Object>
     */
    /*@Query(value = """
        SELECT h.id_, h.name_, h.assignee_, h.start_time_, h.end_time_
        FROM act_hi_taskinst h
        WHERE h.assignee_ = :userId
        """, nativeQuery = true)
    List<Object[]> findHistoricTasksByUser(@Param("userId") String userId);

    /**
     * Get a list of processes, versions, and deployment information.
     *
     * @return List <Object>
     */
    /*@Query(value = """
        SELECT d.id_, d.name_, d.deploy_time_
        FROM act_re_deployment d
        """, nativeQuery = true)
    List<Object[]> findAllDeployments();
    */
//}

