# Define variables for use in the Makefile
IMAGE_NAME = express-api
CONTAINER_NAME = express-api-container
PORT = 3000
TEST_URL = http://localhost:$(PORT)/api/greeting?name=TestUser

# Build the Docker image
build:
	@echo "Building Docker image..."
	docker build -t $(IMAGE_NAME) .

# Run the Docker container in detached mode
run:
	@echo "Running Docker container..."
	docker run --rm -d -p $(PORT):$(PORT) --name $(CONTAINER_NAME) $(IMAGE_NAME)

# Stop and remove the container
stop:
	@echo "Stopping and removing container..."
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

# Test the running service
test:
	@echo "Testing the service..."
	@if curl -s $(TEST_URL) | grep -q "Hello, TestUser!"; then \
	echo "Test passed!"; \
	else \
	echo "Test failed!"; \
	exit 1; \
	fi

# Clean up: remove the container and image
clean:
	@echo "Cleaning up..."
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true
	docker rmi $(IMAGE_NAME) || true

# Full cycle: build, run, test, and then clean up
all: build run test stop clean

# Default target
.PHONY: all build run stop test clean
