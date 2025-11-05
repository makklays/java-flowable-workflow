package com.techmatrix18.patterns;

/**
 * Pattern - "AbstractFactory"
 *
 * @company for TechMatrix18
 * @author Alexander Kuziv
 * @since 05-11-2025
 * @version 0.0.1
 */

interface Cat {
    void meow();
}

interface Dog {
    void bark();
}

// Pet implementations
class PetCat implements Cat {
    @Override
    public void meow() {
        System.out.println("Meow! Meow!");
    }
}

class PetDog implements Dog {
    @Override
    public void bark() {
        System.out.println("Woof! Woof!");
    }
}

// Wild implementations
class WildCat implements Cat {
    @Override
    public void meow() {
        System.out.println("Roar! Roar!");
    }
}

class WildDog implements Dog {
    @Override
    public void bark() {
        System.out.println("Grr! Grr!");
    }
}

// Factory
interface AnimalFactory {
    Cat createCat();
    Dog createDog();
}

//
class PetAnimalFactory implements AnimalFactory {
    @Override
    public Cat createCat() {
        return new PetCat();
    }

    @Override
    public Dog createDog() {
        return new PetDog();
    }
}

class WildAnimalFactory implements AnimalFactory {
    @Override
    public Cat createCat() {
        return new WildCat();
    }

    @Override
    public Dog createDog() {
        return new WildDog();
    }
}

class AnimalWorld {
    private final Cat cat;
    private final Dog dog;

    public AnimalWorld(AnimalFactory factory) {
        this.cat = factory.createCat();
        this.dog = factory.createDog();
    }

    public void showAnimals() {
        cat.meow();
        dog.bark();
    }
}

/*
public class Main {
    public static void main(String[] args) {
        AnimalFactory factory;

        String type = "wild"; // или "domestic"

        if (type.equalsIgnoreCase("pet")) {
            factory = new PetAnimalFactory();
        } else {
            factory = new WildAnimalFactory();
        }

        AnimalWorld world = new AnimalWorld(factory);
        world.showAnimals();
    }
}

Roar! Roar!
Grr! Grr!

*/

