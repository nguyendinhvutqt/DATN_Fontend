import React from "react";
import classNames from "classnames/bind";

import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("left-footer")}>
          <div className={cx("item")}>
            <FontAwesomeIcon icon={faEnvelope} />
            <p className={cx("text")}>1924801030304@student.tdmu.edu.vn</p>
          </div>
          <div className={cx("item")}>
            <FontAwesomeIcon icon={faPhone} />
            <p className={cx("text")}>034.957.2017</p>
          </div>
          <div className={cx("item")}>
            <FontAwesomeIcon icon={faAddressBook} />
            <p className={cx("text")}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
              officia animi ipsam aut tempora asperiores totam quae sit fugiat
              vero.
            </p>
          </div>
        </div>
        <div className={cx("right-footer")}>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7725940421706!2d106.6729046738356!3d10.980529955398234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d1085e2b1c37%3A0x73bfa5616464d0ee!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUaOG7pyBE4bqndSBN4buZdA!5e0!3m2!1svi!2s!4v1698151454191!5m2!1svi!2s"
            width="500"
            height="150"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Footer;
