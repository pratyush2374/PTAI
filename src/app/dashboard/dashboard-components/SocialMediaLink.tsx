import Image from "next/image";

interface SocialMediaProps {
    href: string;
    src: string;
    alt: string;
}

const SocialMediaLink: React.FC<SocialMediaProps> = ({ href, src, alt }) => (
    <li>
        <a href={href}>
            <Image src={src} alt={alt} width={20} height={20} />
        </a>
    </li>
);

export default SocialMediaLink;
