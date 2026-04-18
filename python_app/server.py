from fastapi import FastAPI

# Создаем экземпляр приложения (аналог @SpringBootApplication)
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Привет, Java-разработчик!", "target": "Flowable"}

@app.get("/calculate")
def calculate(a: int, b: int):
    # Пример логики, которую проще написать на Python
    result = a * b
    return {"operation": "multiplication", "result": result}

