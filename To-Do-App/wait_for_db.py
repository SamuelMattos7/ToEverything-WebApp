import os
import time
import psycopg2
from django.db.utils import OperationalError
import sys

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'to_do_backend.settings') 

def wait_for_db(timeout=60):
    host = os.environ.get('POSTGRES_HOST', 'db') 
    port = os.environ.get('POSTGRES_PORT', '5432') 
    db_name = os.environ.get('POSTGRES_DB')
    user = os.environ.get('POSTGRES_USER')
    password = os.environ.get('POSTGRES_PASSWORD')

    if not all([db_name, user, password]):
        sys.stderr.write("Error: Database environment variables (POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD) not set.\n")
        return False

    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            conn = psycopg2.connect(
                host=host,
                port=port,
                database=db_name,
                user=user,
                password=password
            )
            conn.close() 
            print("Database ready!")
            return True
        except psycopg2.OperationalError as e:
            sys.stdout.write(f"Waiting for database at {host}:{port}... ({e})\n")
            time.sleep(1) 
    sys.stderr.write("Database never became ready within the timeout.\n")
    return False

if __name__ == '__main__':
    if not wait_for_db():
        sys.exit(1) 