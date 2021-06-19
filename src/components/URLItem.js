import React, { useState, useRef } from "react";
import { apiCall } from "../action/api-call-executer";
export default function URLItem(props) {
  const [clicks] = useState(props.data.clicks || 0);
  const [fullUrl] = useState(props.data.full || null);
  const [shortUrl] = useState(props.data.short || null);
  const [copied, setCopied] = useState(null);
  const inputRef = useRef(null);

  const handleClick = () => {
    document.execCommand("copy");
    inputRef.current.disabled = false;
    inputRef.current.select();
    const copy = document.execCommand("copy", true);
    inputRef.current.selectionEnd = 0;
    inputRef.current.disabled = true;
    setCopied(copy);
  };
  const redirectToFullUrl = () => {
    apiCall({
      url: `http://localhost:8001/${shortUrl}`,
      method: "get",
    })
      .then((res) => {
        if (!res.data.success) {
        } else {
          window.open(fullUrl, "_blank");
        }
      })
      .catch((e) => {
        window.open(fullUrl, "_blank");
      });
  };
  return (
    <div className="url__container">
      <div className="url__left">
        <p className="url__submitted">{fullUrl}</p>
      </div>
      <div className="url__right">
        <input
          className="url__output"
          ref={inputRef}
          disabled
          value={shortUrl}
          onClick={() => {
            redirectToFullUrl();
          }}
        />

        <input
          className="url__output"
          disabled
          value={`Cliked: ${String(clicks)}`}
        />
        {copied ? (
          <div
            className="btn btn--clicked"
            onClick={() => {
              handleClick();
            }}
          >
            Copied
          </div>
        ) : (
          <div
            className="btn btn--url"
            onClick={() => {
              handleClick();
            }}
          >
            Copy
          </div>
        )}
      </div>
    </div>
  );
}
