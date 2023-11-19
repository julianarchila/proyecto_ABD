from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    home = Column(String) # Coordenadas

    transactions = relationship("Transactions", back_populates="owner")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    price = Column(Integer, index=True)
    distance_from_home = Column(Integer, index=True)
    distance_from_last_transaction = Column(Integer, index=True)
    ration_to_median_purchase_price = Column(Integer, index=True)
    repeat_retailer = Column(Boolean, index=True)
    used_chip = Column(Boolean, index=True)
    used_pin_number = Column(Boolean, index=True)
    online_order = Column(Boolean, index=True)

    fraud = Column(Boolean, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="transactions")

