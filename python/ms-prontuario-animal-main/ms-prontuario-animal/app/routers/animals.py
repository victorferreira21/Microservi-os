# app/routers/animals.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import schemas, crud, models
from app.deps import get_db, get_current_user

router = APIRouter(prefix="/animals", tags=["animals"])


@router.post(
    "/",
    response_model=schemas.AnimalOut,
    summary="Cadastrar novo animal",
    description="Cria um cadastro de animal no sistema, incluindo os dados do tutor (nome e contato)."
)
def create_animal(
    animal_in: schemas.AnimalCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return crud.create_animal(db, animal_in)


@router.get(
    "/",
    response_model=List[schemas.AnimalOut],
    summary="Listar todos os animais",
    description="Retorna uma lista paginada de todos os animais cadastrados no sistema."
)
def list_animals(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    return crud.list_animals(db, skip, limit)


@router.get(
    "/{animal_id}",
    response_model=schemas.AnimalOut,
    summary="Consultar um animal específico",
    description="Busca um animal pelo seu ID. Retorna erro 404 se o animal não existir."
)
def get_animal(
    animal_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    a = crud.get_animal(db, animal_id)
    if not a:
        raise HTTPException(status_code=404, detail="Animal não encontrado")
    return a


@router.delete(
    "/{animal_id}",
    response_model=schemas.AnimalOut,
    summary="Excluir ou inativar animal",
    description=(
        "Exclui o animal se não houver histórico médico associado. "
        "Caso haja registros, altera apenas o status para 'inativo'."
    )
)
def delete_or_inactivate_animal(
    animal_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    a = crud.get_animal(db, animal_id)
    if not a:
        raise HTTPException(status_code=404, detail="Animal não encontrado")

    records = crud.list_records_by_animal(db, animal_id)
    if records:
        a.status = models.AnimalStatus.inactive
        db.add(a)
        db.commit()
        db.refresh(a)
    else:
        crud.delete_animal(db, animal_id)

    return a
