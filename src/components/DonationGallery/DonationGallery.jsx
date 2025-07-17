import React from "react";
import styles from "./styles.module.scss";
import banner3 from "../../assets/banner3.png";
import active1 from "../../assets/active1.png";
import active2 from "../../assets/active2.png";
import active3 from "../../assets/active3.png";
import active4 from "../../assets/active4.png";
import active5 from "../../assets/active5.png";
import active6 from "../../assets/active6.png";

const sampleImages = [active1, active2, active3, active4, active5, active6];

export const DonationGallery = () => {
  const {
    donationGalleryContainer,
    bannerSection,
    bannerImg,
    overlay,
    title,
    gallery,
    galleryImage,
  } = styles;

  return (
    <div className={donationGalleryContainer}>
      {/* Banner section */}
      <div className={bannerSection}>
        <img
          src={banner3}
          alt="Hiến máu"
          className={bannerImg}
        />
        <div className={overlay}></div>
        <div className={title}>
          Các hoạt động<br />hiến máu nhân đạo
        </div>
      </div>

      {/* Gallery section */}
      <div className={gallery}>
        {sampleImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Hoạt động hiến máu ${index + 1}`}
            className={galleryImage}
          />
        ))}
      </div>
    </div>
  );
};
