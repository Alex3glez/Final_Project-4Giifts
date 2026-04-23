from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, DateTime, ForeignKey
from flask_bcrypt import Bcrypt
from datetime import datetime, timezone

db = SQLAlchemy()
bcrypt = Bcrypt()


class User(db.Model):
    __tablename__ = "giifts_users"
    # Supabase table: giifts_users — PK is 'id' (serial integer)
    id: Mapped[int] = mapped_column("id", primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column("password_hash", nullable=False)
    profile_pic: Mapped[str] = mapped_column("profile_pic", String(255), nullable=True)
    first_name: Mapped[str] = mapped_column("first_name", String(80), nullable=True)
    last_name: Mapped[str] = mapped_column("last_name", String(80), nullable=True)
    birth_date: Mapped[str] = mapped_column("birth_date", String(10), nullable=True)
    gender: Mapped[str] = mapped_column("gender", String(20), nullable=True)
    hobbies: Mapped[str] = mapped_column("hobbies", String(999), nullable=True)
    ocupacion: Mapped[str] = mapped_column("ocupacion", String(120), nullable=True)
    tipo_personalidad: Mapped[str] = mapped_column("tipo_personalidad", String(120), nullable=True)
    share_token: Mapped[str] = mapped_column("share_token", String(255), nullable=True)
    share_token_expiry: Mapped[datetime] = mapped_column("share_token_expiry", DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column("created_at", DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    contactos = db.relationship("Contactos", back_populates="user", cascade="all, delete-orphan")
    favoritos = db.relationship("Favorite", back_populates="user", cascade="all, delete-orphan")
    historial = db.relationship("Historial", back_populates="user", cascade="all, delete-orphan")
    reminders = db.relationship("Reminder", back_populates="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User {self.email}>"

    @classmethod
    def create_new_user(cls, **kwargs):
        raw_password = kwargs.pop("password", None)
        if raw_password:
            kwargs["password_hash"] = bcrypt.generate_password_hash(raw_password).decode("utf-8")
        kwargs["email"] = kwargs.get("email", "").strip().lower()
        user = cls(**kwargs)
        db.session.add(user)
        db.session.commit()
        return user

    @classmethod
    def find_by_email(cls, email):
        email = email.strip().lower()
        return db.session.execute(db.select(cls).where(cls.email == email)).scalar_one_or_none()

    def check_psw(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "user_id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "profile_pic": self.profile_pic,
            "birth_date": self.birth_date,
            "hobbies": self.hobbies,
            "gender": self.gender,
            "ocupacion": self.ocupacion,
            "tipo_personalidad": self.tipo_personalidad
        }


class Contactos(db.Model):
    __tablename__ = "giifts_contactos"
    # Supabase table: giifts_contactos — PK is 'id'
    id: Mapped[int] = mapped_column("id", primary_key=True)
    user_id: Mapped[int] = mapped_column("user_id", ForeignKey("giifts_users.id"), nullable=False)
    name: Mapped[str] = mapped_column("name", String(120), nullable=False)
    gender: Mapped[str] = mapped_column("gender", String(20), nullable=True)
    relation: Mapped[str] = mapped_column("relation", String(20), nullable=True)
    birth_date: Mapped[str] = mapped_column("birth_date", String(10), nullable=True)
    hobbies: Mapped[str] = mapped_column("hobbies", String(999), nullable=True)
    url_img: Mapped[str] = mapped_column("url_img", String(899), nullable=True)
    ocupacion: Mapped[str] = mapped_column("ocupacion", String(120), nullable=True)
    tipo_personalidad: Mapped[str] = mapped_column("tipo_personalidad", String(120), nullable=True)
    created_at: Mapped[datetime] = mapped_column("created_at", DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user = db.relationship("User", back_populates="contactos")
    favoritos = db.relationship("Favorite", back_populates="contacto", cascade="all, delete-orphan")
    historial = db.relationship("Historial", back_populates="contacto", cascade="all, delete-orphan")
    reminders = db.relationship("Reminder", back_populates="contacto", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Contacto {self.name}>"

    def to_dict(self):
        return {
            "contactos_id": self.id,
            "name": self.name,
            "birth_date": self.birth_date,
            "gender": self.gender,
            "relation": self.relation,
            "hobbies": self.hobbies,
            "url_img": self.url_img,
            "ocupacion": self.ocupacion,
            "tipo_personalidad": self.tipo_personalidad,
        }


class Producto(db.Model):
    __tablename__ = "giifts_productos"
    # Supabase table: giifts_productos — PK is 'id'
    id: Mapped[int] = mapped_column("id", primary_key=True)
    nombre: Mapped[str] = mapped_column("nombre", String(255), nullable=False)
    termino_busqueda: Mapped[str] = mapped_column("termino_busqueda", String(255), nullable=True)
    link_compra: Mapped[str] = mapped_column("link_compra", String(899), nullable=True)
    img_url: Mapped[str] = mapped_column("img_url", String(899), nullable=True)
    descripcion: Mapped[str] = mapped_column("descripcion", String(999), nullable=True)
    precio: Mapped[str] = mapped_column("precio", String(50), nullable=True)
    # Legacy columns kept for compatibility with existing rows
    link: Mapped[str] = mapped_column("link", String(899), nullable=True)
    img: Mapped[str] = mapped_column("img", String(899), nullable=True)
    contact_id: Mapped[int] = mapped_column("contact_id", ForeignKey("giifts_contactos.id"), nullable=True)
    updated_at: Mapped[datetime] = mapped_column("updated_at", DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    created_at: Mapped[datetime] = mapped_column("created_at", DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    favoritos = db.relationship("Favorite", back_populates="producto", cascade="all, delete-orphan")
    historial = db.relationship("Historial", back_populates="producto", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "link": self.link_compra or self.link,
            "img": self.img_url or self.img,
            "precio": self.precio,
            "descripcion": self.descripcion
        }


class Historial(db.Model):
    __tablename__ = "giifts_historial"
    # Supabase table: giifts_historial
    id: Mapped[int] = mapped_column("id", primary_key=True)
    user_id: Mapped[int] = mapped_column("user_id", ForeignKey("giifts_users.id"), nullable=False)
    contact_id: Mapped[int] = mapped_column("contact_id", ForeignKey("giifts_contactos.id"), nullable=True)
    producto_id: Mapped[int] = mapped_column("producto_id", ForeignKey("giifts_productos.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column("created_at", DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user = db.relationship("User", back_populates="historial")
    contacto = db.relationship("Contactos", back_populates="historial")
    producto = db.relationship("Producto", back_populates="historial")

    def to_dict(self):
        return {
            "id": self.id,
            "producto": self.producto.to_dict(),
            "date": self.created_at
        }


class Favorite(db.Model):
    __tablename__ = "giifts_favorites"
    # Supabase table: giifts_favorites
    id: Mapped[int] = mapped_column("id", primary_key=True)
    user_id: Mapped[int] = mapped_column("user_id", ForeignKey("giifts_users.id"), nullable=False)
    contact_id: Mapped[int] = mapped_column("contact_id", ForeignKey("giifts_contactos.id"), nullable=True)
    producto_id: Mapped[int] = mapped_column("producto_id", ForeignKey("giifts_productos.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column("created_at", DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user = db.relationship("User", back_populates="favoritos")
    contacto = db.relationship("Contactos", back_populates="favoritos")
    producto = db.relationship("Producto", back_populates="favoritos")

    def to_dict(self):
        return {
            "id": self.id,
            "contact_id": self.contact_id,
            "producto": self.producto.to_dict()
        }


class Reminder(db.Model):
    __tablename__ = "giifts_reminders"
    # Supabase table: giifts_reminders
    id: Mapped[int] = mapped_column("id", primary_key=True)
    user_id: Mapped[int] = mapped_column("user_id", ForeignKey("giifts_users.id"), nullable=False)
    contact_id: Mapped[int] = mapped_column("contact_id", ForeignKey("giifts_contactos.id"), nullable=True)
    title: Mapped[str] = mapped_column("title", String(120), nullable=False)
    reminder_date: Mapped[str] = mapped_column("reminder_date", String(10), nullable=False)
    notify_days_before: Mapped[int] = mapped_column("notify_days_before", Integer, default=30)
    created_at: Mapped[datetime] = mapped_column("created_at", DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user = db.relationship("User", back_populates="reminders")
    contacto = db.relationship("Contactos", back_populates="reminders")

    def to_dict(self):
        return {
            "id": self.id,
            "contact_id": self.contact_id,
            "title": self.title,
            "reminder_date": self.reminder_date,
            "notify_days_before": self.notify_days_before
        }
