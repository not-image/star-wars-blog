import * as React from "react";
import { Typography } from "@mui/material";

const PhraseGenerator = ({ store }) => {
  let a1 = ["Bad", "Good"];
  let a2 = ["we got information", "someone told us"];
  let a3 = ["is ok and hasn't been destroyed yet.", "was destroyed."];

  let i1 = Math.floor(Math.random() * a1.length);
  let i2 = Math.floor(Math.random() * a2.length);
  let i3 = Math.floor(Math.random() * a3.length);

  return (
    <Typography variant={"body1"} sx={{ fontWeight: 500, color: "#000" }}>
      {a1[i1]} news <b>{store.user.username}</b>, {a2[i2]} that{" "}
      {store.user.planet === "Earth"
        ? <b>{`the ${store.user.planet} `}</b>
        : <b>{`${store.user.planet} `}</b>}
      {a3[i3]}
    </Typography>
  );
};

export default PhraseGenerator;
