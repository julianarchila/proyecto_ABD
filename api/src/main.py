from typing import List
from fastapi import FastAPI, HTTPException, Query, Depends

from sqlmodel import  Session, select


from .models import Transaction, TransactionRead, TransactionCreate
from .database import create_db_and_tables, engine


app = FastAPI()



def get_session():
    with Session(engine) as session:
        yield session


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/transactions/", response_model=List[TransactionRead])
def read_transactions(
    skip: int = 0, limit: int = 100, session: Session = Depends(get_session)
):
    transactions = session.exec(select(Transaction).offset(skip).limit(limit)).all()
    return transactions


@app.post("/transactions/", response_model=TransactionRead)
def create_transaction(
    transaction: TransactionCreate, session: Session = Depends(get_session)
):
    db_transaction = Transaction.from_orm(transaction)
    session.add(db_transaction)
    session.commit()
    session.refresh(db_transaction)
    return db_transaction



