import "../../style/search.css";
import TextField from "@mui/material/TextField";
function Search() {
  return (
    <div className="search-body">
      <div className="search-logo"></div>
      <div className="search-main">
        <TextField id="outlined-basic" label="Search.."  variant="outlined" size="small"/>
      </div>
    </div>
  );
}

export default Search;
