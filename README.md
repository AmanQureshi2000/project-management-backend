# 📖 Project Management API (Backend Documentation)

This is the backend API for the **PERN Project Management App**.  
It provides CRUD endpoints for **Projects, Tasks, Tags, and Comments**.

---

## 🔹 Base URL
```
local=http://localhost:5000/api
production=https://project-management-backend-od3e.onrender.com/api

```

---

## 🔹 Projects

### Get all projects
```
GET /projects
```

### Get single project
```
GET /projects/:id
```

### Create project
```
POST /projects
```
**Body**
```json
{
  "name": "Frontend App",
  "description": "React UI implementation"
}
```

### Update project
```
PUT /projects/:id
```
**Body**
```json
{
  "name": "Updated Project",
  "description": "New description",
  "status": "archived"
}
```

### Delete project
```
DELETE /projects/:id
```

---

## 🔹 Tasks

### Get all tasks (optionally filter by project)
```
GET /tasks
GET /tasks?projectId=1
```

### Get single task
```
GET /tasks/:id
```

### Create task
```
POST /tasks
```
**Body**
```json
{
  "project_id": 1,
  "title": "Setup React frontend",
  "description": "Initialize React app and install Tailwind",
  "priority": "high",
  "status": "todo",
  "due_date": "2025-09-01"
}
```

### Update task
```
PUT /tasks/:id
```
**Body**
```json
{
  "title": "Setup backend",
  "description": "Initialize Express server",
  "priority": "medium",
  "status": "in-progress",
  "due_date": "2025-09-02"
}
```

### Delete task
```
DELETE /tasks/:id
```

---

## 🔹 Tags

### Get all tags
```
GET /tags
```

### Create tag
```
POST /tags
```
**Body**
```json
{
  "name": "urgent"
}
```

### Update tag
```
PUT /tags/:id
```
**Body**
```json
{
  "name": "low-priority"
}
```

### Delete tag
```
DELETE /tags/:id
```

---

### Assign tag to task
```
POST /tags/assign
```
**Body**
```json
{
  "task_id": 1,
  "tag_id": 2
}
```

### Unassign tag from task
```
DELETE /tags/unassign?task_id=1&tag_id=2
```

---

## 🔹 Comments

### Get all comments for a task
```
GET /comments?taskId=1
```

### Get single comment
```
GET /comments/:id
```

### Create comment
```
POST /comments
```
**Body**
```json
{
  "task_id": 1,
  "content": "This needs to be finished by tomorrow!"
}
```

### Update comment
```
PUT /comments/:id
```
**Body**
```json
{
  "content": "Updated comment text"
}
```

### Delete comment
```
DELETE /comments/:id
```

---

✅ With this, your backend is **feature complete** and ready for frontend integration.

```