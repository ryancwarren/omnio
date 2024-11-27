# Use the latest Prometheus image   
FROM prom/prometheus:latest

# Create a directory for our custom configuration
WORKDIR /etc/prometheus

# Copy our custom configuration file into the container
COPY prometheus.yml /etc/prometheus/prometheus.yml

# Expose the Prometheus server port
EXPOSE 9090

# Start Prometheus with this configuration
CMD [ "--config.file=/etc/prometheus/prometheus.yml", "--storage.tsdb.path=/prometheus", "--web.console.libraries=/usr/share/prometheus/console_libraries", "--web.console.templates=/usr/share/prometheus/consoles" ]