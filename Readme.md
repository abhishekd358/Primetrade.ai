# PrimeTrade AI — Blog API <a href="https://primetrade-frontend-theta.vercel.app/">Live Link</a>

### Postman Collection: 
- Access postman collection from ->
<a href= "https://blue-escape-13870.postman.co/workspace/Team-Workspace~576f8056-4bea-4ec3-8e97-309a86a4cee9/collection/49398953-8ccd3866-9dbb-4289-aedb-efe4547ff296?action=share&creator=49398953">Link </a>

</br>

> **Base URL (Local):** `http://localhost:5000`

> **Base URL (Prod):** `https://primetrade-ai-zycg.onrender.com`


---

## 🔐 Auth Header
Protected routes require:
```
Authorization: Bearer <token>
```

---

## Routes

### 👤 `/api/user` — User
| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/register` | ✗ | Register new user |
| `POST` | `/login` | ✗ | Login & get token |

<details>
<summary><strong>POST</strong> <code>/api/user/register</code></summary>

```json
{
  "name": "xyz",
  "email": "xyz@example.com",
  "password": "123456"
}
```
</details>

<details>
<summary><strong>POST</strong> <code>/api/user/login</code></summary>

```json
{
  "email": "user@user.com",
  "password": "User001"
}
```
Returns a JWT token.
</details>

---

### 📝 `/api/user/blog` — Blogs `🔒 Protected`
| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/api/user/blog` | ✓ | Create a blog |
| `GET` | `/api/user/blog` | ✓ | Get your blogs |
| `PUT` | `/api/user/blog` | ✓ | Update a blog |
| `DELETE` | `/api/user/blog/:blogId` | ✓ | Delete a blog |

<details>
<summary><strong>POST</strong> — Create Blog</summary>

```json
{
  "title": "My First Blog",
  "description": "Blog content here"
}
```
</details>

<details>
<summary><strong>PUT</strong> — Update Blog</summary>

```json
{
  "blogId": "blog_id_here",
  "title": "Updated Title",
  "description": "Updated Description"
}
```
</details>

<details>
<summary><strong>DELETE</strong> — Delete Blog</summary>

```
DELETE /api/user/blog/:blogId
```
</details>

---

### 👑 `/api/admin` — Admin

#### Admin Logins Credentials :

```json
{
  "email": "admin@admin.com",
  "password": "admin"
}
``` 

| Method | Endpoint | Auth | Description |
|--------|----------|:----:|-------------|
| `POST` | `/login` | ✗ | Admin login |
| `GET` | `/dashboard` | ✗ | Get all blogs |
| `DELETE` | `/dashboard/:blogId` | ✗ | Delete any blog |

---