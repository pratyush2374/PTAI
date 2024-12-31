import Image from "next/image";

const Loading: React.FC = () => {
    return (
        <>
            <div className="position-absolute top-1/2 left-1/2">
                <Image
                    src="Images/loading.gif"
                    alt="loading"
                    width={100}
                    height={100}
                />
            </div>
        </>
    );
};

export default Loading;
