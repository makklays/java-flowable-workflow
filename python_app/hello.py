# В Python не нужно объявлять класс для запуска кода
def get_info(name):
    # f-строки — это очень удобный способ форматирования (аналог String.format)
    return f"Привет, {name}! Твой Python-интерпретатор работает из venv."

# Список (как ArrayList в Java)
tech_stack = ["Java", "Spring", "Flowable"]
tech_stack.append("Python") # Добавляем элемент

print(get_info("Alexander"))
print(f"Теперь твой стек: {', '.join(tech_stack)}")

# Простая проверка условия
if "Python" in tech_stack:
    print("Добро пожаловать в мир змей! 🐍")
