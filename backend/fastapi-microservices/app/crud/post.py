from sqlalchemy.orm import Session
from app.models.post import Post as PostModel
from app.schemas.post import PostCreate


def create_post(db:Session, post: PostCreate):
    db_post = PostModel(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_posts(db:Session, limit:int = 5, offset: int = 0):
    posts = db.query(PostModel).limit(limit).offset(offset).all()
    return posts

def get_all_post(db:Session):
    return db.query(PostModel).all()

def get_post_by_id(db:Session, post_id: int):
    return db.query(PostModel).filter(PostModel.id == post_id).first()

def update_post(db: Session, post_id: int, post_data: PostCreate):
    post = db.query(PostModel).filter(PostModel.id == post_id).first()
    if post:
        for key, value in post_data.dict().items():
            setattr(post, key, value)
        db.commit()
        db.refresh(post)
    return post

def delete_post(db: Session, post_id: int):
    post = db.query(PostModel).filter(PostModel.id == post_id).first()
    if post:
        db.delete(post)
        db.commit()
    return post