package com.automationtest.lib;

import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UtilsTest {

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void toJson() {
    }

    @Test
    void now() {
    }

    @Test
    void uuid() {
    }

    @Test
    void randomDigit() {
    }

    @Test
    void generatePassword() {
    }

    @Test
    void isJson() {
        String jsonString = "{\"status\": \"OK\"}";
        Assert.assertTrue(Utils.isJson(jsonString));

        String isNotJsonString = "isnotjsonstring";
        Assert.assertFalse(Utils.isJson(isNotJsonString));
    }

    @Test
    void isYaml() {
    }

    @Test
    void yamlToJson() {
    }

    @Test
    void jsonToYaml() {
    }

    @Test
    void zipFolder() {
    }

    @Test
    void unzipFile() {
    }

    @Test
    void deleteFileOrFolder() {
    }
}