import { TEXT_SEND_DATA_TO_SERVER } from "../../../ui/country_messages";
import Button from "../../Button";

interface SendDataProps {
    handleSend: () => void;
}
export default function SendButton({ handleSend }: SendDataProps) {
    return (
        <>
            <Button
                text={TEXT_SEND_DATA_TO_SERVER}
                onClick={handleSend}>
            </Button>
        </>
    );
}