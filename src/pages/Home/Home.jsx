import React from "react";
import DateRangeSearch from "../../components/SearchBar/SearchBar";
import styles from "../Home/Home.module.scss";
import DonorBenefits from "../../components/DonorBenefit/DonorBenefit";
import Banner from "../../components/Banner/Banner";
import { BloodDonationStandards } from "../../components/BloodDonationStandards/BloodDonationStandards";
import { Faqs } from "../../components/Faqs/Faqs";
import { BloodDonationAdvance } from "../../components/BloodDonationAdvance/BloodDonationAdvance";
import { DonationGallery } from "../../components/DonationGallery/DonationGallery";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

const Home = () => {
  const handleSearch = (range) => {
    const [start, end] = range;
    console.log("Start:", start.format("YYYY-MM-DD HH:mm"));
    console.log("End:", end.format("YYYY-MM-DD HH:mm"));
    // Bạn có thể xử lý thêm ở đây, ví dụ gọi API, lọc dữ liệu, ...
  };

  return (
    <div className={styles["home-container"]}>
      {/*Banner*/}
      <div className={styles["home-banner"]}>
        <Banner />
      </div>
      {/* Component Search */}
      <div className={styles["home-search"]}>
        <DateRangeSearch onSearch={handleSearch} />
      </div>
      {/*Block 1*/}
      <div className={styles["home-block-1"]}>
        <DonorBenefits />
      </div>
      <div>
        <BloodDonationStandards />
      </div>
      {/*Block 2*/}
      <div className={styles["home-block-2"]}>
        <Faqs />
      </div>
      <div className={styles["home-block-2"]}>
        <BloodDonationAdvance />
      </div>
      <div className={styles["home-block-2"]}>
        <DonationGallery />
      </div>
      {/*Block 3*/}
      <div className={styles["home-block-3"]}>
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default Home;
