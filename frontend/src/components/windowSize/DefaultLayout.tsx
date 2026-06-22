import { useCountryStore } from "../../store/countryStore";
import CountryLayout from "../country/CountryLayout";
import CreateCountryButtonContainer from "../country/create-country-container/CreateCountryButtonContainer";

import DefaultMessage from "./DefaultMessage";

export default function DefaultLayout() {
    const activeCountry = useCountryStore((state) =>
        state.countries.find(
            (country) =>
                country.id === state.activeCountryId
        )
    );

    return (
        <>
            <DefaultMessage></DefaultMessage>
            <CreateCountryButtonContainer></CreateCountryButtonContainer>
            <div className="country_stack">
                {activeCountry &&
                    <CountryLayout
                        key={activeCountry.componentId}
                        id={activeCountry.id}
                        label={activeCountry.label}
                    />}
            </div>
        </>
    );
}