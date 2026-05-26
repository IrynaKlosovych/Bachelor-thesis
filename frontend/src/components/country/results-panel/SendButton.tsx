import { TEXT_SEND_DATA_TO_SERVER } from "../../../ui/country_messages";
import Button from "../../Button";

export default function SendButton() {

    const handleSend = () => {

    };
    return (
        <>
            <Button
                text={TEXT_SEND_DATA_TO_SERVER}
                onClick={handleSend}>
            </Button>
        </>
    );
}