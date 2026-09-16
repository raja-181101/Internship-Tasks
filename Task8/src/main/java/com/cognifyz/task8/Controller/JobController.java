package com.cognifyz.task8.Controller;

import com.cognifyz.task8.Model.BackgroundJob;
import com.cognifyz.task8.Services.JobQueueService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private final JobQueueService jobQueueService;
    public JobController(JobQueueService jobQueueService) {
        this.jobQueueService = jobQueueService;
    }

    @PostMapping("/timer")
    public ResponseEntity<?> createTimerJob(@RequestParam int seconds) {
        try {
            BackgroundJob job = jobQueueService.addJob("TIMER_JOB", seconds);
            return ResponseEntity.accepted().body(job);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body(Map.of("message", "Unable to submit background job"));
        }
    }

    @GetMapping("/queue-size")
    public ResponseEntity<?> getQueueSize() {
        Long size = jobQueueService.getQueueSize();
        return ResponseEntity.ok(Map.of("queuedJobs", size == null ? 0 : size));
    }
    @GetMapping("/{jobId}")
    public ResponseEntity<?> getJobStatus(
            @PathVariable String jobId
    ) {

        BackgroundJob job =
                jobQueueService.getJobStatus(jobId);

        if (job == null) {
            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(job);
    }
}
