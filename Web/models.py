from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Quiz_Questions(models.Model):
    q_type = models.CharField(max_length=100)
    question = models.CharField(max_length=300)
    solution = models.CharField(max_length=10)

    def __str__(self):
        return str(self.question)

class Quiz_MCAnswers(models.Model):
    question = models.ForeignKey(Quiz_Questions, on_delete=models.CASCADE)
    answer = models.CharField(max_length=300)
    correct = models.BooleanField()

    def __str__(self):
        return str(self.question)

#parent model
class Forum(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    topic = models.CharField(max_length=300)
    description = models.CharField(max_length=1000,blank=True)
    date_created = models.DateTimeField(auto_now_add = True, null = True)

    def __str__(self):
        return str(self.topic)

#child model
class Discussion(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    forum = models.ForeignKey(Forum, blank=True,on_delete=models.CASCADE)
    discuss = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.forum)

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "forum": self.forum.topic,
            "discuss": self.discuss,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p")
        }
    
class LearningMaterial(models.Model):
    subject = models.CharField(max_length=100)
    content = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.subject)