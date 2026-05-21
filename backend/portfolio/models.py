from django.db import models


class Project(models.Model):
    name       = models.CharField(max_length=120)
    tech_stack = models.CharField(max_length=200, help_text='e.g. Python · Django · MySQL')
    order      = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'created_at']

    def __str__(self):
        return self.name


class ProjectBullet(models.Model):
    project = models.ForeignKey(Project, related_name='project_bullets', on_delete=models.CASCADE)
    text    = models.CharField(max_length=300)
    order   = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.project.name} — {self.text[:50]}'


class SkillCategory(models.Model):
    category = models.CharField(max_length=80)
    order    = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']
        verbose_name_plural = 'Skill Categories'

    def __str__(self):
        return self.category


class Skill(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    name     = models.CharField(max_length=80)
    level    = models.PositiveSmallIntegerField(
        default=3,
        help_text='Proficiency dots out of 5'
    )
    order    = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.category.category} / {self.name}'


class Certification(models.Model):
    title    = models.CharField(max_length=200)
    issuer   = models.CharField(max_length=200)
    period   = models.CharField(max_length=100)
    grade    = models.CharField(max_length=10, blank=True)
    cert_id  = models.CharField(max_length=100, blank=True)
    pdf_file = models.CharField(max_length=100, blank=True, help_text='Filename inside /static/certs/')
    order    = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    name       = models.CharField(max_length=120)
    email      = models.EmailField()
    message    = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read    = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'From {self.name} <{self.email}> — {self.created_at.strftime("%d %b %Y")}'
