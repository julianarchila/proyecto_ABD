from typing import  List, Optional

from sqlmodel import Field, Relationship, SQLModel


# This are the transactions columns:
# distance_from_home,distance_from_last_transaction,ratio_to_median_purchase_price,repeat_retailer,used_chip,used_pin_number,online_order,fraud


class TransactionBase(SQLModel):
    distance_from_home: float = Field(index=True)
    distance_from_last_transaction: float = Field(index=True)
    ratio_to_median_purchase_price: float = Field(index=True)
    repeat_retailer: bool = Field(index=True)
    used_chip: bool = Field(index=True)
    used_pin_number: bool = Field(index=True)
    online_order: bool = Field(index=True)
    fraud: bool = Field(index=True)

    user_id: int = Field(index=True)

class Transaction(TransactionBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    user: Optional["User"] = Relationship(back_populates="transactions")


class TransactionCreate(TransactionBase):
    pass

class TransactionRead(TransactionBase):
    id: int


class UserBase(SQLModel):
    username: str = Field(index=True)
    hashed_password: str
    home_latitude: float = Field(index=True)

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    transactions: List["Transaction"] = Relationship(back_populates="user")

class UserCreate(UserBase):
    pass

class UserRead(UserBase):
    id: int






