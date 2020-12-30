from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("forum", views.forum, name="forum"),
    path("quiz", views.quiz, name="quiz"),
    path("solution", views.solution, name="solution"),
    path("about", views.about, name="about"),
    path("contact", views.contact, name="contact"),

    path('addForum', views.addInForum, name='addInForum'),
    path('forumPost/<str:topic>', views.forumPost,name='forumPost'),

    #API Routes
    path("new_post/<str:topic>", views.new_post, name="new_post"),
    path("posts/<str:topic>", views.forum_post, name="forum_post"),
    path("quiz_questions", views.quiz_questions, name="quiz_questions"),

]
