from django.forms import ModelForm
from .models import Forum, Discussion

class CreateInForum(ModelForm):
    class Meta:
        model = Forum
        exclude = ['user']

class CreateInDiscussion(ModelForm):
    class Meta:
        model=Discussion
        fields = "__all__"