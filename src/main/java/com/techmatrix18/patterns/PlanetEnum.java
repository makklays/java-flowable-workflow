package com.techmatrix18.patterns;

/**
 * @author Alexander Kuziv
 * @since 04.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

public enum PlanetEnum {
    MERCURY (3.302e+23, 2.4397e6),
    VENUS   (4.869e+24, 6.0518e6),
    EARTH   (5.976e+24, 6.37814e6),
    MARS    (6.421e+23, 3.3972e6),
    JUPITER (1.9e+27,   7.1492e7),
    SATURN  (5.688e+26, 6.0268e7),
    URANUS  (8.686e+25, 2.5559e7),
    NEPTUNE (1.024e+26, 2.4746e7);

    private final double mass;   // кг
    private final double radius; // м
    private final double surfaceGravity; // м/с²

    // gravitational constant
    private static final double G = 6.67300E-11; // м³/кг·с²

    // constructor
    PlanetEnum(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
        this.surfaceGravity = G * mass / (radius * radius);
    }

    public double mass() { return mass; }
    public double radius() { return radius; }
    public double surfaceGravity() { return surfaceGravity; }
    public double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity;  // F = ma
    }
}

