# Use a lightweight Java 17 image
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the Maven wrapper files and give permission
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw

# Pre-download dependencies
RUN ./mvnw dependency:go-offline

# Copy the full source
COPY src ./src

# Package the application
RUN ./mvnw clean package -DskipTests

# Run the app
CMD ["java", "-jar", "target/auth-backend-0.0.1-SNAPSHOT.jar"]
