package com.techmatrix18.patterns;

import java.util.ArrayList;
import java.util.List;

/**
 * "Observer" - Pattern
 *
 * @author Alexander Kuziv
 * @since 04.11.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

// Интерфейс наблюдателя
interface Observer {
    void update(String message);
}

// Интерфейс издателя
interface Channel {
    void attach(Observer o);
    void detach(Observer o);
    void notifyObservers(String message);
}

// Конкретный издатель
class YouTubeChannelObserver implements Channel {
    private List<Observer> subscribers = new ArrayList<>();

    @Override
    public void attach(Observer o) {
        subscribers.add(o);
    }

    @Override
    public void detach(Observer o) {
        subscribers.remove(o);
    }

    @Override
    public void notifyObservers(String message) {
        for (Observer o : subscribers) {
            o.update(message);
        }
    }

    public void uploadVideo(String title) {
        System.out.println("New video uploaded: " + title);
        notifyObservers("Watch now: " + title);
    }
}

// Конкретный наблюдатель
class Subscriber implements Observer {
    private String name;

    public Subscriber(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println(name + " received notification: " + message);
    }
}

// Demonstration
/*public class Main {
    public static void main(String[] args) {
        YouTubeChannelObserver channel = new YouTubeChannelObserver();

        Observer user1 = new Subscriber("Alice");
        Observer user2 = new Subscriber("Bob");

        channel.attach(user1);
        channel.attach(user2);

        channel.uploadVideo("Observer Pattern in Java");
    }
}*/

