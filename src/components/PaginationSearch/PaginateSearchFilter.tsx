import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

type IPaginateProps = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

const PaginateSearchFilter = ({ setQuery, setFilter }: IPaginateProps) => {
  return (
    <Box>
      <Grid
        container
        spacing={10}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 0,
        }}
      >
        <Grid item sx={{ paddingTop: "0 px", paddingBottom: "4rem" }}>
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <span className="sr-only">Search By Username</span>
          </label>
        </Grid>
        <Grid item sx={{ paddingTop: 0, paddingBottom: "4rem" }}>
          <div className="select">
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="custom-select"
              aria-label="Filter Countries By Username"
            >
              <option value="">Select a option to Filter</option>
              <option value="username">Filter By User Name</option>
              <option value="email">Filter By Email</option>
              <option value="phone">Filter By Phone</option>
            </select>
            <span className="focus"></span>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaginateSearchFilter;
