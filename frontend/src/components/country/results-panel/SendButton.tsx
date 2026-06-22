import { TEXT_SEND_DATA_TO_SERVER } from "../../../ui/country_messages";
import Button from "../../Button";
interface SendButtonProps {
    handleSend:()=>void
}
export default function SendButton({handleSend }: SendButtonProps) {
    return (
        <>
            <Button
                text={TEXT_SEND_DATA_TO_SERVER}
                onClick={handleSend}>
            </Button>
        </>
    );
}