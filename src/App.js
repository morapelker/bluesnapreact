import React, {useEffect} from 'react';
import './App.css';

const test = () => {

// cardUrl: object that stores card type code (received from BlueSnap) and associated card image URL
    var cardUrl = {
        "AMEX": "https://files.readme.io/97e7acc-Amex.png",
        "DINERS": "https://files.readme.io/8c73810-Diners_Club.png",
        "DISCOVER": "https://files.readme.io/caea86d-Discover.png",
        "JCB": "https://files.readme.io/e076aed-JCB.png",
        "MASTERCARD": "https://files.readme.io/5b7b3de-Mastercard.png",
        "VISA": "https://files.readme.io/9018c4f-Visa.png"
    };


    /* Defining bsObj: object that stores Hosted Payment Fields
    event handlers, styling, placeholder text, etc. */
    var bsObj = {
        //insert your Hosted Payment Fields token
        token: "e0b5dc9e0fff0f438886c76fd98e3d85ae5ae3e548d1692c1030eb32424ed337_",
        onFieldEventHandler: {
            onFocus: function (tagId) {
                // Handle focus
            },
            onBlur: function (tagId) {
                // Handle blur
            },
            onError: function (tagId, errorCode, errorDescription) {
                // Handle a change in validation
            },
            onType: function (tagId, cardType, cardData) {
                // get card type from cardType and display card image
            },
            onValid: function (tagId) {
                // Handle a change in validation
            }
        },
        //styling is optional
        style: {
            // Styling all inputs
            "input": {
                "font-size": "14px",
                "font-family": "Helvetica Neue,Helvetica,Arial,sans-serif",
                "line-height": "1.42857143",
                "color": "#555"
            },

            // Styling a specific field
            /*"#ccn": {

                            },*/

            // Styling Hosted Payment Field input state
            ":focus": {
                "color": "#555"
            }
        },
        ccnPlaceHolder: "4111222233334444",
        cvvPlaceHolder: "123",
        expPlaceHolder: "MM / YY"
    }
    window.bluesnap.hostedPaymentFieldsCreate(bsObj);
}


const submit = () => {
    window.bluesnap.hostedPaymentFieldsSubmitData(
        function (callback) {
            if (null != callback.error) {
                // var errorArray = callback.error;
                // for (i in errorArray) {
                //     $("#" + errorArray[i].tagId + "-help").text(errorArray[i].errorCode + " - " + errorArray[i].errorDescription);
                // }
                console.log('error');
            } else {
                var cardData = callback.cardData;
                console.log(
                    cardData,
                    "Card Type: " +
                    cardData.ccType +
                    " Last 4 Digits: " +
                    cardData.last4Digits +
                    " Issuing Country: " +
                    cardData.issuingCountry +
                    " Is Regulated Card: " +
                    cardData.isRegulatedCard +
                    " Card Sub Type: " +
                    cardData.cardSubType +
                    " Bin Category: " +
                    cardData.binCategory +
                    " Exp: " +
                    cardData.exp +
                    " after that I can call final submit"
                );
                // This is where you would perform final submission to your server
            }
        }
    );
}

const Demo = props => {
    useEffect(test, [])
    return <div>
        <div className="panel panel-default bootstrap-basic">
            <form className="panel-body" id="checkout-form" action="#">
                <div className="row">
                    <div className="form-group col-md-12">
                        <label htmlFor="cardholder-name">Name on Card</label>
                        <input type="text" className="form-control" id="cardholder-name" placeholder="Full Name"/>
                        <span className="helper-text"></span>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="card-number">Card Number</label>
                        <div className="input-group">
                            <div className="form-control" id="card-number" data-bluesnap="ccn"></div>
                            <div id="card-logo" className="input-group-addon"><img
                                src="https://files.readme.io/d1a25b4-generic-card.png" height="20px"/></div>
                        </div>
                        <span className="helper-text" id="ccn-help"></span>
                    </div>
                    <div className="form-group col-xs-7">
                        <label htmlFor="exp-date">Exp. Date</label>
                        <div className="form-control" id="exp-date" data-bluesnap="exp"></div>
                        <span className="helper-text" id="exp-help"></span>
                    </div>
                    <div className="form-group col-xs-5">
                        <label htmlFor="cvv">Security Code</label>
                        <div className="form-control" id="cvv" data-bluesnap="cvv"></div>
                        <span className="helper-text" id='cvv-help'></span>
                    </div>
                </div>

                <button className="btn btn-success btn-lg col-xs-6 col-xs-offset-3" type="button" id="submit-button"
                        onClick={submit}>Pay Now
                </button>

            </form>

        </div>
    </div>
}


function App() {
    return <div>
        <Demo/>
    </div>
}

export default App;
