package com.techmatrix18.utils;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

/**
 * Trading Sessions
 *
 * @author Alexander Kuziv <makklays@gmail.com>
 * @company TechMatrix18
 * @since 07.03.2026
 * @version 0.0.1
 */
public class TradingSessions {

    // Класс для сессии
    static class Session {
        String name;
        LocalTime start;
        LocalTime end;

        Session(String name, int startHour, int startMin, int endHour, int endMin) {
            this.name = name;
            this.start = LocalTime.of(startHour, startMin);
            this.end = LocalTime.of(endHour, endMin);
        }

        boolean isCurrent(LocalTime time) {
            return !time.isBefore(start) && time.isBefore(end);
        }

        long secondsLeft(LocalTime time) {
            if (isCurrent(time)) {
                return Duration.between(time, end).getSeconds();
            }
            return 0;
        }

        long secondsUntilStart(LocalTime time) {
            if (time.isBefore(start)) {
                return Duration.between(time, start).getSeconds();
            }
            return 0;
        }

        @Override
        public String toString() {
            return name + " " + start + " – " + end + " UTC";
        }

        public String getTimeLeftString(LocalTime now, ResourceBundle bundle) {
            long left = secondsLeft(now);
            long hours = left / 3600;
            long minutes = (left % 3600) / 60;
            long seconds = left % 60;
            if (hours > 0) {
                return String.format("%d"+bundle.getString("label.hours")+" %d"+bundle.getString("label.minutes")+" %d"+bundle.getString("label.seconds")+"", hours, minutes, seconds);
            } else {
                return String.format("%d"+bundle.getString("label.minutes")+" %d"+bundle.getString("label.seconds")+"", minutes, seconds);
            }
        }
    }

    // Список всех сессий
    static List<Session> sessions = new ArrayList<>();
    static {
        sessions.add(new Session("Азиатская (Токийская) сессия", 0, 0, 9, 0));
        sessions.add(new Session("Пересечение Лондон–Токио", 8, 0, 9, 0));
        sessions.add(new Session("Европейская (Лондонская) сессия", 8, 0, 17, 0));
        sessions.add(new Session("Пересечение Лондон–Нью-Йорк", 13, 0, 17, 0));
        sessions.add(new Session("Американская (Нью-Йоркская) сессия", 13, 0, 22, 0));
    }

    // Список всех сессий - коротко города
    static List<Session> sessionsCities = new ArrayList<>();
    static {
        sessionsCities.add(new Session("Токио", 0, 0, 9, 0));
        sessionsCities.add(new Session("Лондон–Токио", 8, 0, 9, 0));
        sessionsCities.add(new Session("Лондон", 8, 0, 17, 0));
        sessionsCities.add(new Session("Лондон–Нью-Йорк", 13, 0, 17, 0));
        sessionsCities.add(new Session("Нью-Йорк", 13, 0, 22, 0));
    }

    // Список всех сессий и пересечений - смещенное время для вывода только одной сессии текущей или пересечения сессий
    static List<Session> sessionsCitiesOnlyOne = new ArrayList<>();
    static {
        // 00:00 - 08:00 Токио (чистая сессия)
        sessionsCitiesOnlyOne.add(new Session("Токио", 0, 0, 8, 0));
        // 08:00 - 09:00 ПЕРЕСЕЧЕНИЕ
        sessionsCitiesOnlyOne.add(new Session("Лондон–Токио", 8, 0, 9, 0));
        // 09:00 - 13:00 Лондон (чистая сессия)
        sessionsCitiesOnlyOne.add(new Session("Лондон", 9, 0, 13, 0));
        // 13:00 - 17:00 ПЕРЕСЕЧЕНИЕ
        sessionsCitiesOnlyOne.add(new Session("Лондон–Нью-Йорк", 13, 0, 17, 0));
        // 17:00 - 22:00 Нью-Йорк (чистая сессия)
        sessionsCitiesOnlyOne.add(new Session("Нью-Йорк", 17, 0, 22, 0));
    }

    static List<Session> sessionsCitiesOnlyOne1 = new ArrayList<>();
    static {
        // Вместо "Токио" пишем ключ "lbl.city1"
        sessionsCitiesOnlyOne1.add(new Session("lbl.city1", 0, 0, 8, 0));
        sessionsCitiesOnlyOne1.add(new Session("lbl.city2", 8, 0, 9, 0));
        sessionsCitiesOnlyOne1.add(new Session("lbl.city3", 9, 0, 13, 0));
        sessionsCitiesOnlyOne1.add(new Session("lbl.city4", 13, 0, 17, 0));
        sessionsCitiesOnlyOne1.add(new Session("lbl.city5", 17, 0, 22, 0));
    }

    // === Методы для GUI ===

    // 1. Получаем список активных сессий
    public static List<Session> getActiveSessions(LocalTime now) {
        List<Session> active = new ArrayList<>();
        for (Session s : sessionsCitiesOnlyOne1) {
            if (s.isCurrent(now)) active.add(s);
        }
        return active;
    }

    // 2. Получаем следующую сессию
    public static Session getNextSessionObject(LocalTime now) {
        Session next = null;
        long minSeconds = Long.MAX_VALUE;
        for (Session s : sessionsCitiesOnlyOne1) {
            long secondsUntil = s.secondsUntilStart(now);
            if (secondsUntil > 0 && secondsUntil < minSeconds) {
                minSeconds = secondsUntil;
                next = s;
            }
        }
        return next;
    }

    // 3. Возвращаем полную информацию о рынке в виде строки для Label
    public static String getMarketInfoString(LocalTime now, ResourceBundle bundle) {
        StringBuilder sb = new StringBuilder();
        List<Session> active = getActiveSessions(now);

        if (!active.isEmpty()) {
            sb.append(bundle.getString("label.Now"));
            for (Session s : active) {

                String localizedName = bundle.getString(s.name);

                sb.append(" ").append(localizedName)
                        .append(" (").append(bundle.getString("label.until")).append(": ")
                        .append(s.getTimeLeftString(now, bundle)).append(") ");
            }
        } else {
            sb.append(bundle.getString("label.no_sessions"));
        }

        Session next = getNextSessionObject(now);
        if (next != null) {
            long secondsUntil = next.secondsUntilStart(now);
            long hours = secondsUntil / 3600;
            long minutes = (secondsUntil % 3600) / 60;
            long seconds = secondsUntil % 60;

            String localizedNextName = bundle.getString(next.name);

            sb.append(bundle.getString("label.Next")).append(" ").append(localizedNextName).append(" ")
                    .append(bundle.getString("label.throught")).append(hours)
                    .append(bundle.getString("label.hours")).append(" ")
                    .append(minutes).append(bundle.getString("label.minutes")).append(" ")
                    .append(seconds).append(bundle.getString("label.seconds"))
                    .append(" (").append(next.start).append(" UTC)");
        } else {
            sb.append(bundle.getString("label.will_tomorrow")).append(" (UTC)");
        }

        return sb.toString();
    }

    // Метод принимает дату и сам считает секунды до неё
    public static String getCountdownTo(LocalDateTime target, ResourceBundle bundle) {
        long seconds = java.time.Duration.between(LocalDateTime.now(), target).getSeconds();
        return formatDuration(seconds, bundle);
    }

    // Ваш основной метод форматирования
    public static String formatDuration(long totalSeconds, ResourceBundle bundle) {
        if (totalSeconds <= 0) return "0с";

        long weeks = totalSeconds / (7 * 24 * 3600);
        long days = (totalSeconds % (7 * 24 * 3600)) / (24 * 3600);
        long hours = (totalSeconds % (24 * 3600)) / 3600;
        long minutes = (totalSeconds % 3600) / 60;
        long seconds = totalSeconds % 60;

        StringBuilder sb = new StringBuilder();
        if (weeks > 0) sb.append(weeks).append("н ");
        if (days > 0) sb.append(days).append(bundle.getString("label.days")).append(" ");
        if (hours > 0) sb.append(hours).append(bundle.getString("label.hours")).append(" ");
        if (minutes > 0 || hours > 0 || days > 0) sb.append(minutes).append(bundle.getString("label.minutes")).append(" ");
        sb.append(seconds).append("с");

        return sb.toString().trim();
    }

    // === Примеры использования ===
    public static void main(String[] args) {
        LocalTime now = LocalTime.now(ZoneOffset.UTC);

        // Получаем список активных сессий (для TableView или ListView)
        List<Session> activeSessions = getActiveSessions(now);
        System.out.println("Активные сессии: " + activeSessions);

        // Получаем следующую сессию
        Session next = getNextSessionObject(now);
        System.out.println("Следующая сессия: " + (next != null ? next.name : "завтра"));

        // Получаем всю информацию в красивом виде для Label
        //String marketInfo = getMarketInfoString(now);
        //System.out.println("\n" + marketInfo);
    }
}

