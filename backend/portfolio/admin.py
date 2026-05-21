from django.contrib import admin
from .models import Project, ProjectBullet, SkillCategory, Skill, Certification, ContactMessage


class ProjectBulletInline(admin.TabularInline):
    model  = ProjectBullet
    extra  = 2
    fields = ['text', 'order']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display  = ['name', 'tech_stack', 'order']
    list_editable = ['order']
    inlines       = [ProjectBulletInline]


class SkillInline(admin.TabularInline):
    model  = Skill
    extra  = 3
    fields = ['name', 'level', 'order']


@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display  = ['category', 'order']
    list_editable = ['order']
    inlines       = [SkillInline]


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display  = ['title', 'issuer', 'period', 'grade', 'order']
    list_editable = ['order']


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display        = ['name', 'email', 'created_at', 'is_read']
    list_filter         = ['is_read']
    readonly_fields     = ['name', 'email', 'message', 'created_at']
    list_editable       = ['is_read']
    ordering            = ['-created_at']
