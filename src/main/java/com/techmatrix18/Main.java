package com.techmatrix18;

import com.techmatrix18.service.RedisService;
import com.techmatrix18.telegram.MyBot;
import com.techmatrix18.telegram.TelegramService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.io.IOException;

/**
 * This is Main class
 *
 * @company for TechMatrix18
 * @author Alexander Kuziv
 * @since 05-09-2025
 * @version 0.0.1
 */

@SpringBootApplication
public class Main {

    public static void main(String[] args) throws IOException {
        System.out.println("Hello Flowable!");

        // Запускаем контекст Spring Boot
        ApplicationContext context = SpringApplication.run(Main.class, args);

        // Проверка Redis (если сервер запущен)
        try {
            RedisService redisService = context.getBean(RedisService.class);
            redisService.saveValue("key1", "Hello Redis");
            System.out.println("REDIS TEST: " + redisService.getValue("key1"));
        } catch (Exception e) {
            System.out.println("Redis not available, but server is starting...");
        }

        // Рабочая отправка сообщения в Telegram при запуске
        //TelegramService telegramService = context.getBean(TelegramService.class);
        //System.out.println("Проверка отправки в Telegram...");
        //telegramService.sendMessage("🤖 Бот успешно запущен и готов к торговле!");

        // Проверка отправки сигнала в Telegram при запуске
        //MyBot bot = context.getBean(MyBot.class);
        //bot.sendSignal("This is a new signal!");

        /*Set<String> names1 = Set.of("Tom", "Alice", "Bob");
        Set<String> names2 = Set.of("Larry", "Moe", "Curly");
        Set res1 = HashSetUnique.union(names1, names2);

        System.out.println("Union1: " + res1);

        Set res2 = HashSetUnique.myFunc();
        System.out.println("Union2: " + res2);*/

        /*int i = 3;
        byte b = 1;
        byte b1 = 1 + 2;                // line 1
        //short s = 304111;               // line 2-
        short s1 = (short) 304111;       // line 3
        //b = b1 + 1;                     // line 4-
        b = (byte)  (b1 + 1);           // line 5
        //b = −b;                         // line 6-
        b = (byte) −b;                  // line 7
        b1 *= 2;                       // line 8
        //b = i;                          // line 9-
        b = (byte)  i;
        b += i++;
        float f = 1.1f;
        b /= f;*/

        /*System.out.println(010 | 4);
        System.out.println(12345 + 5432l);
        System.out.println("2 + 2 = " + 2 + 2);

        int a = 10;
        int b = 20;

        System.out.println(a > 20 && b > 10);
        System.out.println(a > 20 || b > 10);
        System.out.println(! (b > 10));
        System.out.println(! (a > 20));

        byte aa = 0b0001_1110;
        byte bb = 1_____14;
        //short s = 46_;
        //int i = _78;

        double m1 = 5_000_000.75;
        //long m2 = _5_000_000;
        //int m = 0b_1010;
        int m4 = 5_000_000;
        int m5 = 0_10;
        //int m6 = 5_000_000_;*/

        //
        /*String name;
        try {
            String name = System.in.read();
            System.out.println("Hello, " + (String)name);
        } catch(IOException e) {
            e.printStackTrace();
        }*/

        //
        /*InputStream input = System.in;
        StringBuilder nameBuilder = new StringBuilder();
        int ch;
        // читаем посимвольно, пока не встретим Enter (код 10 или 13)
        while ((ch = input.read()) != -1 && ch != '\n' && ch != '\r') {
            nameBuilder.append((char) ch);
        }
        String name1 = nameBuilder.toString();
        System.out.println("Hello, " + name1);

        //
        Scanner scanner = new Scanner(System.in);
        String name = scanner.nextLine();
        System.out.println("Hello, " + name);
        scanner.close();*/

        // jwt to log
        //String jwtToken = PasswordGenerator.generateToken();
        //System.out.println("----------- jwtToken ---------> " + jwtToken);



        // password to log
        /*BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode("admin"); // хранить это в password
        //System.out.println("----------- password ---------> " + hashedPassword);

        // pattern - JavaBeans
        PizzaJavaBeans pizza1 = new PizzaJavaBeans();
        pizza1.setTitle("Pepperoni");
        pizza1.setAmount("Large");
        pizza1.setCheese(200);
        pizza1.setSausage(250);
        pizza1.setMushroom(250);
        System.out.println("Mi pizza1:");
        System.out.println(pizza1);

        // pattern - Builder
        PizzaBuilder pizza2 = new PizzaBuilder.Builder("Pepperoni").amount("Large").cheese(200).sausage(250).mushroom(100).build();
        System.out.println("Mi pizza2:");
        System.out.println(pizza2);*/

        //SpringApplication.run(Main.class, args);

        /*ApplicationContext context = SpringApplication.run(Main.class, args);
        RedisService redisService = context.getBean(RedisService.class);

        redisService.saveValue("key1", "Hello Redis");
        System.out.println("----------------------------------11");
        System.out.println("STRING: " + redisService.getValue("key1"));
        System.out.println("----------------------------------22");*/
    }
}

/*class PasswordGenerator {
    public static String generateToken() {
        // безопасный ключ 256 бит
        String secret = "MySuperSuperSecretKey1234567890MySuperSuperSecretKey1234567890";
        Key key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setSubject("admin")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}*/

