from typing import List
from fastapi import FastAPI, HTTPException, Depends

from sqlmodel import Session, select, col


from .models import (
    Transaction,
    TransactionRead,
    TransactionCreate,
    User,
    UserCreate,
    UserRead,
    UserLogin,
)
from .database import create_db_and_tables, engine
from .utils import predict_fraud, distance_between_points, string_to_tuple


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


@app.post("/users/", response_model=UserRead)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    # Convert home_location to a string
    user.home_location = str(user.home_location[0]) + "," + str(user.home_location[1])

    db_user = User.from_orm(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@app.post("/users/login/", response_model=UserRead)
def login_user(user: UserLogin, session: Session = Depends(get_session)):
    db_user = session.exec(select(User).where(User.email == user.email)).first()
    if db_user is None:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    if db_user.password == user.password:
        return db_user
    else:
        raise HTTPException(status_code=400, detail="Incorrect email or password")


@app.get("/transactions/", response_model=List[TransactionRead])
def read_transactions(
    skip: int = 0, limit: int = 100, session: Session = Depends(get_session)
):
    transactions = session.exec(select(Transaction).offset(skip).limit(limit)).all()
    return transactions


# Get transactions for a specific user
@app.get("/transactions/{user_id}", response_model=List[TransactionRead])
def read_transactions_for_user(
    user_id: int, skip: int = 0, limit: int = 100, session: Session = Depends(get_session)
):
    transactions = (
        session.exec(
            select(Transaction)
            .where(Transaction.user_id == user_id)
            .offset(skip)
            .limit(limit)
        )
        .all()
    )
    return transactions

@app.post("/transactions/", response_model=TransactionRead)
def create_transaction(
    transaction: TransactionCreate, session: Session = Depends(get_session)
):
    # Get user
    db_user = session.exec(select(User).where(User.id == transaction.user_id)).first()
    if db_user is None:
        raise HTTPException(status_code=400, detail="User not found")

    distance_from_home = distance_between_points(
        transaction.location, string_to_tuple(db_user.home_location)
    )

    # Get last transaction

    db_last_transaction = session.exec(
        select(Transaction)
        .order_by(col(Transaction.id).desc())
        .where(Transaction.user_id == transaction.user_id, Transaction.fraud == False)
    ).first()

    print("db_last_transaction", db_last_transaction)

    

    distance_from_last_transaction = 0
    if db_last_transaction is not None:
        distance_from_last_transaction = distance_between_points(
            transaction.location, string_to_tuple(db_last_transaction.location)
        )

    # Get median purchase price
    median_purchase_price = db_user.median_purchase_price


    ration_to_median_purchase_price = transaction.price / median_purchase_price

    if (db_user.transactions_count == 0):
        ration_to_median_purchase_price = 1

    # Get repeat retailer if last retailer is the same as this retailer
    repeat_retailer = False
    if db_last_transaction is not None:
        repeat_retailer = db_last_transaction.retailer == transaction.retailer

    # Add parameters to transaction


    # db_transaction = Transaction.from_orm(transaction)

    db_transaction = Transaction(
        price=transaction.price,
        location=str(transaction.location[0]) + "," + str(transaction.location[1]),
        retailer=transaction.retailer,
        used_chip=transaction.used_chip,
        used_pin_number=transaction.used_pin_number,
        online_order=transaction.online_order,
        user_id=transaction.user_id,
        distance_from_home=distance_from_home,
        repeat_retailer=repeat_retailer,
        distance_from_last_transaction=distance_from_last_transaction,
        ratio_to_median_purchase_price=ration_to_median_purchase_price,
        fraud=False,
    )

    fraud = predict_fraud(db_transaction)

    db_transaction.fraud = fraud

    # Update median purchase price
    db_user.transactions_count += 1
    db_user.median_purchase_price = (
        db_user.median_purchase_price * (db_user.transactions_count - 1)
        + transaction.price
    ) / db_user.transactions_count

    session.add(db_user)

    session.add(db_transaction)
    session.commit()
    session.refresh(db_transaction)
    return db_transaction
