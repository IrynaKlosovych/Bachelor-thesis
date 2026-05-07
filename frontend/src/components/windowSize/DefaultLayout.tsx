import CreateCountryButtonContainer from "../country/CreateCountryButtonContainer";
import DefaultMessage from "./DefaultMessage";
import { useCountryStore } from "../../store/countryStore";
import CountryLayout from "../country/CountryLayout";

export default function DefaultLayout() {
    const countries = useCountryStore(
        (state) => state.countries
    );

    return (
        <>
            <DefaultMessage></DefaultMessage>
            <CreateCountryButtonContainer></CreateCountryButtonContainer>
            <div className="country_stack">
                {[...countries]
                    .map((country) => (
                        <CountryLayout
                            key={country.componentId}
                            id={country.id}
                            label={country.label}
                        />
                    ))}
            </div>
        </>
    );
}