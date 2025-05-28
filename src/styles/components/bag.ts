import { styled } from "..";

export const CartContainer = styled("form", {
  zIndex: 1,
  maxWidth: "auto",
  height: "100vh",
  padding: "3rem",

  backgroundColor: "$gray800",
  boxShadow: "-8px -8px 10px rgba(0,0,0,.4)",

  position: "fixed",
  right: 0,
  top: 0,

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",

  transform: "translateX(415px)",

  variants: {
    open: {
      true: {
        transform: "translateX(0px)",
      },
      false: {
        transition: "all .3s",
        transform: "translateX(415px)",
      },
    },
  },
});

export const CloseCartButton = styled("button", {
  position: "absolute",
  right: "1rem",
  top: "1rem",

  border: 0,
  lineHeight: 0,

  backgroundColor: "transparent",
  cursor: "pointer",

  "> svg": {
    color: "$gray300",
    "&:hover": {
      transition: "color .2s",
      color: "$gray100",
    },
  },
});

export const BagContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  marginTop: "2rem",

  h3: {
    marginBottom: "1rem",
  },
});

export const ProductItem = styled("div", {
  display: "flex",
  gap: "1rem",
  alignItems: "center",
});

export const ProductInfo = styled("div", {
  display: "flex",
  gap: "1.25rem",
  flexDirection: "column",
  alignItems: "start",

  div: {
    p: {
      marginBottom: "8px",
    },
  },

  p: {
    color: "$gray300",
  },
});

export const BagRemoveButton = styled("button", {
  backgroundColor: "transparent",
  border: 0,
  color: "$green300",
  cursor: "pointer",
  fontWeight: "bold",

  "&:hover": {
    transition: "color .2s",
    color: "$green500",
  },
});

export const ProductImage = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  width: 100,
  height: 95,
  position: "relative",

  img: {
    objectFit: "cover",
  },
});

export const OrderTotal = styled("div", {
  display: "flex",
  flexDirection: "column",

  "div,header": {
    display: "flex",
    justifyContent: "space-between",
  },

  header: {
    color: "$gray300",
  },

  div: {
    marginTop: "1rem",
    span: {
      fontWeight: "bold",
      fontSize: "$md",
    },
    strong: {
      fontSize: "$xl",
    },
  },
});

export const SubmitButton = styled("button", {
  marginTop: "4rem",

  backgroundColor: "$green500",
  border: 0,
  color: "$white",
  borderRadius: 8,
  padding: "1.25rem",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "$md",

  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  "&:not(:disabled):hover": {
    transition: "background-color .2s",
    backgroundColor: "$green300",
  },
});
