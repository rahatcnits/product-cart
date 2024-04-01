import React from 'react';
import {Spinner} from "react-bootstrap";

const FullScreenLoader = () => {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-3">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden"></span>
                    </Spinner>
                </div>
            </div>
        </div>
    );
};

export default FullScreenLoader;