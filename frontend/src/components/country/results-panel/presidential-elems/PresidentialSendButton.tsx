import { toast } from "react-toastify";

import { useGetPresidentCandidateByCountryId } from "../../../../hooks/candidate/useGetPresidentCandidateByCountryId";
import { useGetCountryById } from "../../../../hooks/country/useGetCountryById";
import { useGetRegionsByCountryId } from "../../../../hooks/region/useGetRegionsByCountryId";
import { useGetVotersByCountryId } from "../../../../hooks/voter/useGetVotersByCountryId";
import type { UUID } from "../../../../types/general";

import SendButton from "../SendButton";
import { fillCheckingPresidentMode } from "../../../../utils/general/fillChecking";
import ServerError from "../../../errors/ServerError";
import SimulationCheckError from "../../../errors/SimulationCheckError";

import styles from "../../../../styles/error/Errors.module.css";
import type { PresidentPersonCandidate } from "../../../../types/candidate";
interface PresidentialSendButtonProps {
    countryId: UUID;
}
const API_URL = import.meta.env.VITE_API_URL;
export default function PresidentialSendButton({ countryId }: PresidentialSendButtonProps) {
    const country = useGetCountryById(countryId);
    const regions = useGetRegionsByCountryId(countryId);
    const voters = useGetVotersByCountryId(countryId);
    const candidatesPresident = useGetPresidentCandidateByCountryId(countryId);
    if (!country) return;

    const messages = fillCheckingPresidentMode(country, regions, voters, candidatesPresident);
    const handleSend = async () => {
        if (messages.length !== 0) {
            toast(<SimulationCheckError messages={messages}></SimulationCheckError>, {
                position: "bottom-right",
                className: styles.toast,
            });
            return;
        }
        // delete prev data
        // send data to server
        // receive data from server
        // save data in store
        // use data in result block with diagrams
        let data = [
            {
                name: "Олексій Коваленко",
                experience: "15 років у державному управлінні. Колишній міністр економіки (2015–2019), до цього — директор великої приватної IT-компанії (2008–2015). Під час каденції провів податкову реформу, залучив 3 млрд доларів іноземних інвестицій. Має юридичну та економічну освіту. Активний волонтер з 2022 року — організував постачання дронів для ЗСУ. Жодних корупційних скандалів, декларації публічні та прозорі.",
                promise: "Програма містить детальні кроки з термінами та показниками: реформа судової системи за естонською моделлю (3 роки), зниження податку на прибуток для МСБ з 18% до 10%, перехід армії на контрактну основу з ринковими зарплатами. Визнає складність реформ, пояснює компроміси. Категорично проти популістських обіцянок типу 'всім по 10000'. Підтримує незалежність НБУ, НАБУ, САП. Публікує щотижневі звіти про виконання програми.",
                media: {
                    positive: 7,
                    negative: 3,
                },
                election_rating: 28,
            },
            {
                name: "Василь Громов",
                experience: "Генерал-лейтенант, командував фронтовим угрупованням 2022–2024. До військової кар'єри — народний депутат 2 скликань (2006–2014), член комітету з питань національної безпеки. Публічно критикував корупцію в оборонних закупівлях, що призвело до конфлікту з попереднім керівництвом. Освіта — військова академія, ступінь MBA отримав у 2010.",
                promise: "Головний меседж — 'Спочатку перемога, потім вибори'. Обіцяє сильну централізовану владу на час війни, мінімум дискусій — максимум дій. Економічна програма проста: заморозити тарифи, підняти мінімальну зарплату до 20000 грн, націоналізувати стратегічні підприємства. Жорстка риторика щодо Росії та колаборантів. Скептично ставиться до ролі парламенту в умовах воєнного стану.",
                media: {
                    positive: 6,
                    negative: 6,
                },
                election_rating: 22,
            },
            {
                name: "Марина Дяченко",
                experience: "Телеведуча та громадська активістка. Відома завдяки ток-шоу про корупцію (2018–2023). Жодного досвіду в державному управлінні або бізнесі. Заснувала громадську організацію 'Чисті руки' у 2020 році. Має диплом журналіста. Брала участь у Майдані 2014, активно висвітлювала початок повномасштабного вторгнення.",
                promise: "Гасло: 'Кожен українець знає, що треба робити — дайте нам владу'. Обіцяє провести 'народний аудит' всіх міністерств силами волонтерів. Пенсія від 10000 грн всім без винятку, безкоштовні ліки, нульові тарифи на комуналку. Проти 'елітних реформаторів з МВФ'. Хоче скасувати НБУ та ввести фіксований курс долара. Медійна кампанія дуже активна — щодня прямі ефіри, постійні обіцянки без пояснення джерел фінансування.",
                media: {
                    positive: 8,
                    negative: 7,
                },
                election_rating: 15,
            }
        ];
        let candidates: PresidentPersonCandidate[] = [];
        let dataId = 0;
        candidatesPresident.map((p) => {
            let candidate = {
                ...p,
                ...data[dataId]
            };
            dataId++;
            candidates.push(candidate);
        });
        try {
            const response = await fetch(
                `${API_URL}api/presidential-calculate/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        country: {
                            ...country,
                            descr: "Республіка Норланд уже два роки перебуває у стані збройного конфлікту з сусідньою державою. Основні бойові дії відбуваються поблизу кордону, проте мобілізація та військові витрати впливають на всю країну. Економіка переживає складний період через обмеження міжнародної торгівлі та зменшення іноземних інвестицій. Річна інфляція перевищує 20%, рівень безробіття зростає, а багато підприємств припинили діяльність. Корупція залишається серйозною проблемою. Розслідування журналістів свідчать про регулярне надання державних контрактів компаніям, пов'язаним із політиками, а хабарництво є поширеним явищем у місцевих органах влади. Медіасередовище є змішаним. Незалежні газети та інтернет-видання працюють без значних обмежень, однак журналісти іноді стикаються з політичним тиском, а деякі телевізійні канали перебувають під впливом влади. Попри труднощі, уряд продовжує ефективно виконувати свої функції. Вибори проводяться регулярно, державні інституції працюють стабільно, а більшість громадян довіряють демократичним процедурам. У більшості регіонів країни життя залишається відносно безпечним. Рівень злочинності помірний, державні служби працюють належним чином, проте території поблизу зони бойових дій вважаються небезпечними."
                        },
                        regions: regions,
                        voters: voters,
                        candidates: candidates
                    }),
                }
            );

            const data = await response.json();
            console.log(data)
        } catch {
            toast(<ServerError></ServerError>, {
                position: "bottom-right",
                className: styles.toast,
            });
        }
    };
    return (
        <>
            <SendButton
                handleSend={handleSend}
            ></SendButton>
        </>
    );
}