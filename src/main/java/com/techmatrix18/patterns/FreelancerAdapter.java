package com.techmatrix18.patterns;

// Интерфейс, с которым работает менеджер
interface Worker {
    void work(String task);
}

// Старый класс, который нельзя изменить
class Freelancer {
    public void doJob(String task) {
        System.out.println("Freelancer is working on: " + task);
    }
}

// Создаём адаптер
public class FreelancerAdapter implements Worker {
    private final Freelancer freelancer;

    public FreelancerAdapter(Freelancer freelancer) {
        this.freelancer = freelancer;
    }

    @Override
    public void work(String task) {
        freelancer.doJob(task); // адаптируем интерфейс
    }
}

// Используем в коде
class AdapterDemo {
    public static void main(String[] args) {
        Freelancer freelancer = new Freelancer();
        Worker worker = new FreelancerAdapter(freelancer);

        worker.work("Разработать REST API");
    }
}

// Результат:
// Freelancer выполняет задачу: Разработать REST API

