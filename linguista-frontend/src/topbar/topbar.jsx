import "./Topbar.css";

export function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo para--lead">Linguista</span>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Feed</span>
          <span className="topbarLink">People</span>
        </div>
      </div>
    </div>
  );
}
