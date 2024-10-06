import { raw } from 'hono/html'

type Props = {
    body: string
}


export const MarkdownTemplate = ({ body }: Props) => {
    return (
        <div class="md">
            {raw(body)}
        </div>
    )
}