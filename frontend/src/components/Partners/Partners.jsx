import React from 'react';
import styles from "../../styles/styles";
import {Link} from "react-router-dom";

const Partners = () =>{

        return (
            <div className={`${styles.section} bg-blue-50`}>
                    <div className={`${styles.heading}`}>
                        <h1>Our Partners</h1>
                    </div>
                    <div className="  hidden sm:block  py-10 px-5 mb-12 bg-blend-color-dodge cursor-pointer rounded-xl">
                        <div className="flex justify-between w-full">
                            <div className="flex items-start">
                                <Link to='/partner/shop'>
                                    <img
                                        src="data:image/png;base64,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"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="flex items-start">
                                <Link to='www.hp.com'>
                                    <img
                                        src="data:image/png;base64,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"
                                        alt=""
                                        style={{
                                            width: "150px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </Link>
                            </div>
                            <div className="flex items-start">
                                <Link to='www.amazon.com'>
                                    <img
                                        src="data:image/png;base64,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"
                                        alt=""
                                        style={{
                                            width: "150px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </Link>
                            </div>
                            <div className="flex items-start">
                                <Link to='www.sofreshng.com'>
                                    <img
                                        src="data:image/png;base64,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"
                                        alt=""
                                        style={{
                                            width: "150px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </Link>
                            </div>
                            <div className="flex items-start">
                                <Link to='www.quiratech.com'>
                                    <img
                                        src="/quira.png"
                                        alt=""
                                        style={{
                                            width: "150px",
                                            objectFit: "contain",
                                        }}
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>

            </div>
        );
};

export default Partners;