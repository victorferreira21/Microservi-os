# app/crud.py
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas

def create_animal(db: Session, animal_in: schemas.AnimalCreate) -> models.Animal:
    db_animal = models.Animal(
        name=animal_in.name,
        species=animal_in.species,
        breed=animal_in.breed,
        tutor_name=animal_in.tutor_name,
        tutor_contact=animal_in.tutor_contact,
    )
    db.add(db_animal)
    db.commit()
    db.refresh(db_animal)
    return db_animal

def get_animal(db: Session, animal_id: int):
    return db.query(models.Animal).filter(models.Animal.id == animal_id).first()

def list_animals(db: Session, skip: int = 0, limit: int = 100) -> List[models.Animal]:
    return db.query(models.Animal).offset(skip).limit(limit).all()

def delete_animal(db: Session, animal_id: int):
    a = db.query(models.Animal).filter(models.Animal.id == animal_id).first()
    if a:
        db.delete(a)
        db.commit()
        return True
    return False

def create_record(db: Session, animal: models.Animal, record_in: schemas.MedicalRecordCreate) -> models.MedicalRecord:
    rec = models.MedicalRecord(
        animal_id=animal.id,
        record_type=record_in.record_type,
        title=record_in.title,
        description=record_in.description,
        weight=record_in.weight,
        images=record_in.images,
    )
    db.add(rec)
    db.commit()
    db.refresh(rec)
    return rec

def list_records_by_animal(db: Session, animal_id: int):
    return db.query(models.MedicalRecord).filter(models.MedicalRecord.animal_id == animal_id).all()

def get_record(db: Session, record_id: int):
    return db.query(models.MedicalRecord).filter(models.MedicalRecord.id == record_id).first()
