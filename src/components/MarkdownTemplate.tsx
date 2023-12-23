import { raw } from 'hono/html'
import { getHighlightBody } from '../utils/getHighlightBody';

type Props = {
    body: string
}


export const MarkdownTemplate = ({ body }: Props) => {
    const mdBody = getHighlightBody(body)
    return (
        <div class="md">
            {raw(mdBody)}
        </div>
    )
}