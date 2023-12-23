import { config } from '../settings/siteSettings'

export const Footer = () => {
    return (
        <footer class="Footer__footer">
            <div class="Footer__wrapper">
                <p class="Footer__text"><small>© {config.author}</small></p>
            </div>
        </footer>
    );
};