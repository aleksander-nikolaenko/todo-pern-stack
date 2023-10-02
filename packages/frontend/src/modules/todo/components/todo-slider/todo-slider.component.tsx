import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { EffectCoverflow, A11y } from 'swiper/modules';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../../common/types/todo.types';
import { TodoSlideComponent } from '../todo-slide/todo-slide.component';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

export const TodoSliderComponent = ({ data }: { data: Todo[] }) => {
  const [slide, setSlide] = useState<number>(0);
  const { state } = useLocation<{ slide: number }>();

  useEffect(() => {
    if (state?.slide) {
      setSlide(state.slide);
    } else {
      setSlide(1);
    }
  }, []);
  const handleChangeSlide = (swiper: SwiperClass) => {
    setSlide(swiper.realIndex + 1);
  };
  return slide ? (
    <Swiper
      effect="coverflow"
      grabCursor={!false}
      centeredSlides={!false}
      slidesPerView={1.5}
      coverflowEffect={{
        rotate: 50,
        stretch: 20,
        depth: 100,
        modifier: 1,
        slideShadows: false
      }}
      modules={[EffectCoverflow, A11y]}
      initialSlide={slide - 1}
      onSlideChange={handleChangeSlide}
    >
      {data.map((todo) => (
        <SwiperSlide key={todo.id}>
          <TodoSlideComponent slide={slide} data={todo} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : null;
};
