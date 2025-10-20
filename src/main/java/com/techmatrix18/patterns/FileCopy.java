package com.techmatrix18.patterns;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

/**
 * FileCopy - try-with-resources
 *
 * @author Alexander Kuziv
 * @since 20.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public class FileCopy {

    public static void main(String[] args) {
        // Paths to files
        String inputFile = "file.txt";
        String outputFile = "output.txt";

        // try-with-resources automatically closes resources after use
        try (BufferedReader reader = new BufferedReader(new FileReader(inputFile));
             BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile))) {

            String line;
            while ((line = reader.readLine()) != null) {
                writer.write(line);
                writer.newLine(); // add a newline
            }

            System.out.println("File has been copied successfully!");

        } catch (IOException e) {
            System.err.println("An error occurred while working with files:");
            e.printStackTrace();
        }
    }
}

