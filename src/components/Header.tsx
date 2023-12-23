import { config } from '../settings/siteSettings'

export const Header = () => {
    return (
        <div class="Header__root">
            <div class="container">
                <header class="Header__header">
                    <h1 class="Header__siteTitle">
                        <a href="/">
                            {config.siteTitle}
                        </a>
                    </h1>
                    <nav class="Header__navigations">
                        <a class="Header__navigationLink" href={config.repos} target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a class="Header__navigationLink" href={config.about} target="_blank" rel="noopener noreferrer">About</a>
                    </nav>
                </header>
            </div>
        </div>
    )
};