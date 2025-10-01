from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
from app.models import RecordType, AnimalStatus


class MedicalRecordBase(BaseModel):
    record_type: RecordType
    title: Optional[str]
    description: Optional[str]
    weight: Optional[float]
    images: Optional[List[str]] = []


class MedicalRecordCreate(MedicalRecordBase):
    pass


class MedicalRecordOut(MedicalRecordBase):
    id: int
    animal_id: int
    created_at: datetime

    class Config:
        orm_mode = True


class AnimalBase(BaseModel):
    name: str
    species: Optional[str]
    breed: Optional[str]
    tutor_name: str
    tutor_contact: str


class AnimalCreate(AnimalBase):
    pass


class AnimalOut(AnimalBase):
    id: int
    status: AnimalStatus
    created_at: datetime
    records: List[MedicalRecordOut] = []

    class Config:
        orm_mode = True
