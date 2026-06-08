interface MediaTextSpanProps {
    media_type: string;
    percentage: string;
}
export default function MediaTextSpan({ media_type, percentage }: MediaTextSpanProps) {
    return (
        <>
            <div>
                <span>
                    {media_type}
                    <br />
                    {percentage}
                </span>
            </div>
        </>
    );
}