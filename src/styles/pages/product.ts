import { styled } from "..";

export const ProductContainer = styled("main", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  gap: "4rem",

  maxWidth: 1180,
  margin: "0 auto",

  "@max768": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const ImageContainer = styled("div", {
  width: "100%",
  maxWidth: 576,
  height: 656,
  padding: "0.25rem",

  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },

  "@max960": {
    width: "100%",
    height: "100%",

    img: {
      width: "100%",
      height: "100%",
    },
  },
});

export const ProductDetails = styled("div", {
  display: "flex",
  flexDirection: "column",

  a: {
    textDecoration: "none",
    color: "$green500",
    cursor: "pointer",

    display: "flex",
    gap: ".5rem",
    alignItems: "center",

    width: "5rem",
    marginBottom: ".5rem",

    borderBottom: "2px solid $gray900",

    "&:hover": {
      transition: "all .2s",
      borderBottom: "2px solid $green300",
      color: "$green300",
    },
  },

  h1: {
    fontSize: "$2xl",
    color: "$gray300",
  },

  span: {
    marginTop: "1rem",
    display: "block",
    fontSize: "$2xl",
    color: "$green300",
  },

  p: {
    marginTop: "2.5rem",
    fontSize: "$md",
    lineHeight: 1.6,
    color: "$gray300",
  },

  button: {
    fontWeight: "bold",
    fontSize: "$md",

    color: "$white",
    backgroundColor: "$green500",

    marginTop: "auto",
    padding: "1.25rem",

    border: 0,
    borderRadius: 8,
    cursor: "pointer",

    "&:disabled": {
      opacity: 0.6,
      cursor: "not-allowed",
    },

    "&:not(:disabled):hover": {
      backgroundColor: "$green300",
    },

    "@max960": {
      marginTop: "2rem",
    },
  },
});
