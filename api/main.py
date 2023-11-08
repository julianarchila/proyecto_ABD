from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/history/")
def predict():
    return {"message": "lista de transacciones pasadas"}

@app.get("/new/")
def new_transaction():
    # Aqui se reciven los datos de la nueva transaccion
    # Se calculan los parametros como distancia a la ultima compra, proporcion a la compra media, etc.
    # Se uza el modelo para predecir si es valida o no

    # Si la transaccion es valida se guarda en la base de datos


    return {"message": "nueva transaccion"}

