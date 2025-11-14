package com.techmatrix18.mythreads;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Task3 {
    public static void main (String[] args) {

        // Свет (אוֹר — Ор)
        // Вода (מַיִם — Майим)
        // Земля (אֶרֶץ — Эретц)
        // Дух жизни / дыхание (רוּחַ — Руа́х)
        ExecutorService executor = Executors.newFixedThreadPool(4);

        for (int time = 1; time <= 7; time++) {
            Runnable reader = new Runnable() {
                public void run() {
                    System.out.println("Чтение данных из базы... (поток " + Thread.currentThread().getName() + ")" +
                            "\n" + "На иврите (צא אלוהים)\n" +
                            "יָקוּם אֱלֹהִים, וְיָפֻצוּ אוֹיְבָיו;\n" +
                            "וְיָנֻסוּ מְשַנְאָיו מִפָּנָיו.\n" +
                            "כַּעֲשָׁן יֶהְפָּצוּן; כַּמֶּלֶק נִמְגָּד לְפָנָיו.\n" +
                            "וְצַדִּיקִים יָגִילוּ; יִשְׂמְחוּ לְפָנָיו;\n" +
                            "וְתָרוּ עַד מְאֹד.");
                    try {
                        Thread.sleep(500);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                    System.out.println("Данные прочитаны. (поток " + Thread.currentThread().getName() + ")");
                }
            };

            executor.submit(reader);
        }
    }
}

