package com.cognifyz.task8.Services;

import com.cognifyz.task8.Model.BackgroundJob;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class JobQueueService {
    private static final String JOB_QUEUE = "task8:jobs";
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;
    public JobQueueService(StringRedisTemplate redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    public BackgroundJob addJob(String jobType, int durationSeconds) throws JacksonException {

        if (durationSeconds < 1 || durationSeconds > 60) {
            throw new IllegalArgumentException("Duration must be between 1 and 60 seconds");
        }
        BackgroundJob job = new BackgroundJob(
                UUID.randomUUID().toString(),
                jobType,
                "QUEUED",
                durationSeconds,
                durationSeconds,
                LocalDateTime.now().toString(),
                null,
                null
        );

        String jobJson = objectMapper.writeValueAsString(job);
        redisTemplate.opsForList().rightPush(JOB_QUEUE, jobJson);
        saveJobStatus(job);
        return job;
    }


    public String getNextJob() {
        return redisTemplate.opsForList().leftPop(JOB_QUEUE);
    }

    public void saveJobStatus(BackgroundJob job) {
        try {
            String json = objectMapper.writeValueAsString(job);
            redisTemplate.opsForValue().set(JOB_QUEUE + job.getJobId(), json);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public BackgroundJob getJobStatus(String jobId) {
        try {
            String json = redisTemplate.opsForValue().get(JOB_QUEUE + jobId);
            if (json == null) {
                return null;
            }
            return objectMapper.readValue(json, BackgroundJob.class);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long getQueueSize() {
        return redisTemplate.opsForList().size(JOB_QUEUE);
    }
}
