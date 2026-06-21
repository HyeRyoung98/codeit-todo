import type { Todo, TodoDetail, UpdateItem } from "../types/types";

const BASE_URL = import.meta.env.VITE_API_URL;

const TENANT_ID = import.meta.env.VITE_TENANT_ID;

export async function getTodos(): Promise<Todo[]> {
  const params = new URLSearchParams();
  params.append("page", String(1));
  params.append("pageSize", String(100));

  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Todo 목록 조회 실패");
  }

  return res.json();
}

export async function createTodo(name: string): Promise<TodoDetail> {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!res.ok) {
    throw new Error("Todo 추가 실패");
  }

  return res.json(); 
}

export async function getTodoDetail(id: number): Promise<TodoDetail> {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${id}`);

  if (!res.ok) {
    throw new Error("상세 조회 실패");
  }

  return res.json();
}

export async function updateTodo(
  id: number,
  data: Partial<UpdateItem>
): Promise<TodoDetail> {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Todo 수정 실패");
  }

  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${TENANT_ID}/items/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("삭제 실패");
  }
}

export async function uploadImage(
  file: File
): Promise<string> {
  const formData = new FormData();

  formData.append("image", file);

  const res = await fetch(
    `${BASE_URL}/${TENANT_ID}/images/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("이미지 업로드 실패");
  }

  const data: { url: string } = await res.json();

  return data.url;
}