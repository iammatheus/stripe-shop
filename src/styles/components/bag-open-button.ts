import { styled } from "..";

export const BagOpenButtonContainer = styled("button", {
  position: "relative",

  cursor: "pointer",
  background: "$gray800",
  color: "$gray500",

  border: 0,
  borderRadius: 8,
  lineHeight: 0,

  width: "3rem",
  height: "3rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    transition: "color .2s",
    color: "$gray300",
  },

  variants: {
    isItemsInBag: {
      true: {
        color: "$gray300",
        "&:hover": {
          transition: "color .2s",
          color: "$gray100",
        },
      },
    },
  },
});

export const ItemsQuantity = styled("div", {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  top: -8,
  right: -8,

  width: "1.5rem",
  height: "1.5rem",

  background: "$green500",
  color: "$gray100",

  border: "2px solid $gray900",
  borderRadius: "50%",
});
