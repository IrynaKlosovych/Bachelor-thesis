import { TEXT_SEND_DATA_TO_SERVER } from "../../../ui/country_messages";
import Button from "../../Button";

const API_URL = import.meta.env.VITE_API_URL;

export default function SendButton() {

    const handleSend = async () => {
        try {
            const response = await fetch(
                `${API_URL}api/calculate/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        test: "hello django"
                    }),
                }
            );

            const data = await response.json();

            console.log("Server response:", data);
        } catch (error) {
            console.error("Connection error:", error);
        }
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