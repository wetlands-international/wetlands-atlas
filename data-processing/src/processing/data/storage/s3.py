"""
Module for uploading files to AWS S3 using temporary credentials.
"""

import os

import boto3
from dotenv import load_dotenv
from rich.console import Console

console = Console()

# Load environment variables from the .env file
load_dotenv()

# Access credentials from the environment variables
AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_SESSION_TOKEN = os.getenv("AWS_SESSION_TOKEN")
AWS_REGION = os.getenv("AWS_DEFAULT_REGION")
AWS_BUCKET_NAME = os.getenv("AWS_BUCKET_NAME")


def upload_file_to_s3(local_path, object_key):
    """
    Upload a local file to S3 using temporary credentials.
    """
    # Create a session with the temporary creds
    session = boto3.Session(
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        aws_session_token=AWS_SESSION_TOKEN,
        region_name=AWS_REGION,
    )

    # Upload
    s3 = session.client("s3")
    s3.upload_file(local_path, AWS_BUCKET_NAME, object_key)
    console.print(f"✅ Uploaded {local_path} → s3://{AWS_BUCKET_NAME}/{object_key}")
