import { useEffect, useMemo, useRef } from "react";
import * as echarts from "echarts";

import type { Region, VotingGroup } from "../../../types/country";
import { CHART_TEXT } from "../../../ui/messages";
import { VOTERS_SETTINGS_TABLE } from "../../../ui/voters-settings-table";

import styles from "../../../styles/country/charts/PopulationPyramid.module.css";

interface PopulationPyramidProps {
    region: Region | null;
    voting_group: VotingGroup[];
}
export default function PopulationPyramid({ region, voting_group }: PopulationPyramidProps) {
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
            title: {
                text: region?.displayInTable || CHART_TEXT.text_general,
                textStyle: {
                    fontFamily: "Roboto Serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "24px",
                    color: "#000000"
                },
            },
            xAxis: {
                type: "value",
                axisLabel: {
                    formatter: (v: number) => Math.abs(v)
                }
            },

            yAxis: {
                type: "category",
                data: ageLabels,
                name: CHART_TEXT.text_age,
                textStyle: {
                    fontFamily: "Roboto Serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#000000",
                }
            },

            series: [
                {
                    name: CHART_TEXT.text_sex.male,
                    color: "#6EA9D2",
                    type: "bar",
                    stack: "total",
                    data: male.map(v => -v)
                },
                {
                    name: CHART_TEXT.text_sex.female,
                    color: "#E38E84",
                    type: "bar",
                    stack: "total",
                    data: female
                }
            ],
            graphic: [
                {
                    type: "text",
                    left: "25%",
                    top: 40,
                    style: {
                        text: "Чоловіки",
                        font: "600 18px Roboto Serif",
                        fill: "#000"
                    }
                },
                {
                    type: "text",
                    right: "25%",
                    top: 40,
                    style: {
                        text: "Жінки",
                        font: "600 18px Roboto Serif",
                        fill: "#000"
                    }
                }
            ]
        });
        return () => chart.dispose();
    }, [male, female, region, ageLabels]);

    return (
        <div className={styles["population-block"]}>
            <div className={styles["population-pyramid-container"]}>
                <div ref={ref} />
            </div>
            <div>Голоси</div>
        </div>
    );
}