package com.automationtest.lib;

import com.google.inject.Inject;
import com.google.inject.Singleton;

import java.util.Properties;

@Singleton
public class Config {
    @Inject
    private Properties properties;

    public void set(String key, String value) {
        properties.setProperty(key, value);
    }

    public String get(String key) {
        return properties.get(key).toString();
    }

    public Properties all() {
        return properties;
    }

    public String toString() {
        return properties.toString();
    }
}