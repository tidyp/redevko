import Parser from 'rss-parser';

const ARTICLE_LIST = [
  { name: '라인', url: 'https://engineering.linecorp.com/ko/feed/index.html' },
  { name: '카카오엔터프라이즈', url: 'https://tech.kakaoenterprise.com/feed' },
  { name: '쿠팡', url: 'https://medium.com/feed/coupang-engineering' },
  { name: '우아한형제들', url: 'https://techblog.woowahan.com/feed' },
  { name: '당근마켓', url: 'https://medium.com/feed/daangn' },
  { name: '토스', url: 'https://toss.tech/rss.xml' },
  { name: '무신사', url: 'https://medium.com/feed/musinsa-tech' },
  { name: '마켓컬리', url: 'https://helloworld.kurly.com/feed.xml' },
  { name: '데브시스터즈', url: 'https://tech.devsisters.com/rss.xml' },
  { name: '직방', url: 'https://medium.com/feed/zigbang' },
  { name: '왓챠', url: 'https://medium.com/feed/watcha' },
  { name: '뱅크샐러드', url: 'https://blog.banksalad.com/rss.xml' },
  { name: '하이퍼커넥트', url: 'https://hyperconnect.github.io/feed.xml' },
  { name: '요기요', url: 'https://techblog.yogiyo.co.kr/feed' },
  { name: '쏘카', url: 'https://tech.socarcorp.kr/feed' },
  { name: '리디', url: 'https://www.ridicorp.com/feed' },
  { name: 'NHN Toast', url: 'https://meetup.toast.com/rss' },
];

import { NextResponse } from 'next/server';

// export const GET = async (req: NextRequest) => {
export const GET = async () => {
  const parser = new Parser();
  const feed = await parser.parseURL(ARTICLE_LIST[0].url);

  const data = feed.items.map((item) => {
    return {
      title: item.title,
      link: item.link,
      isoDate: item.isoDate,
    };
  });

  return NextResponse.json({ data: data });
};
