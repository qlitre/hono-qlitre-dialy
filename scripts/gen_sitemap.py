import xml.etree.ElementTree as et
import requests
import os
from dotenv import load_dotenv
from pathlib import Path
import datetime

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv()

END_POINT = '/post'
BASE_URL = os.environ.get('BASE_URL')
API_KEY = os.environ.get('API_KEY')
HEADERS = {'X-MICROCMS-API-KEY': API_KEY}
HOST_URL = os.environ.get('HOST_URL')


def get_total_count():
    """
    投稿された記事数を返す
    """
    queries = {'fields': 'id'}
    res = requests.request('GET',
                           url=BASE_URL + END_POINT,
                           headers=HEADERS,
                           params=queries).json()

    return res['totalCount']


def get_jst_date_string(utc_date_string):
    """
    UTC時刻文字列をJST時刻の文字列に変換
    """
    datetime_utc = datetime.datetime.strptime(utc_date_string, "%Y-%m-%dT%H:%M:%S.%f%z")
    datetime_jst = datetime_utc.astimezone(datetime.timezone(datetime.timedelta(hours=+9)))
    jst_date_string = datetime.datetime.strftime(datetime_jst, '%Y-%m-%d')
    return jst_date_string


def get_sitemap_materials():
    """
    {loc:url,lastmod:更新日}という辞書のリストを返す
    """
    limit = get_total_count()
    queries = {'fields': 'id,updatedAt', 'limit': limit}
    res = requests.request('GET',
                           url=BASE_URL + END_POINT,
                           headers=HEADERS,
                           params=queries)
    materials = []
    for obj in res.json()['contents']:
        jst_date_string = get_jst_date_string(obj['updatedAt'])
        elm = {'loc': f'{HOST_URL}/post/{obj["id"]}',
               'lastmod': jst_date_string}
        materials.append(elm)
    return materials


def job():
    """
    sitemapを生成する処理
    """
    url_set = et.Element('urlset')
    url_set.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")
    url_set.set("xmlns:news", "http://www.google.com/schemas/sitemap-news/0.9")
    url_set.set("xmlns:xhtml", "http://www.w3.org/1999/xhtml")
    url_set.set("xmlns:mobile", "http://www.google.com/schemas/sitemap-mobile/1.0")
    url_set.set("xmlns:image", "http://www.google.com/schemas/sitemap-image/1.1")
    url_set.set("xmlns:video", "http://www.google.com/schemas/sitemap-video/1.1")
    tree = et.ElementTree(element=url_set)

    # 記事を順番に書きこむ
    for elm in get_sitemap_materials():
        url_element = et.SubElement(url_set, 'url')
        loc = et.SubElement(url_element, 'loc')
        loc.text = elm['loc']
        lastmod = et.SubElement(url_element, 'lastmod')
        lastmod.text = elm['lastmod']
    # 最後にトップURL
    url_element = et.SubElement(url_set, 'url')
    loc = et.SubElement(url_element, 'loc')
    loc.text = HOST_URL

    tree.write(Path(BASE_DIR,'assets','sitemap.xml'), encoding='utf-8', xml_declaration=True)
    success_message = """
    ============
    Successfully create sitemap
    ============
    """
    print(success_message)


if __name__ == '__main__':
    job()