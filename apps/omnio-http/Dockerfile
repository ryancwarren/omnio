# Use an official Nginx runtime as the base image
FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy the static HTML files into the container
# Assuming your HTML files are in a directory named 'static' in your project root
COPY static/ .

# Optionally, if you have a custom nginx configuration
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Nginx will run by default when the container starts, so no need for CMD or ENTRYPOINT