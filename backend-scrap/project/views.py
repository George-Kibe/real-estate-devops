"""
1. API to check the server status
"""
from django.http import JsonResponse
from django.views import View

class ServerStatusView(View):
    def get(self, request, *args, **kwargs):
        status_data = {
            "Server status": "Server is up and running fine",
            "Server Name": "Python Django",
            "Uptime": "99.99%", 
        }
        return JsonResponse(status_data)
