import sys
import os
import django

if __name__ == '__main__':
    # insert here whatever commands you use to run daphne
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chat_backend.settings")

    sys.argv = ['daphne', 'chat_backend.asgi:application']
    from daphne.cli import CommandLineInterface
    django.setup()
    CommandLineInterface.entrypoint()
