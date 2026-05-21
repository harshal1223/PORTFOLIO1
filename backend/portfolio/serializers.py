from rest_framework import serializers
from .models import Project, ProjectBullet, SkillCategory, Skill, Certification, ContactMessage


class ProjectBulletSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ProjectBullet
        fields = ['text']


class ProjectSerializer(serializers.ModelSerializer):
    bullets = serializers.SerializerMethodField()

    class Meta:
        model  = Project
        fields = ['id', 'name', 'tech_stack', 'bullets']

    def get_bullets(self, obj):
        return [b.text for b in obj.project_bullets.all()]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Skill
        fields = ['name', 'level']


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model  = SkillCategory
        fields = ['category', 'skills']


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Certification
        fields = ['id', 'title', 'issuer', 'period', 'grade', 'cert_id', 'pdf_file']


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = ContactMessage
        fields = ['name', 'email', 'message']

    def validate_name(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError('Name must be at least 2 characters.')
        return value.strip()

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError('Message must be at least 10 characters.')
        return value.strip()
