# Use an official lightweight Java image
FROM eclipse-temurin:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Pre-download dependencies
RUN ./mvnw dependency:go-offline

# Copy the full source code
COPY src ./src

# Build the Spring Boot app (skip tests for faster build)
RUN ./mvnw clean package -DskipTests

# Expose the port your Spring Boot app runs on
EXPOSE 4566

# Run the application JAR
CMD ["java", "-jar", "target/*.jar"]
