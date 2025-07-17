import { Layout } from "antd";
import styles from "./styles.module.scss";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsFillThreadsFill } from "react-icons/bs";
import { AiFillTikTok } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
const { Footer } = Layout;

const AppFooter = () => {
  const { footerWrapper, footerLeft, footerRight, footer, title } = styles;

  return (
    <>
      <Footer
        className={footerWrapper}
        style={{ textAlign: "center", padding: 0 }}
      >
        <div className={footer}>
          <div className={footerLeft}>
            <p className={title}>
              © {new Date().getFullYear()} Blood Donation Management System
            </p>
            <ul>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">RedCross.org</a>
              </li>
              <li>
                <a href="#">Accessibility</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Supporters</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
            </ul>
          </div>
          <div className={footerRight}>
            <a href="#">
              <i className="fab fa-facebook-f">
                <FaFacebookSquare />
              </i>
            </a>
            <a href="#">
              <i className="fab fa-instagram">
                <FaSquareInstagram />
              </i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in">
                <BsFillThreadsFill />
              </i>
            </a>
            <a href="#">
              <i className="fab fa-tiktok">
                <AiFillTikTok />
              </i>
            </a>
            <a href="#">
              <i className="fab fa-x-twitter">
                <FaSquareXTwitter />
              </i>
            </a>
            <a href="#">
              <i className="fas fa-globe"></i>
            </a>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default AppFooter;
