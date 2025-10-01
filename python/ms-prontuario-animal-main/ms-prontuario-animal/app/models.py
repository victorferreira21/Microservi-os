from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import JSON
from app.database import Base
import enum


class AnimalStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"


class Animal(Base):
    __tablename__ = "animals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    species = Column(String, nullable=True)
    breed = Column(String, nullable=True)
    tutor_name = Column(String, nullable=False)
    tutor_contact = Column(String, nullable=False)
    status = Column(Enum(AnimalStatus), default=AnimalStatus.active, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    records = relationship("MedicalRecord", back_populates="animal", cascade="all, delete-orphan")


class RecordType(str, enum.Enum):
    consulta = "consulta"
    diagnostico = "diagnostico"
    tratamento = "tratamento"
    cirurgia = "cirurgia"
    peso = "peso"


class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(Integer, primary_key=True, index=True)
    animal_id = Column(Integer, ForeignKey("animals.id", ondelete="CASCADE"), nullable=False)
    record_type = Column(Enum(RecordType), nullable=False)
    title = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    weight = Column(Float, nullable=True)
    images = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    animal = relationship("Animal", back_populates="records")
