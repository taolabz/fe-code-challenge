import { styled, Select } from "@mui/material";

const StyledSelect = styled(Select)(() => ({
  "&.MuiInputBase-root": {
    ".MuiOutlinedInput-notchedOutline": {
      border: "0",
    },
  },
}));

StyledSelect.defaultProps = {
  MenuProps: {
    PaperProps: {
      elevation: 0,
    },
    sx: {
      "& .MuiPaper-root": {
        mt: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15)",
      },
      "& .MuiMenuItem-root": {
        height: "36px",
      },
    },
  },
};

export default StyledSelect;
