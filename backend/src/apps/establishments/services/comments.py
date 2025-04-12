from abc import ABC, abstractmethod
from typing import List, Optional
from django.db.models import Q
from django.contrib.auth.models import User
from src.apps.establishments.models.comments import Comment as CommentModel, CommentImage as CommentImageModel
from src.apps.establishments.entities import CommentEntity, CommentImageEntity