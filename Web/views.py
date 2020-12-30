from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django import forms
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import json

from .models import *
from .forms import *

# Create your views here.
def index(request):
    # Authenticated users view their inbox
    if request.user.is_authenticated:
        material = LearningMaterial.objects.all()
        return render(request, "Web/learn.html", {
            "material": material
        })

    # Everyone else is prompted to sign in
    else:
        return render(request, "Web/index.html")

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "Web/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "Web/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "Web/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "Web/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "Web/register.html")

@login_required
def forum(request):
    forums=Forum.objects.all()
    count=forums.count()
    discussion=[]
    for i in forums:
        discussion.append(i.discussion_set.all())

    context={'forums':forums,
                'count':count,
                'discussions':discussion}
    return render(request, "Web/forum.html", context)

@login_required
def quiz(request):
    return render(request, "Web/quiz.html")

def solution(request):
    return render(request, "Web/solution.html")

def about(request):
    return render(request, "Web/about.html")

def contact(request):
    return render(request, "Web/contact.html")

@login_required
def addInForum(request):
    form = CreateInForum()

    if request.method == 'POST':
        u = Forum(user=request.user)
        form = CreateInForum(request.POST,instance=u)
        if form.is_valid():
            print(form)
            form.save()
            return redirect('forum')
    context = {'form':form}
    return render(request, 'Web/addInForum.html', context)

@login_required
def forumPost(request, topic):
    f = Forum.objects.filter(topic=topic)
    return render(request, 'Web/forumPost.html', {
        "forum": f[0]
    })

@csrf_exempt
@login_required
def new_post(request, topic):
    f = Forum.objects.filter(topic=topic)
    print("1")
    # Writing a new post must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    # check post written
    data = json.loads(request.body)
    if len(data) == 0:
        return JsonResponse({"error": "Nothing written in post"}, status=400)
    print("2")
    post =  Discussion(
        user=request.user,
        forum=f[0],
        discuss=data.get("post", ""),
        )
    post.save()

    return JsonResponse({"message": "Post sent successfully"}, status=201)

def forum_post(request, topic):
    f = Forum.objects.filter(topic=topic)
    d = Discussion.objects.filter(forum=f[0])
    d = d.order_by("-timestamp").all()

    data = [post.serialize() for post in d]

    return JsonResponse(data,safe=False)

def quiz_questions(request):
    question = Quiz_Questions.objects.all()
    data = []
    for q in question:
        ans = Quiz_MCAnswers.objects.filter(question=q)
        print(ans)
        a = {}
        for i in range(len(ans)):
            a[chr(i + 97)] = ans[i].answer
        d = {
            "question": q.question,
            "answers": a,
            "correctAnswer": q.solution
        }
        data.append(d)
    print(data)
    return JsonResponse(data, safe=False)
    