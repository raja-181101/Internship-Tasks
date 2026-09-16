package com.cognifyz.task8.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BackgroundJob {
    private String jobId;
    private String type;
    private String status;

    private int durationSeconds;
    private int remainingSeconds;

    private String createdAt;
    private String startedAt;
    private String completedAt;

}
