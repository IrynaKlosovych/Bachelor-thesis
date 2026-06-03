from django.views.decorators.csrf import csrf_exempt

import json
from django.http import JsonResponse

@csrf_exempt
def calculations(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    data = json.loads(request.body)
    print(data)

    result = {
        "test": "test-result"
    }

    return JsonResponse(result)