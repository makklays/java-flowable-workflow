import requests

# Обращаемся к конкретному эндпоинту, который ГАРАНТИРОВАННО возвращает JSON
url = "https://httpbin.org"

try:
    # Передаем параметры, как в Query String (аналог UriComponentsBuilder в Spring)
    params = {
        "user": "Alexander",
        "role": "Java Developer",
        "learning": "Python"
    }

    response = requests.get(url, params=params)
    response.raise_for_status() # Бросит исключение, если статус не 2xx

    data = response.json()

    # В ответе httpbin.org присылает назад ваши же аргументы в ключе 'args'
    my_args = data['args']

    print("--- Ответ успешно получен ---")
    print(f"Пользователь: {my_args['user']}")
    print(f"Стек: {my_args['role']} + {my_args['learning']}")
    print(f"Ваш внешний IP: {data['origin']}")

except Exception as e:
    print(f"Ошибка: {e}")

