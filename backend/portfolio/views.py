from django.conf import settings
from django.core.mail import send_mail

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Project, SkillCategory, Certification, ContactMessage
from .serializers import (
    ProjectSerializer,
    SkillCategorySerializer,
    CertificationSerializer,
    ContactMessageSerializer,
)


class ProjectListView(generics.ListAPIView):
    """GET /api/projects/ — returns all projects ordered by 'order' field."""
    queryset         = Project.objects.prefetch_related('project_bullets').all()
    serializer_class = ProjectSerializer


class SkillListView(generics.ListAPIView):
    """GET /api/skills/ — returns skill categories with nested skills."""
    queryset         = SkillCategory.objects.prefetch_related('skills').all()
    serializer_class = SkillCategorySerializer


class CertificationListView(generics.ListAPIView):
    """GET /api/certifications/ — returns all certifications."""
    queryset         = Certification.objects.all()
    serializer_class = CertificationSerializer


class ContactView(APIView):
    """POST /api/contact/ — saves message and optionally sends email notification."""

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        msg = serializer.save()

        # Optional email notification — works when EMAIL_BACKEND is SMTP
        try:
            send_mail(
                subject=f'[Portfolio] New message from {msg.name}',
                message=(
                    f'Name:    {msg.name}\n'
                    f'Email:   {msg.email}\n\n'
                    f'Message:\n{msg.message}'
                ),
                from_email=settings.CONTACT_EMAIL,
                recipient_list=[settings.CONTACT_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass  # Don't fail the response if email fails

        return Response(
            {'message': 'Message received! I will get back to you soon.'},
            status=status.HTTP_201_CREATED,
        )
