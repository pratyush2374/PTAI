interface LinkProps {
    href: string;
    label: string;
}

const FooterLink: React.FC<LinkProps> = ({ href, label }) => (
    <li>
        <a href={href}>{label}</a>
    </li>
);

export default FooterLink;
