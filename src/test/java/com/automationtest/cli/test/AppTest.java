package com.automationtest.cli.test;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import com.automationtest.cli.App;

public class AppTest {
    private final ByteArrayOutputStream consoleText = new ByteArrayOutputStream();
    private final PrintStream console = System.out;
    private final PrintStream originalErr = System.err;

   @Before
   public void setUp() {
      System.setOut(new PrintStream(consoleText));
   }

    @After
    public void restoreStreams() {
        System.setOut(console);
        System.setErr(originalErr);
    }

    
}
