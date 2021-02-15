import React, { useState } from "react";

import {
  CCardTitle,
  CCard,
  CCardBody,
  CButton,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
let audio = new Audio("/neverendingstory.mp3");

// var show_erica = true;

const Home = () => {
  const [show_erica, set_erica] = useState(false);
  const [show_d_s, set_d_s] = useState(false);
  // const [count, setCount] = useState(1);

  const start = () => {
    audio.play();
    set_d_s(true);
    set_erica(false);
    // setTimeout(waitDisplay, 95000); //Wait 5 seconds
    setTimeout(waitDisplay, 95000);
  };

  const waitDisplay = () => {
    set_d_s(false);
    set_erica(true);
    console.log("waited");
  };

  return (
    <CContainer fluid>
      {/* <CRow> */}
      {/* <CCol sm="6"> */}
      <CCard>
        <CCardHeader>
          <CCardTitle position="center">
            <h1>May your story never end</h1>
          </CCardTitle>
        </CCardHeader>
        <CCardBody>
          <h2>The adventure begins with you....</h2>
          <br></br>
          <br></br>
          {!show_d_s && (
            <CCol xs="12" sm="6" md="4">
              <CButton onClick={start} block color="primary">
                Click here to begin
              </CButton>
            </CCol>
          )}
          <CRow>
            {show_d_s && (
              <>
                <img height={200} src="dus_suz.jpeg" />
              </>
            )}
            {show_erica && (
              <>
                <img src="erica_wtf.gif" />
                <img src="erica_wtf.gif" />
                <img src="erica_wtf.gif" />
              </>
            )}
          </CRow>
          <br></br>
          {/* <button onClick={start}>Play</button> */}
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default Home;
