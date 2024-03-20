import * as cheerio from 'cheerio';
import hljs from 'highlight.js'


export const getHighlightBody = (body: string) => {
    const $ = cheerio.load(body);
    // なんかバグるようになった
    /** 
    $("pre code").each((_, elm) => {
        const result = hljs.highlightAuto($(elm).text());
        $(elm).html(result.value);
        $(elm).addClass("hljs");
    });
    */    
    return $.html()
}
