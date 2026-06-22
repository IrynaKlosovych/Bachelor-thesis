import { useEffect, useMemo, useRef } from "react";
import * as echarts from "echarts";

import type { Country } from "../../../types/country";
import type { Region } from "../../../types/region";
import type { VotingGroup } from "../../../types/voter";
import { CHART_TEXT } from "../../../ui/chart_messages";
import { VOTERS_SETTINGS_TABLE } from "../../../ui/voters-settings-table";

import styles from "../../../styles/country/charts/PopulationPyramid.module.css";

interface PopulationPyramidProps {
    country: Country;
    region: Region | null;
    voting_group: VotingGroup[];
}
interface AxisValue {
    min: number;
    max: number;
}
export default function PopulationPyramid({ country, region, voting_group }: PopulationPyramidProps) {
    const ref = useRef<HTMLDivElement>(null);

    const ageField = VOTERS_SETTINGS_TABLE.find(f => f.name === "age");

    const ageLabels = Object.values(ageField?.possible_variants || {});

    const sexField = VOTERS_SETTINGS_TABLE.find(f => f.name === "sex");
    const sexVariants = sexField?.possible_variants || {};

    const { male, female } = useMemo(() => {
        const male = Array(ageLabels.length).fill(0);
        const female = Array(ageLabels.length).fill(0);

        for (const g of voting_group) {
            const index = ageLabels.indexOf(g.details_descr.age);
            if (index === -1) continue;

            const count = g.details_descr.peopleCount || 0;

            if (g.details_descr.sex === sexVariants.male) {
                male[index] += count;
            }

            if (g.details_descr.sex === sexVariants.female) {
                female[index] += count;
            }
        }
        return { male, female };
    }, [voting_group, ageLabels, sexVariants.male,
        sexVariants.female]);

    useEffect(() => {
        if (!ref.current) return;

        const chart = echarts.init(ref.current);

        chart.setOption({
            animation: false,
            title: {
                text: region?.displayInTable || CHART_TEXT.text_general,
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
                min: (value: AxisValue) => -Math.max(Math.abs(value.max), Math.abs(value.min), 1),
                max: (value: AxisValue) => Math.max(Math.abs(value.max), Math.abs(value.min), 1),
                axisLabel: {
                    formatter: (v: number) => Math.abs(v)
                }
            },
            yAxis: {
                type: "category",
                data: ageLabels,
            },
            grid: {
                top: 90,
                left: 50,
                right: 50,
                bottom: 40,
                containLabel: true
            },
            series: [
                {
                    name: CHART_TEXT.text_sex.male,
                    color: "#6EA9D2",
                    type: "bar",
                    cursor: "default",
                    stack: "total",
                    data: male.map(v => -v)
                },
                {
                    name: CHART_TEXT.text_sex.female,
                    color: "#E38E84",
                    type: "bar",
                    cursor: "default",
                    stack: "total",
                    data: female
                }
            ],
            graphic: [
                {
                    type: "text",
                    left: 70,
                    top: 40,
                    cursor: "default",
                    style: {
                        text: CHART_TEXT.text_age,
                        font: "normal 700 20px 'Roboto Serif'",
                        fill: "#000"
                    }
                },
                {
                    type: "text",
                    left: "25%",
                    top: 27,
                    cursor: "default",
                    style: {
                        text: CHART_TEXT.text_sex.male,
                        font: "normal 400 20px 'Roboto Serif'",
                        fill: "#000"
                    }
                },
                {
                    type: "text",
                    right: "25%",
                    top: 27,
                    cursor: "default",
                    style: {
                        text: CHART_TEXT.text_sex.female,
                        font: "normal 400 20px 'Roboto Serif'",
                        fill: "#000"
                    }
                },
            ],
        });
        return () => chart.dispose();
    }, [male, female, region, ageLabels]);
    return (
        <div className={styles["population-block"]}>
            <div className={styles["population-pyramid-container"]}>
                <div ref={ref} />
            </div>
            <div>
                {CHART_TEXT.text_votes[country.electionMode]}{(region) ? region.seats : country.totalSeats}
            </div>
        </div>
    );
}