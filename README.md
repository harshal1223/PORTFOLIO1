# Harshal Thakur — Portfolio

A full-stack portfolio with a **vanilla HTML/CSS/JS frontend** and a **Django REST API backend**.

---

## Project Structure

```
portfolio/
├── frontend/
│   ├── index.html          ← Main HTML page
│   ├── css/
│   │   └── style.css       ← All styles
│   └── js/
│       └── main.js         ← API calls, form handling, animations
│
└── backend/
    ├── manage.py
    ├── requirements.txt
    ├── seed_data.py        ← One-time DB seed script
    ├── config/
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    └── portfolio/          ← Django app
        ├── models.py       ← Project, Skill, ContactMessage
        ├── serializers.py
        ├── views.py        ← API views
        ├── urls.py
        └── admin.py
```

---

## Backend Setup

### 1. Create & activate a virtual environment

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Run migrations

```bash
python manage.py migrate
```

### 4. Seed the database with your data

```bash
python seed_data.py
```

### 5. Create an admin superuser (to use Django admin)

```bash
python manage.py createsuperuser
```

### 6. Start the Django server

```bash
python manage.py runserver
```

The API will be live at **http://127.0.0.1:8000/api/**

---

## API Endpoints

| Method | URL                    | Description                    |
|--------|------------------------|--------------------------------|
| GET    | `/api/projects/`       | List all projects               |
| GET    | `/api/skills/`         | List skill categories + skills  |
| POST   | `/api/contact/`        | Submit a contact message        |
| —      | `/admin/`              | Django admin panel              |

### POST `/api/contact/` — Request body

```json
{
  "name": "Recruiter Name",
  "email": "recruiter@company.com",
  "message": "We'd love to have you on our team!"
}
```

---

## Frontend Setup

No build step needed. Just open `frontend/index.html` in a browser.

> **Tip:** Use the **Live Server** extension in VS Code to avoid CORS issues when running locally. Right-click `index.html` → "Open with Live Server".

Make sure the Django backend is running at `http://127.0.0.1:8000` before opening the frontend.

---

## Django Admin

Visit **http://127.0.0.1:8000/admin/** to:
- Add / edit / reorder Projects and their bullet points
- Add / edit Skills and categories
- Read incoming Contact messages (mark as read)

---

## Going Live (Production Checklist)

1. Set `DEBUG = False` in `settings.py`
2. Set a real `SECRET_KEY` via environment variable
3. Update `ALLOWED_HOSTS` with your domain
4. Configure real SMTP in settings for email notifications
5. Run `python manage.py collectstatic`
6. Deploy backend to **Railway**, **Render**, or **Heroku**
7. Deploy frontend to **GitHub Pages**, **Netlify**, or **Vercel**
8. Update `API_BASE` in `frontend/js/main.js` to point to your live backend URL

---

## Deploy to GitHub Pages (Frontend Only)

The frontend is configured to deploy automatically via GitHub Actions when you push to `main`.

### 1. Enable GitHub Pages

1. Go to your repository → **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: `gh-pages` (will be created automatically after first deploy)
3. Save settings

### 2. Push Changes

```bash
git add .
git commit -m "Enable GitHub Pages deployment"
git push origin main
```

### 3. Deploy Django Backend

Deploy the backend to **Render** (free tier available):

1. Push your code to a GitHub repository
2. Sign up at [render.com](https://render.com)
3. Create a new **Web Service**
4. Connect your GitHub repo
5. Set these values:
   - **Build Command:** `cd backend && pip install -r requirements.txt && python manage.py migrate`
   - **Start Command:** `cd backend && gunicorn config.wsgi:application`
6. Add environment variables:
   - `DJANGO_SETTINGS_MODULE`: `config.settings`
   - `SECRET_KEY`: Generate a secure key: `python -c "import secrets; print(secrets.token_urlsafe(50))"`
   - `DEBUG`: `False`
   - `ALLOWED_HOSTS`: Your Render subdomain (e.g., `your-app.onrender.com`)

### 4. Update Frontend API URL

After deploying Django, update the API URL in `frontend/index.html`:

```javascript
window.API_URL = 'https://your-app.onrender.com/api';
```

Then commit and push to trigger a new GitHub Pages deployment.
