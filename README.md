# Instalasi dan Menjalankan FastAPI

## 1. Buat Virtual Environment

Disarankan untuk menggunakan virtual environment agar dependensi tidak bercampur dengan sistem.

```bash
python -m venv venv
source venv/bin/activate  # Untuk Linux/Mac
venv\Scripts\activate  # Untuk Windows
```

## 2. Instal Dependensi

Jalankan perintah berikut untuk menginstal semua dependensi yang diperlukan:

```bash
pip install -r requirements.txt
```

## 3. Konfigurasi Database

Atur file konfigurasi environment `.env` dengan format:

```ini
DATABASE_URL=mysql+pymysql://<user>:<password>@localhost:3306/<db_name>
```

## 4. Jalankan Migrasi Database

Gunakan **Alembic** untuk melakukan migrasi database:

```bash
alembic upgrade head
```

Jika ingin membuat migrasi baru setelah melakukan perubahan pada model:

```bash
alembic revision --autogenerate -m "Deskripsi perubahan"
alembic upgrade head
```

## 5. Menjalankan Server FastAPI

Jalankan perintah berikut untuk menjalankan aplikasi:

```bash
uvicorn app.main:app --reload
```

Aplikasi dapat diakses di:

```
http://127.0.0.1:8000
```

# Instalasi dan Menjalankan React JS

## 1. Install Node JS
## 2. Instal Dependensi

Masuk ke direktori projek dan jalankan perintah berikut untuk menginstal semua dependensi yang diperlukan:

```
npm install
```
## 3. Menjalankan Projek


```
npm run dev
```

Aplikasi dapat diakses di:

```
http://127.0.0.1:5173