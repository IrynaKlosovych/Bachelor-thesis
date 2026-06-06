from django.views.decorators.csrf import csrf_exempt

import json
from django.http import JsonResponse

@csrf_exempt
def calculations(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    data = json.loads(request.body)
    print(data)

    # probability for voters to go to election
    # voters and candidates corellation
    # probability for voters to go to election with bad candidates corellation
    # by election mode count all election systems results
    # send result to frontend
    result = {}

    return JsonResponse(result)