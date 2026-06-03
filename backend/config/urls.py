"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views.
"""
from django.urls import path
from api.views import calculations

urlpatterns = [
    path("api/calculate/", calculations),
]
