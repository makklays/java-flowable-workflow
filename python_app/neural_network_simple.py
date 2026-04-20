import tensorflow as tf
import numpy as np

# 1. Подготовим данные (X - вход, Y - результат)
# Формула: y = 2x - 1
xs = np.array([-1.0, 0.0, 1.0, 2.0, 3.0, 4.0], dtype=float)
ys = np.array([-3.0, -1.0, 1.0, 3.0, 5.0, 7.0], dtype=float)

# 2. Создаем простейшую модель (1 слой, 1 нейрон)
model = tf.keras.Sequential([
    tf.keras.layers.Dense(units=1, input_shape=[1])
])

# 3. Компилируем (указываем, как мерить ошибку и как оптимизировать)
model.compile(optimizer='sgd', loss='mean_squared_error')

# 4. Обучаем (прогоняем данные 500 раз)
print("Начинаю обучение...")
model.fit(xs, ys, epochs=500, verbose=0)
print("Обучение завершено!")

# 5. Проверяем! Предскажем Y для X = 10
# По формуле должно быть: 2 * 10 - 1 = 19
result = model.predict([10.0])
print(f"Результат для числа 10: {result}")

