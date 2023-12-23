import type { Body } from '../types/blog';
import { AmazonLink } from './AmazonLink';
import { MarkdownTemplate } from './MarkdownTemplate';

type Props = {
    repeatedBody: Body[];
}

export const RepeatedBody = ({ repeatedBody }: Props) => {
    console.log(repeatedBody)
    return (
        <div>
            {repeatedBody.map((body, i) =>
                <div key={i}>
                    {body.fieldId === 'richEditor' ?
                        <MarkdownTemplate body={body.richText} />
                        : <AmazonLink content={{
                            productName: body.productName,
                            productImage: body.productImage,
                            productLink: body.productLink
                        }} />}
                </div>
            )}
        </div>
    );
};