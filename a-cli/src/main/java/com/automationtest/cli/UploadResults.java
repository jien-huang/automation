package com.automationtest.cli;

import javax.inject.Inject;

import com.github.rvesse.airline.HelpOption;

public class UploadResults implements Runnable {
    private String url ;
    private String folder;

    public UploadResults(String url, String folder) {
        this.url = url;
        this.folder = folder;
    }
    @Override
    public void run() {
        // folder must exist! if not,that's a big problem.
        // then create one, put this situation in it.

        // zip the folder, upload to url

    }
    
}
