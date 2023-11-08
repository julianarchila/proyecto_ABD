from pydantic import BaseModel


class TransactionBase(BaseModel):
    price: int 


class TransactionCreate(TransactionBase):
    pass


class Transaction(TransactionBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    transactions: list[Transaction] = []

    class Config:
        orm_mode = True

