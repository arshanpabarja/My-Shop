# استفاده از ایمیج رسمی Python
FROM python:3.11-slim

# ساخت دایرکتوری برای پروژه
WORKDIR /app

# نصب نیازمندی‌ها
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# کپی بقیه کدها
COPY . .

# اجرای سرور
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
