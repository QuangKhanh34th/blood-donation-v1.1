import React from "react";
import { Carousel } from "antd";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import styles from "../Banner/styles.module.scss"; // import SCSS module

const Banner = () => (
  <div className={styles.bannerWrapper}>
    <Carousel autoplay autoplaySpeed={3000}>
      <div>
        <img src={banner1} alt="Banner 1" />
      </div>
      <div>
        <img src={banner2} alt="Banner 2" />
      </div>
    </Carousel>
  </div>
);

export default Banner;
