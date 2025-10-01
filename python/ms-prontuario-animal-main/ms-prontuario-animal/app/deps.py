from fastapi import Depends, Header, HTTPException, status
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.utils.jwt_client import verify_token_with_auth_service


def get_db():
    """
    Cria uma sessão de banco de dados para cada requisição.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(authorization: str = Header(...)) -> dict:
    """
    Pega o token do header 'Authorization' (puro, sem 'Bearer'),
    valida no serviço do professor e retorna os dados do usuário.
    """
    token = authorization
    user_data = verify_token_with_auth_service(token)

    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou não autorizado",
        )

    return user_data
