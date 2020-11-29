/*
 * This Java source file was generated by the Gradle 'init' task.
 */
package com.automation.server;

import com.automation.server.services.StorageProperties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(StorageProperties.class)
@SpringBootApplication
public class Server {
	public static void main(String[] args) {
		SpringApplication.run(Server.class, args);
	}
}
