package com.cognifyz.task8.Services;

import com.cognifyz.task8.Model.BackgroundJob;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;

@Service
public class BackgroundJobWorker {

    private final JobQueueService jobQueueService;

    private final ObjectMapper objectMapper;

    public BackgroundJobWorker(JobQueueService jobQueueService, ObjectMapper objectMapper) {
        this.jobQueueService = jobQueueService;
        this.objectMapper = objectMapper;
    }


    @Scheduled(fixedDelay = 3000)
    public void processJob() {
        try {
            String jobJson = jobQueueService.getNextJob();
            if (jobJson == null) {
                return;
            }
            BackgroundJob job = objectMapper.readValue(jobJson, BackgroundJob.class);
            job.setStatus("PROCESSING");
            job.setStartedAt(LocalDateTime.now().toString());
            jobQueueService.saveJobStatus(job);
            for (int remaining = job.getDurationSeconds(); remaining > 0; remaining--) {
                job.setRemainingSeconds(remaining);
                jobQueueService.saveJobStatus(job);
                Thread.sleep(1000);
            }

            job.setRemainingSeconds(0);
            job.setStatus("COMPLETED");
            job.setCompletedAt(LocalDateTime.now().toString());
            jobQueueService.saveJobStatus(job);

        } catch (Exception exception) {
            System.err.println("Background job failed: " + exception.getMessage());
        }
    }
}
