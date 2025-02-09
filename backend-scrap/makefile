.PHONY: migrate run-server superuser spectacular coverage pytest

migrate:
	python3 manage.py makemigrations; python3 manage.py migrate

run-server:
	python3 manage.py runserver

superuser:
	python3 manage.py createsuperuser

spectacular:
	python3 manage.py spectacular --file schema.yml

coverage:
	cd project && coverage run -m pytest; coverage html
pytest:
	cd project && pytest -s ; pytest -s --cov