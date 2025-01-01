import React from "react";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Banner = () => {
  return (
    <div className="z-10 flex justify-center p-4">
      <div className="flex w-[80rem] items-center justify-center overflow-hidden rounded-3xl text-3xl">
        <Swiper
          // modules={[Navigation, Pagination, Autoplay]}
          modules={[Pagination, Autoplay]}
          style={{
            "--swiper-pagination-color": "#fff",
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-bullet-size": "10px",
            "--swiper-navigation-size": "50px",
            "--swiper-navigation-sides-offset": "10px",
          }}
          spaceBetween={10} // 이미지 간격
          // navigation
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
        >
          <SwiperSlide>
            <Link to="/qna/1">
              <div className="h-60 w-[80rem] rounded-3x bg-[url(https://th.bing.com/th/id/OIG.J5gtliGC4oXXoSVPnlQD?pid=ImgGn)] bg-cover bg-no-repeat">
                <p className="flex p-8 text-7xl text-yellow-50">
                  QnA 궁금한것이 있다면?
                </p>
                <p className="flex items-end justify-end p-10">
                  <span className="text-yellow-50">질문하러가기</span>
                  <span className="text-yellow-50">&gt;&gt;&gt;</span>
                </p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/qna/1">
              <div className="h-60 w-[80rem] rounded-3x bg-[url(https://th.bing.com/th/id/OIG.LTaVFacabNQc22SAk1r1?pid=ImgGn)] bg-cover bg-no-repeat">
                <p className="flex p-8 text-7xl text-yellow-50">
                  QnA 궁금한것이 있다면?
                </p>
                <p className="flex items-end justify-end p-10">
                  <span className="text-yellow-50">질문하러가기</span>
                  <span className="text-yellow-50">&gt;&gt;&gt;</span>
                </p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/qna/1">
              <div className="h-60 w-[80rem] rounded-3x bg-[url(https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg?pid=ImgGn)] bg-cover bg-no-repeat">
                <p className="flex p-8 text-7xl text-yellow-50">
                  QnA 궁금한것이 있다면?
                </p>
                <p className="flex items-end justify-end p-10">
                  <span className="text-yellow-50">질문하러가기</span>
                  <span className="text-yellow-50">&gt;&gt;&gt;</span>
                </p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/qna/1">
              <div className="h-60 w-[80rem] rounded-3x bg-[url(https://th.bing.com/th/id/OIG.MC3PObbEmuJhfsPJ8biQ?pid=ImgGn)] bg-cover bg-no-repeat">
                <p className="flex p-8 text-7xl text-yellow-50">
                  QnA 궁금한것이 있다면?
                </p>
                <p className="flex items-end justify-end p-10">
                  <span className="text-yellow-50">질문하러가기</span>
                  <span className="text-yellow-50">&gt;&gt;&gt;</span>
                </p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to="/qna/1">
              <div className="h-60 w-[80rem] rounded-3x bg-[url(https://th.bing.com/th/id/OIG.J5gtliGC4oXXoSVPnlQD?pid=ImgGn)] bg-cover bg-no-repeat">
                <p className="flex p-8 text-7xl text-yellow-50">
                  QnA 궁금한것이 있다면?
                </p>
                <p className="flex items-end justify-end p-10">
                  <span className="text-yellow-50">질문하러가기</span>
                  <span className="text-yellow-50">&gt;&gt;&gt;</span>
                </p>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.aaa}></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.bbb}></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.ccc}></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.ddd}></div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
