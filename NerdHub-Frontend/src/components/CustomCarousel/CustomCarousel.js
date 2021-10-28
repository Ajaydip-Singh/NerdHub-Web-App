import styles from './CustomCarousel.module.css';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export default function Carousel(props) {
  const nextIcon = (
    <span
      aria-hidden="true"
      className={`carousel-control-next-icon ${styles.next_icon}`}
    />
  );

  const prevIcon = (
    <span
      aria-hidden="true"
      className={`carousel-control-prev-icon ${styles.prev_icon}`}
    />
  );

  return (
    <AliceCarousel
      mouseTracking={true}
      keyboardNavigation={true}
      swipeDelta={100}
      animationDuration={800}
      renderNextButton={() => nextIcon}
      renderPrevButton={() => prevIcon}
      disableButtonsControls={
        props.disableButtons ? props.disableButtons : false
      }
      disableDotsControls={props.disableDots ? props.disableDots : false}
      infinite={props.infinite ? props.infinite : true}
      items={props.items}
    />
  );
}
