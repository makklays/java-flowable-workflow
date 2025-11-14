package com.techmatrix18.mythreads;

import javax.annotation.concurrent.ThreadSafe;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Task3 class — Техзадание №3 — “Многопоточное чтение молитвы с использованием пула из 4 потоков”
 *
 * "Let God arise…” — English Version
 *
 * Let God arise, let His enemies be scattered;
 * let those who hate Him flee from before His face.
 * As smoke vanishes, so let them vanish;
 * as wax melts before the fire,
 * so let the wicked perish before God.
 * But let the righteous be glad;
 * let them rejoice before God;
 * yes, let them exceedingly rejoice.”
 *
 * (Psalm 68:1–3 in Christian numbering; Psalm 67 in Septuagint/Slavonic)
 *
 * @author Alexander Kuziv
 * @since 14.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@ThreadSafe
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

