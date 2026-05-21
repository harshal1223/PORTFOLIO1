from django.urls import path
from .views import ProjectListView, SkillListView, CertificationListView, ContactView

urlpatterns = [
    path('projects/',       ProjectListView.as_view(),       name='project-list'),
    path('skills/',         SkillListView.as_view(),          name='skill-list'),
    path('certifications/', CertificationListView.as_view(),  name='certification-list'),
    path('contact/',        ContactView.as_view(),            name='contact'),
]
