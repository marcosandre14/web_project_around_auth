import React from "react";
import Popup from "./Popup/Popup";
import successIcon from "../images/success-icon.svg";
import errorIcon from "../images/error-icon.svg";

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  if (!isOpen) return null;

  return (
    <Popup onClose={onClose}>
      <div
        className='popup__tooltip-content'
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        <img
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? "Sucesso" : "Erro"}
          style={{ width: "120px", height: "120px", marginBottom: "32px" }}
        />
        <h2
          style={{
            color: "#000000",
            fontSize: "24px",
            fontWeight: "900",
            lineHeight: "1.2",
            margin: 0,
          }}
        >
          {isSuccess
            ? "Vitória! Você se registrou com sucesso."
            : "Ops, algo deu errado! Por favor, tente novamente."}
        </h2>
      </div>
    </Popup>
  );
}
