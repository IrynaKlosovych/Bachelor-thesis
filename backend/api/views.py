from pprint import pprint

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from domain.calculation_schemas.request.calculation_parliamentary_request import (
    CalculationParliamentaryRequest,
)
from domain.calculation_schemas.request.calculation_presidential_request import (
    CalculationPresidentialRequest,
)
from domain.candidate_schemas.parliament_candidates import ParliamentCandidates
from llm import llm_parse_candidates, llm_parse_country_descr
from predictions.helpers import create_voters_vectors


@csrf_exempt
def presidential_calculations(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    # get data from json
    data = CalculationPresidentialRequest.model_validate_json(request.body)

    pprint(data.model_dump())
    # parse country descr into metrics
    result_decr = llm_parse_country_descr.parse_country_descr(data.country.descr)
    pprint(result_decr)

    # parse candidates into metrics
    # candidates = llm_parse_candidates.parse_all_candidates(data.candidates)
    # pprint(candidates)

    # 1. for every region get voters and
    voters_by_regions_full_data_for_model=create_voters_vectors(data.voters, data.regions, result_decr)
    pprint(voters_by_regions_full_data_for_model)
    # 1.1. get probability for voters to go to election
    # 1.2. generate their vector of good candidate

    # 2. for every candidate generate vector from data

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


@csrf_exempt
def parliamentary_calculations(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    # get data from json
    data = CalculationParliamentaryRequest.model_validate_json(request.body)
    pprint(data.model_dump())

    # parse country descr into metrics
    result_decr = llm_parse_country_descr.parse_country_descr(data.country.descr)
    pprint(result_decr)

    # parse candidates into metrics
    candidates = ParliamentCandidates.model_validate_json(
        {
            "parties": llm_parse_candidates.parse_all_candidates(
                data.candidates.parties
            ),
            "persons": llm_parse_candidates.parse_all_candidates(
                data.candidates.persons
            ),
        }
    )
    pprint(candidates)
