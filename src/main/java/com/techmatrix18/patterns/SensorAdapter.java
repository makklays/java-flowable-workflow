package com.techmatrix18.patterns;

/**
 * "Adapter" - Pattern
 * Adapting FahrenheitSensor to CelsiusSensor
 *
 * @author Alexander Kuziv
 * @since 31.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

class SensorAdapter implements CelsiusSensor {
    private FahrenheitSensor sensor;

    public SensorAdapter(FahrenheitSensor sensor) {
        this.sensor = sensor;
    }

    @Override
    public double getTemperatureC() {
        return (sensor.getTemperatureF() - 32) * 5 / 9;
    }
}

interface CelsiusSensor {
    double getTemperatureC();
}

interface FahrenheitSensor {
    double getTemperatureF();
}

/*
public class Main {
    public static void main(String[] args) {
        FahrenheitSensor oldSensor = new FahrenheitSensor();
        CelsiusSensor adapter = new SensorAdapter(oldSensor);

        System.out.println("Температура в °C: " + adapter.getTemperatureC());
    }
}
*/

