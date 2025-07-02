package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.util.Collections;

@SpringBootApplication
public class AuthBackendApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(AuthBackendApplication.class);

		String port = System.getenv("PORT");
		if (port != null) {
			app.setDefaultProperties(Collections.singletonMap("server.port", port));
		}
		app.run(args);
	
	}

}
