import { styled } from "..";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "top",
  margin: "0 auto",
  height: 656,
  gap: "2rem",

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },

  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    lineHeight: 1.4,
  },

  a: {
    display: "block",
    fontSize: "$lg",
    color: "$green500",
    textDecoration: "none",
    fontWeight: "bold",
    marginTop: "2rem",

    "&:hover": {
      color: "$green300",
    },
  },

  "> div": {
    display: "flex",
    justifyContent: "space-between",

    "div:first-child ": {
      marginLeft: 0,
    },
  },
});

export const ImageContainer = styled("div", {
  width: 140,
  height: 140,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: "50%",

  padding: "0.25rem",
  marginTop: "2rem",
  marginLeft: -52,

  boxShadow: "-10px -0px 20px rgba(0,0,0,.5)",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
  },
});
