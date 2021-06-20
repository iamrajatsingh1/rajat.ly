import React, { useState } from "react";
export default function URLItem(props) {
  const [clicks] = useState(props.data.clicks || 0);
  const [fullUrl] = useState(props.data.full || null);
  const [shortUrl] = useState(props.data.short || null);
  const [copied, setCopied] = useState(null);
  const domainName = window.location.href;

  const handleCopyToClipboard = () => {
    let url = `${domainName}${shortUrl}`;
    navigator.clipboard.writeText(shortUrl ? url : fullUrl).then(
      function () {
        setCopied(true);
      },
      function (err) {
        setCopied(false);
      }
    );
  };

  return (
    <div className="url__container">
      <div className="url__left">
        <p className="url__submitted">{fullUrl}</p>
      </div>
      <div className="url__right">
        <div>
          <a
            href={`${domainName}${shortUrl}`}
            className="url__output"
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl}
          </a>
        </div>

        <input
          className="url__output"
          disabled
          value={`Cliked: ${String(clicks)}`}
        />
        {copied ? (
          <div
            className="btn btn--clicked"
            onClick={() => {
              handleCopyToClipboard();
            }}
          >
            Copied
          </div>
        ) : (
          <div
            className="btn btn--url"
            onClick={() => {
              handleCopyToClipboard();
            }}
          >
            Copy
          </div>
        )}
      </div>
    </div>
  );
}
