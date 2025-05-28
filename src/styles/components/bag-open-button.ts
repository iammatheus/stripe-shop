import { styled } from "..";

export const BagOpenButtonContainer = styled("button", {
  cursor: "pointer",
  background: "$gray800",
  color: "$gray500",
  border: 0,
  borderRadius: "8px",

  width: 48,
  height: 48,

  "&:hover": {
    transition: "color .2s",
    color: "$gray300",
  },
});
