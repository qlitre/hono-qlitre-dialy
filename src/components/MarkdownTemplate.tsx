import { raw } from 'hono/html'

type Props = {
    body: string
}


export const MarkdownTemplate = ({ body }: Props) => {
    //const mdBody = getHighlightBody(body)
    // なんかバグるようになったので一旦コメントアウト
    // cdn読み込みでハイライトは対応
    return (
        <div class="md">
            {raw(body)}
        </div>
    )
}