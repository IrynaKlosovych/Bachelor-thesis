"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views.
"""

from django.urls import path

from api.views import parliamentary_calculations, presidential_calculations

urlpatterns = [
    path("api/presidential-calculate/", presidential_calculations),
    path("api/parliamentary-calculate/", parliamentary_calculations),
]
