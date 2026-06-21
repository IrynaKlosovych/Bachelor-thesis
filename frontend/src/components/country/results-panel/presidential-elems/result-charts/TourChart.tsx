import { useEffect, useMemo,useRef } from "react";
import * as echarts from "echarts";

import { useGetPresidentCandidateByCountryId } from "../../../../../hooks/candidate/useGetPresidentCandidateByCountryId";
import type { UUID } from "../../../../../types/general";
import { RESULT_CHART } from "../../../../../ui/result-messages";

interface Props {
    countryId: UUID;
    type: string;
    tourName: string;
    results: Record<string, number>;
}

export function TourChart({ countryId, type, tourName, results }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const president_candidates = useGetPresidentCandidateByCountryId(countryId);
    const candidateMap = useMemo(() => {
        return new Map(
            president_candidates.map(c => [c.id, c])
        );
    }, [president_candidates]);
    const title = (type === "rcv" || type === "trs") ? `${RESULT_CHART.tour} ${tourName.slice(-1)}` : "";
    const xAxis = (type === "us_like") ? RESULT_CHART.us_like : RESULT_CHART.president_other_xAxis;

    useEffect(() => {
        if (!ref.current) return;

        const chart = echarts.init(ref.current);

        const candidatesIds = Object.entries(results)
            .sort(([, a], [, b]) => a - b)
            .map(([id]) => id);
        const data = candidatesIds.map(id => ({
            value: results[id].toFixed(2) ?? 0,
            name: candidateMap.get(id)?.name ?? id,
            itemStyle: {
                color: candidateMap.get(id)?.color ?? "#999"
            },
        }));
        chart.setOption({
            animation: false,
            title: {
                text: title,
                textStyle: {
                    fontFamily: "Roboto Serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: 24,
                    color: "#000000",
                    lineHeight: 31,
                },
                top: 0,
                left: "center"
            },

            xAxis: {
                type: "value",
                name: xAxis,
            },

            yAxis: {
                type: "category",
                data: candidatesIds.map(id => candidateMap.get(id)?.name ?? id),
            },

            series: [
                {
                    type: "bar",
                    data: data,
                    cursor: "default",
                    label: {
                        show: true,
                        position: "right",
                        cursor: "default"
                    },
                },
            ],
        });

        return () => {
            chart.dispose();
        };
    }, [results, tourName, candidateMap, title, xAxis]);

    return <div ref={ref} style={{
        width: "100%",
        height: "100%",
    }} />;
};;