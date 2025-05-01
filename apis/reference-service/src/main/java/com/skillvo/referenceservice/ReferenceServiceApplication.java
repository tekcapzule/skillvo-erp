package com.skillvo.referenceservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.skillvo")
public class ReferenceServiceApplication {

  public static void main(String[] args) {
    SpringApplication.run(ReferenceServiceApplication.class, args);
  }

}
