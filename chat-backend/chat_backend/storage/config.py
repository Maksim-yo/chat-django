import os
import minio
import sys
import logging
from storage.minio.MinioRepository import MinioRepository
from storage.minio.MinioPathFactory import MinioObjectFactory
from storage.services.FileService import FileService
from storage.services.dao.StorageDAO import StorageDAO
from storage.services.SearchService import SearchService

file_repository = None
file_service = None
folder_service = None
search_service = None


def init_config():

    try:
        minio_endpoint = os.environ.get('MINIO_ENDPOINT', 'localhost') + ":9000"
        minio_access_key = os.environ.get('MINIO_ACCESS_KEY', 'admin')
        minio_secret_key = os.environ.get('MINIO_SECRET_KEY', 'admin1234')
        client = minio.Minio(minio_endpoint, minio_access_key, minio_secret_key, secure=False)
        logging.info("Checking storage connection")
        if not client.bucket_exists('nonexistingbucket'):
            logging.info("Object storage connected")
        global file_repository
        global file_service
        global folder_service
        global search_service
        file_repository = MinioRepository(client)
        path_factory = MinioObjectFactory()
        storage = StorageDAO(path_factory)
        search_service = SearchService()
        file_service = FileService(file_repository, storage, path_factory)
    except minio.S3Error:
        logging.critical("Object storage not reachable")
        sys.exit()


