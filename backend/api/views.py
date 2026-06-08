from django.views.decorators.csrf import csrf_exempt

import json
from django.http import JsonResponse
from llm import llm_parse_country_descr, llm_parse_candidates


@csrf_exempt
def calculations(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    data = json.loads(request.body)
    print(data)

    result_decr = llm_parse_country_descr.parse_country_descr(data["country"]["descr"])
    print(result_decr)
    candidates = llm_parse_candidates.parse_all_candidates(data["candidates"])
    print(candidates)
    # 1. for every region get voters and
    # voters =[]
    # for(region in data["regions"])
    #     for(voter in data["voters"])
    #         if(voter["region_id"]==region["id"])
    #             voter = {"age": voter["age"]}

    # 1.1. get probability for voters to go to election
    # 1.2. generate their vector of good candidate

    # 2. for every candidate generate vector from data (for presidential and parlimentary different models)

    # 3. voters and candidates corellation (for presidential and parlimentary different models)

    # 4. probability for voters to go to election with bad candidates corellation

    # 5. by election mode count all election systems results

    # 6. send result to frontend
    result = {
        # country:{id, election_mode}
        # regions: {id, voters:[{id, voting_probability, candidates:[{id, persentage_correllation}]}]}
        # voting_systems:{}
    }
    return JsonResponse(result)
