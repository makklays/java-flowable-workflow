package com.techmatrix18.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Service for Redis operations.
 *
 * opsForValue()  операции со строками (String)  SET, GET
 * opsForList()	  операции со списками	         LPUSH, RPOP
 * opsForSet()	  операции с множествами	     SADD, SMEMBERS
 * opsForZSet()	  операции с сортированными множествами	ZADD, ZRANGE
 * opsForHash()	  операции с хэшами	             HSET, HGET
 *
 * @author Alexander Kuziv
 * @since 29.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Service
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;;

    public RedisService(RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // ---------- STRING ----------
    public void saveValue(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public String getValue(String key) {
        Object value = redisTemplate.opsForValue().get(key);
        return value != null ? value.toString() : null;
    }

    public void deleteValue(String key) {
        redisTemplate.delete(key);
    }

    // ---------- LIST ----------
    public void addToList(String key, String... values) {
        redisTemplate.opsForList().rightPushAll(key, values);
    }

    public List<Object> getList(String key) {
        return redisTemplate.opsForList().range(key, 0, -1);
    }

    public void removeFromList(String key, Object value) {
        redisTemplate.opsForList().remove(key, 1, value);
    }

    // ---------- SET ----------
    public void addToSet(String key, String... values) {
        redisTemplate.opsForSet().add(key, (Object[]) values);
    }

    public Set<Object> getSet(String key) {
        return redisTemplate.opsForSet().members(key);
    }

    public void removeFromSet(String key, Object value) {
        redisTemplate.opsForSet().remove(key, value);
    }

    // ---------- HASH ----------
    public void putToHash(String key, String field, Object value) {
        redisTemplate.opsForHash().put(key, field, value);
    }

    public Object getFromHash(String key, String field) {
        return redisTemplate.opsForHash().get(key, field);
    }

    public Map<Object, Object> getAllFromHash(String key) {
        return redisTemplate.opsForHash().entries(key);
    }

    public void deleteFromHash(String key, String field) {
        redisTemplate.opsForHash().delete(key, field);
    }

    // ---------- SORTED SET (ZSET) ----------
    public void addToZSet(String key, String value, double score) {
        redisTemplate.opsForZSet().add(key, value, score);
    }

    public Set<Object> getZSet(String key) {
        return redisTemplate.opsForZSet().range(key, 0, -1);
    }

    public void removeFromZSet(String key, String value) {
        redisTemplate.opsForZSet().remove(key, value);
    }
}

