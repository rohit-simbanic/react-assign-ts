import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

type IPaginateProps = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  filter_items: string[];
};

const PaginateSearchFilter = ({
  setQuery,
  setFilter,
  filter_items,
}: IPaginateProps) => {
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
              <option value="">Filter By Username</option>
              {filter_items.map((item) => (
                <option value={item}>Filter By {item}</option>
              ))}
            </select>
            <span className="focus"></span>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaginateSearchFilter;
