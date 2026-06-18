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
from predictions.service import (
    predict_ideal_voter_vectors_by_regions,
    predict_president_similarities,
)


@csrf_exempt
def presidential_calculations(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=405)

    # get data from json
    data = CalculationPresidentialRequest.model_validate_json(request.body)

    # parse country descr into metrics
    result_decr = llm_parse_country_descr.parse_country_descr(data.country.descr)

    # parse candidates into metrics
    # for every candidate generate vector from data
    candidates = llm_parse_candidates.parse_all_candidates(data.candidates)
    pprint(data.candidates)

    # get voters by every region
    voters_by_regions_full_data_for_model = create_voters_vectors(
        data.voters, data.regions, result_decr
    )

    # get probability for voters to go to election
    # and generate their vector of good candidate
    voters_by_regions_ideal_vectors = predict_ideal_voter_vectors_by_regions(
        voters_by_regions_full_data_for_model
    )
    # voters and candidates corellation
    similarities = predict_president_similarities(
        voters_by_regions_ideal_vectors, candidates
    )
    print(similarities)

    # by election mode count all election systems results
    # send result to frontend
    result = {
        # countryId
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
    # list of party person candidates by regions
    
    pprint(candidates)
    # get voters by every region
    voters_by_regions_full_data_for_model = create_voters_vectors(
        data.voters, data.regions, result_decr
    )
    # get probability for voters to go to election
    # and generate their vector of good candidate
    voters_by_regions_ideal_vectors = predict_ideal_voter_vectors_by_regions(
        voters_by_regions_full_data_for_model
    )
    pprint(voters_by_regions_ideal_vectors)
    # voters and candidates corellation
    # by election mode count all election systems results
    # send result to frontend
    result = {
        # countryId
        # regions: {id, voters:[{id, voting_probability, party_candidates:[{id, persentage_correllation}], party_person_candidates:[{id, persentage_correllation}]}]}
        # voting_systems:{}
    }
    return JsonResponse(result)
