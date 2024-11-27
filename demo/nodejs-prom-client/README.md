# NGINX + PROMETHEUS
```
$ curl -H 'Content-Type: application/json' localhost:3000/metrics
# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
# TYPE process_cpu_user_seconds_total counter
process_cpu_user_seconds_total 0

# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.
# TYPE process_cpu_system_seconds_total counter
process_cpu_system_seconds_total 0

# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.
# TYPE process_cpu_seconds_total counter
process_cpu_seconds_total 0

# HELP process_start_time_seconds Start time of the process since unix epoch in seconds.
# TYPE process_start_time_seconds gauge
process_start_time_seconds 1732681045

# HELP process_resident_memory_bytes Resident memory size in bytes.
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 41299968

# HELP nodejs_eventloop_lag_seconds Lag of event loop in seconds.
# TYPE nodejs_eventloop_lag_seconds gauge
nodejs_eventloop_lag_seconds 0

# HELP nodejs_eventloop_lag_min_seconds The minimum recorded event loop delay.
# TYPE nodejs_eventloop_lag_min_seconds gauge
nodejs_eventloop_lag_min_seconds 0.011665408

# HELP nodejs_eventloop_lag_max_seconds The maximum recorded event loop delay.
# TYPE nodejs_eventloop_lag_max_seconds gauge
nodejs_eventloop_lag_max_seconds 0.017301503

# HELP nodejs_eventloop_lag_mean_seconds The mean of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_mean_seconds gauge
nodejs_eventloop_lag_mean_seconds 0.01586833265116279

# HELP nodejs_eventloop_lag_stddev_seconds The standard deviation of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_stddev_seconds gauge
nodejs_eventloop_lag_stddev_seconds 0.0005174887599819624

# HELP nodejs_eventloop_lag_p50_seconds The 50th percentile of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_p50_seconds gauge
nodejs_eventloop_lag_p50_seconds 0.015908863

# HELP nodejs_eventloop_lag_p90_seconds The 90th percentile of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_p90_seconds gauge
nodejs_eventloop_lag_p90_seconds 0.016375807

# HELP nodejs_eventloop_lag_p99_seconds The 99th percentile of the recorded event loop delays.
# TYPE nodejs_eventloop_lag_p99_seconds gauge
nodejs_eventloop_lag_p99_seconds 0.016891903

# HELP nodejs_active_resources Number of active resources that are currently keeping the event loop alive, grouped by async resource type.
# TYPE nodejs_active_resources gauge
nodejs_active_resources{type="TTYWrap"} 2
nodejs_active_resources{type="TCPServerWrap"} 1
nodejs_active_resources{type="TCPSocketWrap"} 1
nodejs_active_resources{type="Immediate"} 1

# HELP nodejs_active_resources_total Total number of active resources.
# TYPE nodejs_active_resources_total gauge
nodejs_active_resources_total 5

# HELP nodejs_active_handles Number of active libuv handles grouped by handle type. Every handle type is C++ class name.
# TYPE nodejs_active_handles gauge
nodejs_active_handles{type="WriteStream"} 2
nodejs_active_handles{type="Server"} 1
nodejs_active_handles{type="Socket"} 1

# HELP nodejs_active_handles_total Total number of active handles.
# TYPE nodejs_active_handles_total gauge
nodejs_active_handles_total 4

# HELP nodejs_active_requests Number of active libuv requests grouped by request type. Every request type is C++ class name.
# TYPE nodejs_active_requests gauge

# HELP nodejs_active_requests_total Total number of active requests.
# TYPE nodejs_active_requests_total gauge
nodejs_active_requests_total 0

# HELP nodejs_heap_size_total_bytes Process heap size from Node.js in bytes.
# TYPE nodejs_heap_size_total_bytes gauge
nodejs_heap_size_total_bytes 17260544

# HELP nodejs_heap_size_used_bytes Process heap size used from Node.js in bytes.
# TYPE nodejs_heap_size_used_bytes gauge
nodejs_heap_size_used_bytes 10316424

# HELP nodejs_external_memory_bytes Node.js external memory size in bytes.
# TYPE nodejs_external_memory_bytes gauge
nodejs_external_memory_bytes 2279273

# HELP nodejs_heap_space_size_total_bytes Process heap space size total from Node.js in bytes.
# TYPE nodejs_heap_space_size_total_bytes gauge
nodejs_heap_space_size_total_bytes{space="read_only"} 0
nodejs_heap_space_size_total_bytes{space="new"} 8388608
nodejs_heap_space_size_total_bytes{space="old"} 8077312
nodejs_heap_space_size_total_bytes{space="code"} 524288
nodejs_heap_space_size_total_bytes{space="shared"} 0
nodejs_heap_space_size_total_bytes{space="new_large_object"} 0
nodejs_heap_space_size_total_bytes{space="large_object"} 270336
nodejs_heap_space_size_total_bytes{space="code_large_object"} 0
nodejs_heap_space_size_total_bytes{space="shared_large_object"} 0

# HELP nodejs_heap_space_size_used_bytes Process heap space size used from Node.js in bytes.
# TYPE nodejs_heap_space_size_used_bytes gauge
nodejs_heap_space_size_used_bytes{space="read_only"} 0
nodejs_heap_space_size_used_bytes{space="new"} 2031104
nodejs_heap_space_size_used_bytes{space="old"} 7536784
nodejs_heap_space_size_used_bytes{space="code"} 490640
nodejs_heap_space_size_used_bytes{space="shared"} 0
nodejs_heap_space_size_used_bytes{space="new_large_object"} 0
nodejs_heap_space_size_used_bytes{space="large_object"} 262160
nodejs_heap_space_size_used_bytes{space="code_large_object"} 0
nodejs_heap_space_size_used_bytes{space="shared_large_object"} 0

# HELP nodejs_heap_space_size_available_bytes Process heap space size available from Node.js in bytes.
# TYPE nodejs_heap_space_size_available_bytes gauge
nodejs_heap_space_size_available_bytes{space="read_only"} 0
nodejs_heap_space_size_available_bytes{space="new"} 2092416
nodejs_heap_space_size_available_bytes{space="old"} 401648
nodejs_heap_space_size_available_bytes{space="code"} 784
nodejs_heap_space_size_available_bytes{space="shared"} 0
nodejs_heap_space_size_available_bytes{space="new_large_object"} 4194304
nodejs_heap_space_size_available_bytes{space="large_object"} 0
nodejs_heap_space_size_available_bytes{space="code_large_object"} 0
nodejs_heap_space_size_available_bytes{space="shared_large_object"} 0

# HELP nodejs_version_info Node.js version info.
# TYPE nodejs_version_info gauge
nodejs_version_info{version="v20.17.0",major="20",minor="17",patch="0"} 1

# HELP nodejs_gc_duration_seconds Garbage collection duration by kind, one of major, minor, incremental or weakcb.
# TYPE nodejs_gc_duration_seconds histogram

# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter

ryanc@ryanw-laptop ~
$
```