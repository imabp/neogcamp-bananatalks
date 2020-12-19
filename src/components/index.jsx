import React, { useState } from "react";
import Axios from "axios";
import {
  Typography,
  TextareaAutosize,
  Button,
  CircularProgress
} from "@material-ui/core";

const FunTranslation = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [final, setFinal] = useState("");
  const [error, setError] = useState("");
  const translate = async (source) => {
    setFinal("");
    setLoading(true);
    setError("");
    const uri = `https://api.funtranslations.com/translate/minion.json`;
    const param = source;
    const queryUri = `${uri}?text=${param}`;

    try {
      let res = await Axios({
        method: "GET",
        url: queryUri
      });

      let { data } = res;
      if (data.success.total) {
        setLoading(false);
        setSuccess(true);
        setFinal(data.contents.translated);
      }
      if (data.error) {
        setError(data.error.message);
      }
    } catch (error) {
      if (error) {
        setError("Too many requests. Ratelimiting 5 requests per hour");
      }
      setLoading(false);
      setSuccess(false);
      console.log(error);
    }
  };
  return (
    <>
      <Typography gutterBottom={true} variant="h2">
        Banana
        <br /> Talks
      </Typography>

      <TextareaAutosize
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        rowsMax="20"
        rowsMin="10"
        required
      ></TextareaAutosize>
      <br />
      <br />
      <Button
        onClick={() => {
          translate(text);
        }}
        variant="contained"
      >
        Translate
      </Button>
      <br />
      <br />
      <Typography gutterBottom={true} variant="h4">
        Banana Translation{" "}
        <span role="img" aria-label="down">
          {" "}
          👇{" "}
        </span>
      </Typography>
      <Typography gutterBottom={true} variant="h4">
        {loading && <CircularProgress />}
        {error}
        {final}
      </Typography>
    </>
  );
};

export default FunTranslation;
