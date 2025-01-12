package com.example.InventoryManagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class InventoryManagementApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().load(); // Load environment variables
		System.setProperty("MONGO_DB_URI", dotenv.get("MONGO_DB_URI")); // Set as system property
		SpringApplication.run(InventoryManagementApplication.class, args);
	}

}
