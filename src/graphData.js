export const graphData = {
  "nodes": [
    { "id": "job1", "label": "Job 1", "status": "waiting" },
    { "id": "job2", "label": "Job 2", "status": "processing" },
    { "id": "job3", "label": "Job 3", "status": "failed" },
    { "id": "job4", "label": "Job 4", "status": "done" },
    { "id": "job5", "label": "Job 5", "status": "waiting" },
    { "id": "job6", "label": "Job 6", "status": "waiting" },
    { "id": "job7", "label": "Job 7", "status": "processing" },
    { "id": "job8", "label": "Job 8", "status": "failed" },
    { "id": "job9", "label": "Job 9", "status": "done" },
    { "id": "job10", "label": "Job 10", "status": "done" }
  ],
  "links": [
    { "source": "job1", "target": "job2", "status": "waiting" },
    { "source": "job2", "target": "job3", "status": "flowing" },
    { "source": "job3", "target": "job4", "status": "missing" },
    { "source": "job4", "target": "job1", "status": "flowing" },
    { "source": "job5", "target": "job6", "status": "waiting" },
    { "source": "job6", "target": "job7", "status": "waiting" },
    { "source": "job7", "target": "job8", "status": "flowing" },
    { "source": "job8", "target": "job9", "status": "missing" },
    { "source": "job9", "target": "job10", "status": "flowing" },
    { "source": "job10", "target": "job5", "status": "waiting" },
    { "source": "job1", "target": "job5", "status": "waiting" },
    { "source": "job6", "target": "job4", "status": "failed" },
    { "source": "job8", "target": "job3", "status": "flowing" },
    { "source": "job6", "target": "job1", "status": "waiting" },
    { "source": "job7", "target": "job1", "status": "flowing" },
  ]
};
