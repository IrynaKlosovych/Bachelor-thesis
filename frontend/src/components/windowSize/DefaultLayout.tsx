import CreateCountryButtonContainer from "../country/CreateCountryButtonContainer";
import DefaultMessage from "./DefaultMessage";

export default function DefaultLayout() {
    return (
        <>
            <DefaultMessage></DefaultMessage>
            <CreateCountryButtonContainer></CreateCountryButtonContainer>
            <div className="country_stack">

            </div>
        </>
    );
}