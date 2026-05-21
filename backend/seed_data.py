
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from portfolio.models import Project, ProjectBullet, SkillCategory, Skill, Certification

# ---- Clear existing data ----
Project.objects.all().delete()
SkillCategory.objects.all().delete()
Certification.objects.all().delete()

# ---- Projects ----
projects = [
    {
        'name': 'AI Trip Planner',
        'tech_stack': 'Python · Django · External APIs',
        'order': 1,
        'bullets': [
            'AI-powered web app generating personalised travel itineraries.',
            'Integrated APIs for location, weather, and recommendations.',
            'Automated trip planning to dramatically improve user experience.',
        ],
    },
    {
        'name': 'Price Tracker',
        'tech_stack': 'Python · Beautiful Soup · Chart.js',
        'order': 2,
        'bullets': [
            'Monitors and visualises e-commerce product price trends over time.',
            'Web scraping via Beautiful Soup; interactive charts via Chart.js.',
            'Helps users make smarter purchase decisions with historical data.',
        ],
    },
    {
        'name': 'Library System',
        'tech_stack': 'Java · JDBC · MySQL',
        'order': 3,
        'bullets': [
            'Desktop app managing book issues, returns, and member records.',
            'JDBC-backed database for efficient storage and retrieval.',
            'Reduced manual errors and streamlined library operations.',
        ],
    },
]

for p_data in projects:
    bullets = p_data.pop('bullets')
    project = Project.objects.create(**p_data)
    for i, text in enumerate(bullets):
        ProjectBullet.objects.create(project=project, text=text, order=i)

print(f'Created {Project.objects.count()} projects.')

# ---- Skills ----
skill_data = [
    {
        'category': 'Languages',
        'order': 1,
        'skills': [
            ('Python',  5),
            ('Java',    4),
            ('SQL',     4),
        ],
    },
    {
        'category': 'Web',
        'order': 2,
        'skills': [
            ('HTML / CSS',   4),
            ('JavaScript',   3),
            ('Django',       3),
        ],
    },
    {
        'category': 'Database',
        'order': 3,
        'skills': [
            ('MySQL',  4),
            ('JDBC',   3),
        ],
    },
    {
        'category': 'Tools',
        'order': 4,
        'skills': [
            ('Git',           4),
            ('Beautiful Soup', 4),
            ('Chart.js',      3),
        ],
    },
    {
        'category': 'CS Fundamentals',
        'order': 5,
        'skills': [
            ('Data Structures',  4),
            ('DBMS',             4),
            ('OOP',              4),
            ('Operating Systems', 3),
            ('Computer Networks', 3),
        ],
    },
]

for cat_data in skill_data:
    skills = cat_data.pop('skills')
    category = SkillCategory.objects.create(**cat_data)
    for i, (name, level) in enumerate(skills):
        Skill.objects.create(category=category, name=name, level=level, order=i)

print(f'Created {SkillCategory.objects.count()} skill categories.')

# ---- Certifications ----
certifications = [
    {
        'title': 'Python Full Stack Developer Virtual Internship',
        'issuer': 'AICTE · EduSkills Academy',
        'period': 'April – June 2025',
        'grade': 'P',
        'cert_id': '0c68f618fc646ad6dfb142347dd8685f',
        'pdf_file': 'cert_python.pdf',
        'order': 1,
    },
    {
        'title': 'Android Developer Virtual Internship',
        'issuer': 'AICTE · EduSkills · Google for Developers',
        'period': 'January – March 2025',
        'grade': 'C',
        'cert_id': 'c0d22fdd6d4e33859f5188e8167106e6',
        'pdf_file': 'cert_android.pdf',
        'order': 2,
    },
]

for cert in certifications:
    Certification.objects.create(**cert)

print(f'Created {Certification.objects.count()} certifications.')
print('Done! Seed data loaded successfully.')
