package com.automation.server.services;

import com.automationtest.lib.Utils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.stream.Stream;

@Service
public class FileSystemStorageService implements StorageService {
    private final Logger logger = LoggerFactory.getLogger ("FileSystemStorageService");
    private final Path rootLocation;

    @Autowired
    public FileSystemStorageService(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
    }

    @Override
    @PostConstruct
    public void init() throws FileSystemException {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new FileSystemException("Could not initialize storage location");
        }
    }

    @Override
    public String store(MultipartFile file) throws FileSystemException {
        String filename = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if (file.isEmpty()) {
                throw new FileSystemException("Failed to store empty file " + filename);
            }
            if (filename.contains("..")) {
                // This is a security check
                throw new FileSystemException(
                        "Cannot store file with relative path outside current directory "
                                + filename);
            }
            try (InputStream inputStream = file.getInputStream()) {
                logger.debug(this.rootLocation.resolve(filename).toString());
                Files.copy(inputStream, this.rootLocation.resolve(filename),
                        StandardCopyOption.REPLACE_EXISTING);
                // if it is a zip file, unzip it
                if(filename.endsWith(".zip")){
                    Utils.unzipFile(this.rootLocation.toString()+"/"+filename, this.rootLocation.toString());
                }
            }
        }
        catch (IOException e) {
            logger.error(e.getMessage());
            throw new FileSystemException("Failed to store file " + filename);
        }

        return filename;
    }

    @Override
    public Stream<Path> loadAll() throws FileSystemException {
        try {
            return Files.walk(this.rootLocation, 1024)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(this.rootLocation::relativize);
        }
        catch (IOException e) {
            throw new FileSystemException("Failed to read stored files");
        }

    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) throws FileNotFoundException {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new FileNotFoundException(
                        "Could not read file: " + filename);
            }
        }
        catch (MalformedURLException | FileNotFoundException e) {
            throw new FileNotFoundException("Could not read file: " + filename);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }
}
