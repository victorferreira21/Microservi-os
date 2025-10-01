# app/routers/records.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import schemas, crud, models
from app.deps import get_db, get_current_user

router = APIRouter(prefix="/records", tags=["records"])


@router.post(
    "/{animal_id}",
    response_model=schemas.MedicalRecordOut,
    summary="Adicionar registro médico a um animal",
    description="Cria um registro médico (consulta, diagnóstico, tratamento, cirurgia ou peso) para um animal."
)
def create_record(
    animal_id: int,
    record_in: schemas.MedicalRecordCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    animal = crud.get_animal(db, animal_id)
    if not animal:
        raise HTTPException(status_code=404, detail="Animal não encontrado")
    return crud.create_record(db, animal, record_in)


@router.get(
    "/{animal_id}",
    response_model=List[schemas.MedicalRecordOut],
    summary="Listar registros médicos de um animal",
    description="Retorna todos os registros médicos associados a um animal."
)
def list_records(
    animal_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return crud.list_records_by_animal(db, animal_id)


@router.get(
    "/detail/{record_id}",
    response_model=schemas.MedicalRecordOut,
    summary="Consultar um registro médico específico",
    description="Busca um registro médico pelo seu ID."
)
def get_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    rec = crud.get_record(db, record_id)
    if not rec:
        raise HTTPException(status_code=404, detail="Registro não encontrado")
    return rec
