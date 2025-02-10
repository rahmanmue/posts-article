from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.post import PostCreate, PostResponse, PostsResponse
from app.crud.post import create_post, get_posts, get_post_by_id, update_post, delete_post, get_all_post
from app.db.session import get_db

router = APIRouter()

@router.post("/article", response_model=dict, status_code=201)
def create_post_article(post: PostCreate, db: Session = Depends(get_db)):
    create_post(db, post)
    return {}

@router.put("/article/{id}", response_model=dict)
def update_post_article(id: int, post: PostCreate, db: Session = Depends(get_db)):
    updated_post = update_post(db, id, post)
    if not updated_post:
        raise HTTPException(status_code=404, detail="Article not found")
    return {}

@router.get("/all-articles", response_model=list[PostsResponse])
def get_all_articles(db: Session = Depends(get_db)):
    posts = get_all_post(db)
    return posts

@router.get("/article/{limit}/{offset}", response_model=list[PostResponse])
def get_post_article(limit: int, offset: int, db: Session = Depends(get_db)):
    posts = get_posts(db, limit, offset)
    return posts

@router.get("/article/{id}", response_model=PostResponse)
def get_post_by_id_article(id: int, db: Session = Depends(get_db)):
    post = get_post_by_id(db, id)
    if not post:
        raise HTTPException(status_code=404, detail="Article not found")
    return post

@router.delete("/article/{id}", status_code=204)
def delete_post_article(id: int, db: Session = Depends(get_db)):
    deleted_post = delete_post(db, id)
    if not deleted_post:
        raise HTTPException(status_code=404, detail="Article not found")
    return