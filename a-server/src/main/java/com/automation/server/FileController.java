package com.automation.server;

import com.automation.server.services.FileResponse;
import com.automation.server.services.FileSystemStorageService;
import com.automation.server.services.StorageService;
import com.automationtest.lib.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.google.gson.JsonObject;

import java.io.FileNotFoundException;
import java.nio.file.FileSystemException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
public class FileController {

    private final Logger logger = LoggerFactory.getLogger("RestController");

    @Autowired
    private StorageService storageService ;

    @GetMapping(value = "/ping")
    @ResponseBody
    public String ping() {
        logger.debug("we receive a ping.");
        final JsonObject json = new JsonObject();
        json.addProperty(Constants.STATUS, Constants.OK);
        return json.toString();
    }

    @GetMapping("/")
    public String listAllFiles(Model model) throws FileSystemException {

        model.addAttribute("files", storageService.loadAll().map(
                path -> ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("/download/")
                        .path(path.getFileName().toString())
                        .toUriString())
                .collect(Collectors.toList()));

        return "listFiles";
    }

    @GetMapping("/download/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) throws FileNotFoundException {

        Resource resource = storageService.loadAsResource(filename);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PostMapping("/upload-file")
    @ResponseBody
    public FileResponse uploadFile(@RequestParam("file") MultipartFile file) throws FileSystemException {
        String name = storageService.store(file);

        String uri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/download/")
                .path(name)
                .toUriString();

        return new FileResponse(name, uri, file.getContentType(), file.getSize());
    }

    @PostMapping("/upload-multiple-files")
    @ResponseBody
    public List<FileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) throws FileSystemException {
        List<FileResponse> list = new ArrayList<>();
        for (MultipartFile file : files) {
            FileResponse fileResponse = uploadFile(file);
            list.add(fileResponse);
        }
        return list;
    }
}
