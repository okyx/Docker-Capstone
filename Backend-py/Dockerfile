FROM python
EXPOSE 3000
WORKDIR /BACKEND-PY

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

CMD ["python3", "/BACKEND-PY/app.py"]
