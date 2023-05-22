import "../../../style/dashboard.css";

function Quotation({ title, subTitle }) {
  return (
    <div className="quotation">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "60px"
        }}
      >
        <div className="quotation-label">{title}</div>
        <div className={`quotation-logo-position ${subTitle}`}></div>
      </div>
      <div className="bottom-pan">
        <div className="bottom-label">{subTitle}</div>
        <div className="bottom-next-icon"></div>
      </div>
    </div>
  );
}

export default Quotation;
