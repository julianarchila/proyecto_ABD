from sqlmodel import SQLModel, create_engine

""" sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}" """

sqlite_url = "sqlite+libsql://127.0.0.1:8080/?secure=false"

engine = create_engine(sqlite_url)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

