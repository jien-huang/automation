package com.automation.server.services;

import java.io.FileNotFoundException;
import java.nio.file.FileSystemException;
import java.nio.file.Path;
import java.util.stream.Stream;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    void init() throws FileSystemException;

    String store(MultipartFile file) throws FileSystemException;

    Stream<Path> loadAll() throws FileSystemException;

    Path load(String filename);

    Resource loadAsResource(String filename) throws FileNotFoundException;

    void deleteAll();
}
