import { Divider, Popover } from "antd";
import { ReactComponent as Document } from "./assets/images/document.svg";
import { ReactComponent as Image } from "./assets/images/image.svg";
import { ReactComponent as Link } from "./assets/images/link.svg";
import { ReactComponent as PDF } from "./assets/images/pdf.svg";
import PropTypes from "prop-types";
import React from "react";
import { ReactComponent as Video } from "./assets/images/video.svg";
import isImage from "is-image";
import isTextPath from "is-text-path";
import isVideo from "is-video";

const isPDF = extension => extension.toLowerCase() === ".pdf";

const Attachment = ({
  URI,
  description,
  extension: _extension,
  previewURI,
  title
}) => {
  let extension;
  if (!_extension && URI) extension = `.${URI.split(".").pop()}`;
  else extension = `.${_extension}`;
  let Component;
  if (!URI) Component = Document;
  else if (isPDF(extension)) Component = PDF;
  else if (isTextPath(extension)) Component = Document;
  else if (isImage(extension)) Component = Image;
  else if (isVideo(extension)) Component = Video;
  else Component = Link;
  Component = <Component className="ternary-fill theme-fill" />;
  // No popover
  if (!title && !description) {
    if (URI)
      return (
        <a
          href={URI.replace(/^\/ipfs\//, "https://ipfs.kleros.io/ipfs/")}
          rel="noopener noreferrer"
          target="_blank"
        >
          {Component}
        </a>
      );
    return Component;
  }

  return (
    <Popover
      arrowPointAtCenter
      className="ternary-border-color theme-border-color ternary-color theme-color"
      content={
        previewURI ? (
          <>
            {description}
            <Divider dashed />
            <iframe
              frameBorder="0"
              src={previewURI}
              title="Attachment Preview"
            />
          </>
        ) : (
          description
        )
      }
      title={title}
    >
      {URI ? (
        <a
          href={URI.replace(/^\/ipfs\//, "https://ipfs.kleros.io/ipfs/")}
          rel="noopener noreferrer"
          target="_blank"
        >
          {Component}
        </a>
      ) : (
        Component
      )}
    </Popover>
  );
};

Attachment.propTypes = {
  URI: PropTypes.string,
  description: PropTypes.string.isRequired,
  extension: PropTypes.string,
  previewURI: PropTypes.string,
  title: PropTypes.string.isRequired
};

Attachment.defaultProps = {
  URI: null,
  extension: null,
  previewURI: null
};

export default Attachment;
