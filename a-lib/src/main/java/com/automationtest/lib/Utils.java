package com.automationtest.lib;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import com.fasterxml.jackson.dataformat.yaml.YAMLMapper;
import com.google.common.base.Strings;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

public class Utils {
    private static final Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private static final ObjectMapper mapper = new ObjectMapper();

    public static String toJson(final Object obj) {
        return gson.toJson(obj);
    }

    public static String now() {
        final Date date = new Date();
        final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssZ");
        return simpleDateFormat.format(date);
    }

    public static String uuid() {
        return UUID.randomUUID().toString();
    }

    public static String randomDigit() {
        return String.valueOf(new Random().nextInt(99999));
    }

    public static String generatePassword() {
        final StringBuilder password = new StringBuilder();
        for (final int i : new Random().ints(Constants.PASSWORD_LENGTH, 32, 126).toArray()) {
            password.append((char) i);
        }
        return password.toString();
    }

    public static boolean isJson(final String json) {
        try {
            mapper.reader().readTree(json);
        } catch (final Exception e) {
            return false;
        }
        return true;
    }

    public static boolean isYaml(final String yaml) {
        try {
            final ObjectMapper yamlReader = new ObjectMapper(new YAMLFactory());
            yamlReader.readValue(yaml, Object.class);
        } catch (final Exception e) {
            return false;
        }
        return true;
    }

    public static String yamlToJson(final String yaml) throws IOException {
        if (Strings.isNullOrEmpty(yaml)) {
            return null;
        }
        final ObjectMapper yamlReader = new ObjectMapper(new YAMLFactory());
        final Object obj = yamlReader.readValue(yaml, Object.class);
        final ObjectMapper jsonWriter = new ObjectMapper();
        return jsonWriter.writerWithDefaultPrettyPrinter().writeValueAsString(obj);
    }

    public static String jsonToYaml(final String json) throws IOException {
        if (Strings.isNullOrEmpty(json)) {
            return null;
        }
        final JsonNode jsonNode = mapper.reader().readTree(json);
        return new YAMLMapper().writeValueAsString(jsonNode);
    }

    public void zipFolder(File srcFolder, File destZipFile) throws Exception {
        try (FileOutputStream fileWriter = new FileOutputStream(destZipFile);
             ZipOutputStream zip = new ZipOutputStream(fileWriter)) {

            addFolderToZip(srcFolder, srcFolder, zip);
        }
    }

    private void addFileToZip(File rootPath, File srcFile, ZipOutputStream zip) throws Exception {

        if (srcFile.isDirectory()) {
            addFolderToZip(rootPath, srcFile, zip);
        } else {
            byte[] buf = new byte[1024];
            int len;
            try (FileInputStream in = new FileInputStream(srcFile)) {
                String name = srcFile.getPath();
                name = name.replace(rootPath.getPath(), "");
                System.out.println("Zip " + srcFile + "\n to " + name);
                zip.putNextEntry(new ZipEntry(name));
                while ((len = in.read(buf)) > 0) {
                    zip.write(buf, 0, len);
                }
            }
        }
    }

    private void addFolderToZip(File rootPath, File srcFolder, ZipOutputStream zip) throws Exception {
        for (File fileName : srcFolder.listFiles()) {
            addFileToZip(rootPath, fileName, zip);
        }
    }

    public static void unzipFile(final String ziFile, final String destFolder) throws IOException {
        InputStream input;
        OutputStream output;
        final File destDir = new File(destFolder);
        final ZipFile zipfile = new ZipFile(new File(ziFile));
        final Enumeration zipEntries = zipfile.entries();
        while (zipEntries.hasMoreElements()) {
            final ZipEntry entry = (ZipEntry) zipEntries.nextElement();
            if (entry.isDirectory()) {
                new File(destDir, entry.getName()).mkdir();
                continue;
            }
            input = new BufferedInputStream(zipfile.getInputStream(entry));
            final File destFile = new File(destDir, entry.getName());
            final FileOutputStream fos = new FileOutputStream(destFile);
            output = new BufferedOutputStream(fos);
            copyStreams(input, output);
            input.close();
            output.flush();
            output.close();
        }
    }

    private static void copyStreams(final InputStream input, final OutputStream output) throws IOException {
        int count;
        final byte[] data = new byte[1024];
        while ((count = input.read(data, 0, 1024)) != -1) {
            output.write(data, 0, count);
        }
    }

    public static void deleteFileOrFolder(final String... files) {
        for (final String fileName : files) {
            final File file = new File(fileName);
            if (file.exists()) {
                if (file.isDirectory()) {
                    for (final File subFile : Objects.requireNonNull(file.listFiles())) {
                        deleteFileOrFolder(subFile.getAbsolutePath());
                    }
                    file.delete();
                } else {
                    file.delete();
                }
            }
        }
    }
}
