import { Request, Response } from "express";
import { PostService } from "../services/PostService";
import { UserService } from "../services/UserService";

export const all = async (request: Request, response: Response) => {
  const posts = await PostService.findAll();

  response.json({ posts });
};

export const one = async (request: Request, response: Response) => {
  const { id } = request.params;
  const post = await PostService.findOne(parseInt(id));

  if (post) {
    response.json({ post });
  } else {
    response.status(404).json({ error: "Post não encontrado" });
  }
};

export const create = async (request: Request, response: Response) => {
  const { title, body, author } = request.body;

  if (title && body && author) {
    const user = await UserService.findOne({
      id: parseInt(author),
    });

    if (user) {
      const post = await PostService.create({ title, body, authorId: user.id });
      return response.status(201).json({ post });
    } else {
      response.json({ error: "Autor não existe" });
    }
  } else {
    response.json({ error: "Dados não preenchidos" });
  }

  response.json();
};

export const togglePost = async (request: Request, response: Response) => {
  const { id } = request.params;

  const post = await PostService.findOne(parseInt(id));

  if (post) {
    const postUpdated = await PostService.update(post.id, {
      published: !post.published,
    });
    response.json({ post: postUpdated });
  } else {
    response.json({ error: "Post não existe" });
  }
};

export const deletePost = async (request: Request, response: Response) => {
  const { id } = request.params;

  const post = await PostService.findOne(parseInt(id));

  if (post) {
    await PostService.delete(parseInt(id));
  } else {
    response.json({ error: "Post não existe" });
  }
};
