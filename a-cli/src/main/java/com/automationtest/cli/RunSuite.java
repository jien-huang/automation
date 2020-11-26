package com.automationtest.cli;

import javax.inject.Inject;

import com.github.rvesse.airline.HelpOption;
import com.github.rvesse.airline.annotations.Command;
import com.github.rvesse.airline.annotations.Option;
import com.github.rvesse.airline.annotations.OptionType;
import com.github.rvesse.airline.annotations.restrictions.AllowedRawValues;
import com.github.rvesse.airline.annotations.restrictions.Pattern;
import com.github.rvesse.airline.annotations.restrictions.Required;

@Command(name = "run-suite", description = "kick off one automation suite")
public class RunSuite implements Runnable {
    @Inject
    private HelpOption<RunSuite> help;

    @Option(type = OptionType.COMMAND, name = { "-b",
            "--browser" }, description = "Type of Browser.", title = "Browser type: chrome|firefox|edge")
    @AllowedRawValues(allowedValues = { "chrome", "firefox", "edge" })
    protected String browser = "chrome";

    @Option(type = OptionType.COMMAND, name = { "-m",
            "--mode" }, description = "Headless Mode", title = "Headless Mode")
    @AllowedRawValues(allowedValues = { "true", "false" })
    protected String headless = "true";

    @Option(type = OptionType.COMMAND, name = { "-l",
            "--url" }, description = "URL of the Application Under Test.", title = "Default URL")
    @Pattern(pattern = "^(http://.*):(d*)(.*)u=(.*)&p=(.*)")
    protected String url = "http://localhost";

    @Option(type = OptionType.COMMAND, name = {"-s", "--suite"}, description = "Automation Test Suite Name", title = "Suite Name")
    @Required
    protected String suiteName = "";

    @Override
    public void run() {
        if (!help.showHelpIfRequested()) {
            if(!"".equals(suiteName)) {
                System.out.println("About to kick off suite: " + suiteName);
                System.out.println("With options: browser -> " + browser + " headless -> " + headless + " url -> " + url);
            } else {
                System.out.println("Please Provide Suite Name");
            }
        }
    }
}
