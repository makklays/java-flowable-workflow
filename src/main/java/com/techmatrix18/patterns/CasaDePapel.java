package com.techmatrix18.patterns;

/**
 * This is CasaDePapel class
 * (Factory Method Pattern)
 *
 * @company for TechMatrix18
 * @author Alexander Kuziv
 * @since 26-10-2025
 * @version 0.0.1
 */

public class CasaDePapel {
    private String pais;
    private String team;

    private CasaDePapel(String pais, String team) {
        this.pais = pais;
        this.team = team;
    }

    // Static Fabric - Factory Method Pattern
    public static CasaDePapel of(String pais, String team) {
        return new CasaDePapel(pais, team);
    }

    @Override
    public String toString() {
        return "CasaDePapel{" +
                "pais='" + pais + '\'' +
                ", team='" + team + '\'' +
                '}';
    }
}

// CasaDePapel casa1 = CasaDePapel.of("Spain", "Red");
// System.out.println(casa1);

// Output: CasaDePapel{pais='Spain', team='Red'}

