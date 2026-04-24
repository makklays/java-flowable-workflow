package com.techmatrix18.utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Weather -
 *
 * @author Alexander Kuziv <makklays@gmail.com>
 * @company TechMatrix18
 * @since 19.03.2026
 * @version 0.0.1
 */
public class Weather {
    public static void main(String[] args) {
        try {
            // Координаты Киева
            String latitude = "50.45";
            String longitude = "30.52";
            String urlString = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude +
                    "&longitude=" + longitude +
                    "daily=temperature_2m_max,temperature_2m_min" +
                    "&start=2026-03-18" +
                    "&end2026-03-20" +
                    "&timezone=Europe/Kiev";

            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("GET");
            BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));

            String inputLine;
            StringBuilder response = new StringBuilder();
            while ((inputLine = reader.readLine()) != null) {
                response.append(inputLine);
            }
            reader.close();

            // Вывод результата в консоль

            System.out.println(response.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

