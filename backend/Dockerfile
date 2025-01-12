# Use a JDK base image
FROM openjdk:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the build files
COPY build/libs/*.jar app.jar

# Expose the port the backend runs on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
