from typing import  List, Optional, Tuple

from sqlmodel import Field, Relationship, SQLModel



class UserBase(SQLModel):
    email : str = Field(index=True)
    password: str = Field(index=True)
    home_location: str = Field(index=True) # Could be a tuple of (latitude, longitude) but for simplicity we are using a string

    median_purchase_price: float = Field(default=1,index=True)
    transactions_count: int = Field(default=0,index=True)


class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    transactions: List["Transaction"] = Relationship(back_populates="user")

class UserCreate(SQLModel):
    email : str = Field(index=True)
    password: str = Field(index=True)
    home_location: Tuple[float, float] = Field(index=True)


class UserRead(UserBase):
    id: int

class UserLogin(SQLModel):
    email : str = Field(index=True)
    password: str = Field(index=True)
    



class TransactionBase(SQLModel):
    price: float = Field(index=True)

    location: str = Field(index=True) # Could be a tuple of (latitude, longitude) but for simplicity we are using a string
    retailer: str = Field(index=True)

    used_chip: bool = Field(index=True)
    used_pin_number: bool = Field(index=True)
    online_order: bool = Field(index=True)




    user_id: Optional[int] = Field(default=None, foreign_key="user.id")




class Transaction(TransactionBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    user: Optional[User] = Relationship(back_populates="transactions")
    distance_from_home: float = Field(index=True)
    repeat_retailer: bool = Field(index=True)

    distance_from_last_transaction: float = Field(index=True)
    ratio_to_median_purchase_price: float = Field(index=True)
    fraud: bool = Field(index=True)



class TransactionCreate(TransactionBase):
    location: Tuple[float, float] = Field(index=True)


class TransactionRead(TransactionBase):
    id: int

    distance_from_home: float = Field(index=True)
    repeat_retailer: bool = Field(index=True)

    distance_from_last_transaction: float = Field(index=True)
    ratio_to_median_purchase_price: float = Field(index=True)
    fraud: bool = Field(index=True)


