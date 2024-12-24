import Link from "next/link";

interface Step7Props {
    additionalInfo: string;
    setAdditionalInfo: React.Dispatch<React.SetStateAction<string>>;
    isSubmitting: boolean;
    onSubmit: () => void;
}

const Step7: React.FC<Step7Props> = ({
    additionalInfo,
    setAdditionalInfo,
    isSubmitting,
    onSubmit,
}) => {
    const handleAdditionalInfoChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setAdditionalInfo(event.target.value);
    };

    return (
        <>
            <h3 className="text-lg font-semibold text-black">
                Any additional information?
            </h3>
            <textarea
                value={additionalInfo}
                onChange={handleAdditionalInfoChange}
                className="mt-2 p-4 border rounded-lg w-full h-32 resize-none"
                placeholder="Feel free to share any other details... (optional)"
            ></textarea>
            <button
                onClick={onSubmit}
                className="mt-4 bg-blue-500 text-white p-3 px-6 rounded-lg font-bold transition-all duration-200 hover:bg-blue-600"
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
        </>
    );
};

export default Step7;
